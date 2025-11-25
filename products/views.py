from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.conf import settings
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import get_user_model
from .models import Product, Category, HomePage, OrderInquiry

User = get_user_model()


def home(request):
    """Home page view with editable content"""
    # Handle case where migrations haven't run yet
    try:
        homepage = HomePage.objects.filter(is_active=True).first()
    except Exception:
        homepage = None
    
    # Get featured products (best sellers or newest) - show all products if none in stock
    try:
        featured_products = Product.objects.all().order_by('-review_count', '-rating', '-created_at')[:8]
    except Exception:
        featured_products = []
    
    # Get all categories
    try:
        categories = Category.objects.all()[:6]
    except Exception:
        categories = []
    
    context = {
        'homepage': homepage,
        'featured_products': featured_products,
        'categories': categories,
    }
    
    return render(request, 'products/home.html', context)


def product_list(request):
    """Product listing page with filtering and sorting"""
    # Initialize defaults
    products = Product.objects.none()
    categories = []
    search_query = request.GET.get('search', '')
    category_filter = request.GET.get('category', '')
    sort_by = request.GET.get('sort', 'bestsellers')
    max_price = request.GET.get('max_price', '')
    min_rating = request.GET.get('min_rating', '')
    
    # Handle case where migrations haven't run yet
    try:
        # Get all categories first
        categories = list(Category.objects.all())
        
        # Get products
        products = Product.objects.all().select_related('category')
        
        # Only filter by in_stock if explicitly requested
        in_stock_filter = request.GET.get('in_stock', '')
        if in_stock_filter == 'true':
            products = products.filter(in_stock=True)
        
        # Search functionality
        if search_query:
            products = products.filter(
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )
        
        # Category filter
        if category_filter:
            products = products.filter(category__slug=category_filter)
        
        # Price filter
        if max_price:
            try:
                products = products.filter(price__lte=float(max_price))
            except ValueError:
                pass
        
        # Rating filter
        if min_rating:
            try:
                products = products.filter(rating__gte=float(min_rating))
            except ValueError:
                pass
        
        # Sorting
        if sort_by == 'price-low':
            products = products.order_by('price')
        elif sort_by == 'price-high':
            products = products.order_by('-price')
        elif sort_by == 'newest':
            products = products.order_by('-created_at')
        elif sort_by == 'rating':
            products = products.order_by('-rating')
        elif sort_by == 'name-asc':
            products = products.order_by('name')
        elif sort_by == 'name-desc':
            products = products.order_by('-name')
        else:  # bestsellers (default)
            products = products.order_by('-review_count', '-rating')
        
        # Convert to list to avoid queryset evaluation issues
        products = list(products)
        
    except Exception as e:
        # Log error but don't crash
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error in product_list view: {str(e)}", exc_info=True)
        products = []
        categories = []
    
    context = {
        'products': products,
        'categories': categories,
        'search_query': search_query,
        'selected_category': category_filter,
        'selected_sort': sort_by,
        'max_price': max_price,
        'min_rating': min_rating,
    }
    
    return render(request, 'products/product_list.html', context)


def product_detail(request, slug):
    """Product detail page with contact-for-order form (no real payment)."""
    product = get_object_or_404(Product, slug=slug)

    success = False
    error = None

    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        phone = request.POST.get("phone", "").strip()
        message = request.POST.get("message", "").strip()

        if not name or not email:
            error = "Please provide at least your name and email."
        else:
            OrderInquiry.objects.create(
                product=product,
                name=name,
                email=email,
                phone=phone,
                message=message,
            )
            success = True

    context = {
        'product': product,
        'success': success,
        'error': error,
    }

    return render(request, 'products/product_detail.html', context)


def contact(request):
    """Simple Contact Us page for general customer inquiries."""
    success = False
    error = None

    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        email = request.POST.get("email", "").strip()
        message = request.POST.get("message", "").strip()

        if not name or not email or not message:
            error = "Please fill in your name, email, and message."
        else:
            # For now we just flag success; emails can be wired later
            success = True

    context = {
        "success": success,
        "error": error,
        "store_owner_email": getattr(settings, "STORE_OWNER_EMAIL", "farshad.mhd.jp@gmail.com"),
    }

    return render(request, "contact.html", context)


def register(request):
    """User registration view"""
    if request.user.is_authenticated:
        return redirect('products:home')
    
    error = None
    success = False
    
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password1 = request.POST.get('password1', '')
        password2 = request.POST.get('password2', '')
        
        if not username or not email or not password1 or not password2:
            error = "Please fill in all fields."
        elif password1 != password2:
            error = "Passwords do not match."
        elif len(password1) < 8:
            error = "Password must be at least 8 characters long."
        elif User.objects.filter(username=username).exists():
            error = "Username already exists. Please choose another."
        elif User.objects.filter(email=email).exists():
            error = "Email already registered. Please use another email."
        else:
            try:
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password1
                )
                # Make user staff and superuser so they can access admin
                user.is_staff = True
                user.is_superuser = True
                user.save()
                
                # Automatically log in the user
                login(request, user)
                messages.success(request, f'Account created successfully! Welcome, {username}!')
                return redirect('products:home')
            except Exception as e:
                error = f"Error creating account: {str(e)}"
    
    return render(request, 'products/register.html', {'error': error, 'success': success})


def user_login(request):
    """User login view"""
    if request.user.is_authenticated:
        return redirect('products:home')
    
    error = None
    
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        
        if not username or not password:
            error = "Please enter both username and password."
        else:
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'Welcome back, {username}!')
                next_url = request.GET.get('next', 'products:home')
                return redirect(next_url)
            else:
                error = "Invalid username or password."
    
    return render(request, 'products/login.html', {'error': error})


@login_required
def user_logout(request):
    """User logout view"""
    from django.contrib.auth import logout
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('products:home')

