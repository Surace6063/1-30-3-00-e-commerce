from django.db import models
from django.contrib.auth.models import User
from store.models import Product

# Create order model

class Order(models.Model):
    
    STATUS_CHOICES = [
        ('pending','pending'),
        ('completed','completed'),
        ('cancelled','cancelled')
    ]
    
    PAYMENT_CHOICES = [
        ('cod','cash on delivery'),
        ('e-sewa','e-sewa')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    status = models.CharField(max_length=100,choices=STATUS_CHOICES,default='pending')
    payment = models.CharField(max_length=100,choices=PAYMENT_CHOICES)
    shipping_address = models.CharField(max_length=250)
    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=10)
    total_price = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Order #{self.id} by {self.full_name}"
    
    def calculate_total(self):
        # recalculate total price from all order items
        total = sum(item.price for item in self.items.all())
        self.total_price = total
        self.save(update_fields=['total_price'])
        return total


# order item model
class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.product.name} * {self.quantity}"
    
    def save(self,*args,**kwargs):
        # automatically set price and update order total
        self.price = self.product.price * self.quantity
        super().save(*args,**kwargs)
        
        # update total price of the parent order
        self.order.calculate_total()
        
 
        
      