# <<<<<<<<<<<<<<<< order view (esewa) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderSerializer
import hmac, hashlib, base64, uuid, json
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView


# ---------- Generate Signature Function ----------
def generate_signature(key, message):
    key = key.encode('utf-8')
    message = message.encode('utf-8')

    hmac_sha256 = hmac.new(key, message, hashlib.sha256)
    digest = hmac_sha256.digest()
    signature = base64.b64encode(digest).decode('utf-8')
    return signature


class OrderView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users only see their own orders
        return Order.objects.filter(user=self.request.user).order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        """Handle order creation with multiple payment methods."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        payment = order.payment.lower()

        # ---------- COD ----------
        if payment == "cod":
            order.save()
            return Response(
                {"message": "Order placed successfully!", "order_id": order.id},
                status=status.HTTP_201_CREATED
            )

        # ---------- eSewa ----------
        elif payment == "e-sewa":
            transaction_uuid = uuid.uuid4()
            tax_amount = 0
            total_amount = "{:.2f}".format(order.total_price + tax_amount) 

            signed_field_names = "total_amount,transaction_uuid,product_code"
            secret_key = '8gBm/:&EnhH.1/q'
            data_to_sign = (
                f"total_amount={total_amount},"
                f"transaction_uuid={transaction_uuid},"
                f"product_code=EPAYTEST"
            )
            result = generate_signature(secret_key, data_to_sign)
            order.save()

            return Response({
                "order_id": order.id,
                "amount": order.total_price,
                "tax_amount": tax_amount,
                "total_amount": total_amount,
                "transaction_uuid": str(transaction_uuid),
                "product_delivery_charge": 0,
                "product_service_charge": 0,
                "product_code": "EPAYTEST",
                "signature": result,
                "signed_field_names": signed_field_names,
                "success_url": f"http://localhost:5173/esewa/success/{order.id}",
                "failure_url": "https://developer.esewa.com.np/failure"
            }, status=status.HTTP_201_CREATED)

        # ---------- Invalid ----------
        return Response(
            {"message": f"Invalid payment method '{order.payment}'"},
            status=status.HTTP_400_BAD_REQUEST
        )


# <<<<<<<<<<<<<<<<<<<<<<<<< order success >>>>>>>>>>>>>>>>>>>>>>>>>>>>
class EsewaSuccessAPIView(APIView):
    """
    DRF endpoint to handle eSewa success redirect and update order status.
    """

    def post(self, request, *args, **kwargs):
        order_id = request.data.get("order_id")
        data = request.data.get("data")  # Base64 eSewa data

        if not order_id or not data:
            return Response(
                {"message": "Missing order_id or data"},
                status=status.HTTP_400_BAD_REQUEST
            )

        order = get_object_or_404(Order, id=order_id)

        try:
            decoded_data = base64.b64decode(data).decode("utf-8")
            data_dict = json.loads(decoded_data)
        except Exception as e:
            return Response(
                {"message": f"Failed to decode data: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        status_value = data_dict.get("status", "").upper()

        if status_value == "COMPLETE":
            order.status = "completed"
            order.save()
            return Response({"message": "Payment successful. Order completed."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": f"Transaction status: {status_value}"}, status=status.HTTP_200_OK)        