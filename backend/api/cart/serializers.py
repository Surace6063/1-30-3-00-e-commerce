from rest_framework import serializers
from .models import CartItem, Cart
from store.serializers import ProductSerializer
from store.models import Product

# cart item serializer
class CartItemSerializer(serializers.ModelSerializer):
    # show product detail when fetching cart
    product = ProductSerializer(read_only=True)
    
    # accept product ID when creating/updating
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Product.objects.all(),
        write_only = True
    )
    
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','total_price','product_id']



# cart serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True,read_only=True)
    total_price = serializers.DecimalField(max_digits=10,decimal_places=2,read_only=True)
    total_quantity = serializers.IntegerField(read_only = True)

    class Meta:
        model = Cart
        fields = ['id','user','items','total_price','total_quantity']