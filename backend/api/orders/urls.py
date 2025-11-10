from django.urls import path
from .views import OrderView

urlpatterns = [
    # get / post ->  http://127.0.0.1:8000/api/orders/
    path('orders/',OrderView.as_view(),name="order-create-list")
]