from django import template

register = template.Library()

@register.filter(name='format_price')
def format_price(value):
    """
    Format price as integer with comma separators and 'T' suffix.
    Example: 2000000 -> "2,000,000T"
    """
    if value is None:
        return "0T"
    
    # Convert to integer (removes decimals)
    int_value = int(float(value))
    
    # Format with comma separators
    formatted = f"{int_value:,}"
    
    # Add 'T' suffix
    return f"{formatted}T"

