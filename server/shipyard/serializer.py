from rest_framework import serializers
from shipyard.models import Shipment, Product, Recipt
from django.contrib.auth.models import User, Group


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = "__all__"

    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ReciptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipt
        fields = "__all__"