from rest_framework import serializers
from .models import CartItem, Cart

# cart item serializer
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id','cart','product','quantity','total_price']



# cart serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True,read_only=True)
    total_price = serializers.DecimalField(max_digits=10,decimal_places=2,read_only=True)

    class Meta:
        model = Cart
        fields = ['id','user','items','total_price']