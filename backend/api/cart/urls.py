from django.urls import path
from .views import CartView

urlpatterns = [
    path('list/',CartView.as_view(),name="cart-list-create")
]