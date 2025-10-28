from django.db import models
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

# Category model


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# product model
class Product(models.Model):
    category = models.ForeignKey(
        Category,
        related_name="products",  # allows access via category.products.all()
        on_delete=models.CASCADE  # delete product if category is deleted
    )
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 19.42
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# delete product image from media/products folder when product is deleted

@receiver(post_delete, sender=Product)
def delete_product_image(sender, instance, **kwargs):
    """ 
    post_delete → runs after a model instance is deleted. 
    sender = Product (the model triggering the signal) 
    instance = the actual Product object being deleted 
    """
    if instance.image:
        # This removes the image file from MEDIA_ROOT/products/
        instance.image.delete(False)




#  delete old image when product image changes 
@receiver(pre_save, sender=Product) 
def delete_old_image_on_change(sender, instance, **kwargs): 
    """ 
    pre_save → runs before saving a Product instance. 
    Used to remove old image when a new image is uploaded. 
    """ 
    if not instance.pk: 
        # Skip if this is a new product (no previous image) 
        return 
  
    try: 
        # Get the old image before update 
        old_image = Product.objects.get(pk=instance.pk).image 
    except Product.DoesNotExist: 
        return 
  
    new_image = instance.image 
  
    # Compare old and new images — if different, delete the old one 
    if old_image != new_image: 
        old_image.delete(False)