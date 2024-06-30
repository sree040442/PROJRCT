from django.db import models

SHIPMENT_STATUS = (
    ("Pending", "Pending"),
    ("In Progress", "In Progress"),
    ("Completed", "Completed"),
)

PRODUCT_STATUS = (
    ("Paid", "Paid"),
    ("Unpaid", "Unpaid"),
)

SHIPMENT_CONDITION = (
    ("Good", "Good"),
    ("Damaged", "Damaged"),
)


class Shipment(models.Model):
    """Shipment model for the shipyard app"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateTimeField(null=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    status = models.CharField(
        max_length=100, default="Pending", choices=SHIPMENT_STATUS)
    condition = models.CharField(
        max_length=100, default="Good", choices=SHIPMENT_CONDITION)
    current_location = models.CharField(max_length=100, default="")
    from_location = models.CharField(max_length=100, default="")
    to_location = models.CharField(max_length=100, default="")
    payment_done = models.BooleanField(default=False)
    payment_amount = models.IntegerField(default=0)
    payment_date = models.DateTimeField(null=True, auto_now_add=True)
    estimated_date = models.DateTimeField(null=True)
    delivery_boy_assigned = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField(default=0)
    image = models.ImageField(upload_to="static/images/", blank=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    status = models.CharField(
        max_length=100, default="Unpaid", choices=PRODUCT_STATUS)


class Recipt(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total_price = models.IntegerField(default=0)
    products = models.ManyToManyField(Product)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, null=True)
    status = models.CharField(
        max_length=100, default="Pending")
    return_status = models.CharField(
        max_length=100, default="Pending")
    reason = models.TextField(blank=True)
    delivery_boy_review = models.TextField(blank=True)
    return_products= models.JSONField(null=True)
    exchange_refund_status = models.CharField(
        max_length=100, default="Pending")


    def __str__(self):
        return self.quantity
