from rest_framework import serializers
from .models import Order, OrderItem
from cart.models import Cart

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name",read_only=True)
    price = serializers.DecimalField(max_digits=10,decimal_places=2,read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id','product','product_name','quantity','price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_price = serializers.DecimalField(max_digits=10,decimal_places=2,read_only=True)
    
    class Meta:
        model = Order
        fields = ['id','full_name','phone','shipping_address','payment','status','items','total_price',
                  'created_at']
    
    def create(self,validated_data):
        items_data = validated_data.pop('items')
        user = self.context['request'].user
        payment_method = validated_data.get('payment')
            
        # create order
        order = Order.objects.create(user=user, **validated_data)
            
        # create order items
        for item_data in items_data:
            OrderItem.objects.create(order=order,**item_data)
            
        # delete cart item after order is created
        Cart.objects.filter(user=user).delete()  
            
        return order    
        
        
                
            
    
    
    
  