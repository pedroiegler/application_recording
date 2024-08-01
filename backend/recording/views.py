from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
