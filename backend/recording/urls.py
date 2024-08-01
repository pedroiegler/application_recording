from django.urls import path
from .views import UserInfoView, CameraListView

urlpatterns = [
    path('user-info/', UserInfoView.as_view(), name='user_info'),
    path('camera-info/', CameraListView.as_view(), name='camera_info'),
]
