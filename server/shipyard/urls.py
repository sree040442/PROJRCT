from rest_framework.routers import DefaultRouter

from shipyard.views import *

router = DefaultRouter()

router.register(r"shipments", ShipmentViewSet)
router.register(r"users", UserViewSet)
router.register(r"groups", GroupViewSet)
router.register(r"products", ProductViewSet)
router.register(r"recipts", ReciptViewSet)

urlpatterns = router.urls