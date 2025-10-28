from rest_framework import generics
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from .filters import ProductFilter
from rest_framework.permissions import IsAdminUser, AllowAny


# Create your views here.

# getting all category
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

# adding new category
class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser] # only admin can add new category


# getting single category
class CategoryRetriveView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# update category
class CategoryUpdateView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser] # only admin can add new category

# delete category
class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser] # only admin can add new category




# getting and adding new product
class ProductCreateListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    # filterset_fields = ['category']   # http://127.0.0.1:8000/api/products/?category=category_id

    filterset_class = ProductFilter  #custom filter

    search_fields = ['name','description']   # http://127.0.0.1:8000/api/products/?search=product_name or product_description
    
    # http://127.0.0.1:8000/api/products/?ordering=-created_at or created_at  or -price or price
    ordering_fields = ['created_at', 'price']


# retrive, update and delete product
class ProductRetriveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
