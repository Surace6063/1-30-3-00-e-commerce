from django.urls import path
from .views import *

urlpatterns = [
    # http://127.0.0.1:8000/api/categories/
    path('categories/', CategoryListView.as_view(), name="category_lists"),

    # http://127.0.0.1:8000/api/categories/add/
    path('categories/add/', CategoryCreateView.as_view(),name="add_category"),
     
    # http://127.0.0.1:8000/api/categories/1/
    path('categories/<int:pk>/', CategoryRetriveView.as_view(),name="single_category"),
    
     # http://127.0.0.1:8000/api/categories/update/1/
    path('categories/update/<int:pk>/', CategoryUpdateView.as_view(), name="update_category"),
    
    # http://127.0.0.1:8000/api/categories/delete/1/
    path('categories/delete/<int:pk>/', CategoryDeleteView.as_view(), name="delete_category"),

    # get and add product api
    # # http://127.0.0.1:8000/api/products/
    path('products/', ProductCreateListView.as_view(),name="list_add_product"),

    # get single product, update and delete product
    #  http://127.0.0.1:8000/api/products/1/
    path('products/<int:pk>/', ProductRetriveUpdateDeleteView.as_view(), name="product_retrive_update_delete")
]
