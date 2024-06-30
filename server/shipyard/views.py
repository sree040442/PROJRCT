from rest_framework import viewsets
from shipyard.models import *
from shipyard.serializer import *
from django.contrib.auth.models import User, Group


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ReciptViewSet(viewsets.ModelViewSet):
    queryset = Recipt.objects.all()
    serializer_class = ReciptSerializer

