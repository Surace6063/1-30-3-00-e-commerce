from rest_framework import generics
from .serializers import CartItemSerializer, CartSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem

# get user cart
class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart


# cart item view -> view to add cart item to user's cart (or update its quantity)

class CartItemCreateView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    # custom logic when a cart item is created
    def perform_create(self,serializer):
        # get or create the user's cart 
        cart, _ = Cart.objects.get_or_create(user=self.request.user)

        # get the product object and quantity that user is adding to the cart
        product = serializer.validated_data["product_id"]

        quantity = serializer.validated_data.get("quantity",1)

        # check if product already exist in the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart,product=product)

        # if product already exist..  increase its quantity
        if created:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            # if product already exist in cart increase it's quantity only
            cart_item.quantity += quantity
            cart_item.save()
                

# remove cart item
class CartitemRemoveView(generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]