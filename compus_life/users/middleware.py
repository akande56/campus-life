
from django.http import JsonResponse
from django.middleware.csrf import get_token

class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Get the CSRF token
        csrf_token = get_token(request)

        # Continue processing the request
        response = self.get_response(request)

        # Add CORS headers for all responses
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"  # Adjust with your React frontend URL
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "accept, authorization, content-type, x-csrftoken"
        response["Access-Control-Allow-Credentials"] = "true"

        # Add CSRF token to headers if available
        if csrf_token:
            response["X-CSRFToken"] = csrf_token

        return response
