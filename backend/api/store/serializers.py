from rest_framework import serializers
from .models import Category, Product

# category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# product serializer
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()  # shows category name instead of id
    class Meta:
        model = Product
        fields = "__all__"