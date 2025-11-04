from rest_framework import generics
from .serializers import CartItemSerializer, CartSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem

# get user cart
class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart
