import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    # Filter for minimum price 
    # Usage: ?min_price=100  → will return products with price >= 100 
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')

    # Filter for maximum price 
    # Usage: ?max_price=100  → will return products with price <= 100 
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    

    class Meta:
        model = Product
        fields = ['min_price','max_price','category__name']