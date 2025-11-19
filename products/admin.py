from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, HomePage, OrderInquiry


@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'updated_at']
    list_editable = ['is_active']
    fieldsets = (
        ('Content', {
            'fields': ('title', 'subtitle', 'hero_image', 'hero_image_preview', 'featured_text')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ['created_at', 'updated_at', 'hero_image_preview']
    
    def hero_image_preview(self, obj):
        if obj.hero_image:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />', obj.hero_image.url)
        return "No image"
    hero_image_preview.short_description = 'Hero Image Preview'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'material', 'rating', 'in_stock', 'stock_quantity', 'badge', 'created_at', 'image_preview']
    list_filter = ['category', 'in_stock', 'badge', 'created_at']
    search_fields = ['name', 'description', 'material']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at', 'get_discount_percentage', 'primary_image_preview', 'image_2_preview', 'image_3_preview', 'image_4_preview', 'image_5_preview']
    
    def get_discount_percentage(self, obj):
        """Display discount percentage in admin"""
        return f"{obj.get_discount_percentage()}%"
    get_discount_percentage.short_description = 'Discount %'
    
    def image_preview(self, obj):
        """Show primary image in list view"""
        if obj.primary_image:
            return format_html('<img src="{}" style="max-width: 50px; max-height: 50px;" />', obj.primary_image.url)
        return "No image"
    image_preview.short_description = 'Image'
    
    def primary_image_preview(self, obj):
        """Show primary image preview"""
        if obj.primary_image:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />', obj.primary_image.url)
        return "No image uploaded"
    primary_image_preview.short_description = 'Primary Image Preview'
    
    def image_2_preview(self, obj):
        """Show image 2 preview"""
        if obj.image_2:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />', obj.image_2.url)
        return "No image uploaded"
    image_2_preview.short_description = 'Image 2 Preview'
    
    def image_3_preview(self, obj):
        """Show image 3 preview"""
        if obj.image_3:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />', obj.image_3.url)
        return "No image uploaded"
    image_3_preview.short_description = 'Image 3 Preview'
    
    def image_4_preview(self, obj):
        """Show image 4 preview"""
        if obj.image_4:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />', obj.image_4.url)
        return "No image uploaded"
    image_4_preview.short_description = 'Image 4 Preview'
    
    def image_5_preview(self, obj):
        """Show image 5 preview"""
        if obj.image_5:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px;" />', obj.image_5.url)
        return "No image uploaded"
    image_5_preview.short_description = 'Image 5 Preview'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'category', 'material')
        }),
        ('Description', {
            'fields': ('short_description', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'original_price', 'get_discount_percentage')
        }),
        ('Images', {
            'fields': ('primary_image', 'primary_image_preview', 'image_2', 'image_2_preview', 'image_3', 'image_3_preview', 'image_4', 'image_4_preview', 'image_5', 'image_5_preview')
        }),
        ('Product Details', {
            'fields': ('features', 'specifications')
        }),
        ('Status & Rating', {
            'fields': ('badge', 'in_stock', 'stock_quantity', 'rating', 'review_count')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category')


@admin.register(OrderInquiry)
class OrderInquiryAdmin(admin.ModelAdmin):
    list_display = ['product', 'name', 'email', 'phone', 'created_at']
    list_filter = ['created_at', 'product__category']
    search_fields = ['name', 'email', 'phone', 'product__name']
    readonly_fields = ['product', 'name', 'email', 'phone', 'message', 'created_at']

    fieldsets = (
        ('Inquiry Info', {
            'fields': ('product', 'name', 'email', 'phone')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Meta', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
