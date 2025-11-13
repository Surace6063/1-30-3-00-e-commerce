from django.urls import path
from .views import OrderView, EsewaSuccessAPIView

urlpatterns = [
    # get / post ->  http://127.0.0.1:8000/api/orders/
    path('orders/',OrderView.as_view(),name="order-create-list"),
    
    # post -> http://127.0.0.1:8000/api/orders/esewa/verify/
    path('orders/esewa/verify/',EsewaSuccessAPIView.as_view(),name="esewa-verify")
]