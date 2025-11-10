from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderSerializer


class OrderView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users only see their own orders
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
