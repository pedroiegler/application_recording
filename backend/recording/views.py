from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import requests

class UserInfoView(APIView):
    def get(self, request, *args, **kwargs):
        token = '04e8a2a6387e994ebf129a35650e533415b3b982'
        headers = {
            'Authorization': f'PersonalAccessToken {token}',
            'Content-Type': 'application/json',
        }
        response = requests.get('https://api.angelcam.com/v1/me/', headers=headers)
        
        if response.status_code == 200:
            return Response(response.json())
        else:
            return Response({'error': 'Failed to fetch data from Angelcam API'}, status=response.status_code)

class CameraListView(APIView):
    def get(self, request, *args, **kwargs):
        token = '04e8a2a6387e994ebf129a35650e533415b3b982' 
        headers = {
            'Authorization': f'PersonalAccessToken {token}',
            'Content-Type': 'application/json',
        }
        response = requests.get('https://api.angelcam.com/v1/shared-cameras/', headers=headers)
        
        if response.status_code == 200:
            return Response(response.json())
        else:
            return Response({'error': 'Failed to fetch cameras', 'details': response.json()}, status=response.status_code)

class CameraRecordingView(APIView):
    def get(self, request, *args, **kwargs):
        camera_id = kwargs.get('camera_id')
        token = '04e8a2a6387e994ebf129a35650e533415b3b982'
        headers = {
            'Authorization': f'PersonalAccessToken {token}',
            'Content-Type': 'application/json',
        }

        if not camera_id:
            return Response({'error': 'Camera ID is required'}, status=400)

        try:
            url = f'https://api.angelcam.com/v1/shared-cameras/{camera_id}/recording/'
            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                return Response(response.json())
            else:
                return Response({'error': 'Failed to fetch recording stream', 'details': response.json()}, status=response.status_code)
        except requests.RequestException as e:
            return Response({'error': 'Request failed', 'details': str(e)}, status=500)
        
class CameraRecordingStreamView(APIView):
    def get(self, request, *args, **kwargs):
        camera_id = kwargs.get('camera_id')
        start_time = request.query_params.get('start')  
        token = '04e8a2a6387e994ebf129a35650e533415b3b982'
        headers = {
            'Authorization': f'PersonalAccessToken {token}',
            'Content-Type': 'application/json',
        }

        if not camera_id:
            return Response({'error': 'Camera ID is required'}, status=400)
        
        if not start_time:
            return Response({'error': 'Start Time is required'}, status=400)

        try:
            url = f'https://api.angelcam.com/v1/shared-cameras/{camera_id}/recording/stream/?start={start_time}'
            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                return Response(response.json())
            else:
                return Response({'error': 'Failed to fetch recording stream', 'details': response.json()}, status=response.status_code)
        except requests.RequestException as e:
            return Response({'error': 'Request failed', 'details': str(e)}, status=500)