from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.urls import reverse
from django.utils.text import slugify
from django.conf import settings
from django.core.mail import send_mail


class HomePage(models.Model):
    """Editable home page content"""
    title = models.CharField(max_length=200, default="Welcome to Our Store")
    subtitle = models.TextField(max_length=500, blank=True, help_text="Subtitle or tagline")
    hero_image = models.ImageField(upload_to='homepage/', blank=True, null=True, help_text="Main hero/banner image")
    featured_text = models.TextField(blank=True, help_text="Featured content or description")
    is_active = models.BooleanField(default=True, help_text="Show this content on homepage")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Home Page"
        verbose_name_plural = "Home Page"
        ordering = ['-updated_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Only allow one active homepage
        if self.is_active:
            HomePage.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)


class Category(models.Model):
    """Product category model"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Product(models.Model):
    """Product model for e-commerce store"""
    
    BADGE_CHOICES = [
        ('', 'None'),
        ('Best Seller', 'Best Seller'),
        ('New', 'New'),
        ('Sale', 'Sale'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField(help_text="Full product description (2-3 paragraphs)")
    short_description = models.TextField(max_length=500, blank=True, help_text="Brief summary (1-2 sentences)")
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, validators=[MinValueValidator(0)])

    # Material / composition
    material = models.CharField(max_length=200, blank=True, help_text="Main material or composition of the product")
    
    # Images
    primary_image = models.ImageField(upload_to='products/', blank=True, null=True, help_text="Main product image (will auto-populate from first uploaded image if not set)")
    image_2 = models.ImageField(upload_to='products/', blank=True, null=True)
    image_3 = models.ImageField(upload_to='products/', blank=True, null=True)
    image_4 = models.ImageField(upload_to='products/', blank=True, null=True)
    image_5 = models.ImageField(upload_to='products/', blank=True, null=True)
    
    # Category and Classification
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    
    # Ratings and Reviews
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=2, 
        default=0.00,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        help_text="Average rating (0-5)"
    )
    review_count = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    
    # Badge and Status
    badge = models.CharField(max_length=20, choices=BADGE_CHOICES, blank=True)
    in_stock = models.BooleanField(default=True)
    stock_quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    
    # Features (stored as JSON-like text, can be parsed)
    features = models.TextField(
        help_text="Enter features separated by new lines or commas",
        blank=True
    )
    
    # Specifications (stored as JSON-like text)
    specifications = models.TextField(
        help_text="Enter specifications as key:value pairs, one per line",
        blank=True
    )
    
    # SEO and Metadata
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(max_length=300, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['name', 'category']),
            models.Index(fields=['price']),
            models.Index(fields=['rating']),
        ]
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        """Auto-generate slug if not provided"""
        if not self.slug:
            self.slug = slugify(self.name)
            # Ensure uniqueness
            original_slug = self.slug
            counter = 1
            while Product.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('products:product_detail', kwargs={'slug': self.slug})
    
    def get_discount_percentage(self):
        """Calculate discount percentage if original_price exists"""
        if self.original_price and self.original_price > self.price:
            return int(((self.original_price - self.price) / self.original_price) * 100)
        return 0
    
    def get_display_image(self):
        """Get the primary image, or first available image as fallback"""
        if self.primary_image:
            return self.primary_image
        # Fallback to first available image
        for img in [self.image_2, self.image_3, self.image_4, self.image_5]:
            if img:
                return img
        return None
    
    def get_images(self):
        """Return list of all product images (up to 5)"""
        images = []
        # Always start with primary image if it exists
        if self.primary_image:
            images.append(self.primary_image)
        for img in [self.image_2, self.image_3, self.image_4, self.image_5]:
            if img:
                images.append(img)
        return images
    
    def get_features_list(self):
        """Parse features text into a list"""
        if not self.features:
            return []
        # Split by newlines or commas
        features = self.features.replace('\r', '').split('\n')
        features = [f.strip() for f in features if f.strip()]
        # If no newlines, try splitting by commas
        if len(features) == 1 and ',' in features[0]:
            features = [f.strip() for f in features[0].split(',')]
        return features
    
    def get_specifications_dict(self):
        """Parse specifications text into a dictionary"""
        if not self.specifications:
            return {}
        specs = {}
        for line in self.specifications.split('\n'):
            line = line.strip()
            if ':' in line:
                key, value = line.split(':', 1)
                specs[key.strip()] = value.strip()
        return specs


class OrderInquiry(models.Model):
    """Simple contact/inquiry for a given product instead of real payment"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='order_inquiries')
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Inquiry for {self.product.name} by {self.name}"

    def send_notification_email(self):
        """Send an email to the store owner when a new inquiry is created."""
        owner_email = getattr(settings, 'STORE_OWNER_EMAIL', None)
        if not owner_email:
            return

        subject = f"New order inquiry: {self.product.name}"
        lines = [
            f"Product: {self.product.name}",
            f"Price: ${self.product.price}",
            "",
            f"From: {self.name}",
            f"Email: {self.email}",
        ]
        if self.phone:
            lines.append(f"Phone: {self.phone}")
        lines.append("")
        if self.message:
            lines.append("Message:")
            lines.append(self.message)
        body = "\n".join(lines)

        try:
            send_mail(
                subject,
                body,
                owner_email,
                [owner_email],
                fail_silently=True,
            )
        except Exception:
            # Avoid breaking the request if email sending fails.
            pass

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            self.send_notification_email()
