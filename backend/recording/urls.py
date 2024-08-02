from django.urls import path
from .views import UserInfoView, CameraListView, CameraRecordingView, CameraRecordingStreamView

urlpatterns = [
    path('user-info/', UserInfoView.as_view(), name='user_info'),
    path('camera-info/', CameraListView.as_view(), name='camera_info'),
    path('camera-info-recording/<int:camera_id>/', CameraRecordingView.as_view(), name='camera_info_recording'),
    path('camera-info-recording-stream/<int:camera_id>/', CameraRecordingStreamView.as_view(), name='camera_info_recording_stream'),
]
