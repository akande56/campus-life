from django.http import JsonResponse
from django.middleware.csrf import get_token

class CorsMiddleware:
    def __init__(self, get_response):
        self.allowed_origins = [
            "http://127.0.0.1:5174",  # Add your local development origin
            "http://localhost:5174",  # Add another local development origin if needed
            "https://campuslife-dev.netlify.app",  # Add your production frontend origin
            
            # Add other allowed origins as needed
        ]
        self.get_response = get_response

    def __call__(self, request):
        # Get the CSRF token
        csrf_token = get_token(request)

        # Continue processing the request
        response = self.get_response(request)

        # Get the origin from the request's "Origin" header
        request_origin = request.headers.get("Origin", "")

        # Add CORS headers for all responses
        if request_origin in self.allowed_origins or "*" in self.allowed_origins:
            # Add CORS headers for allowed origins
            response["Access-Control-Allow-Origin"] = request_origin
            response["Access-Control-Allow-Methods"] = "POST, DELETE, GET, PATCH, PUT, OPTIONS"
            response["Access-Control-Allow-Headers"] = "accept, authorization, content-type, x-csrftoken"
            response["Access-Control-Allow-Credentials"] = "true"

        # Add CSRF token to headers if available
        if csrf_token:
            response["X-CSRFToken"] = csrf_token

        return response