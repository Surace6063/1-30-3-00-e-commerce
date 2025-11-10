from django.urls import path
from .views import CartView, CartItemCreateView, CartitemRemoveView

urlpatterns = [
    # get -> http://127.0.0.1:8000/api/cart/list/
    path('list/',CartView.as_view(),name="cart-list-create"),

    # post -> http://127.0.0.1:8000/api/cart/create/
    path('create/',CartItemCreateView.as_view(),name='create-cart'),
    
    # delete cart -> http://127.0.0.1:8000/api/cart/delete/1/
    path('delete/<int:pk>/',CartitemRemoveView.as_view(),name="cart-remove")
]