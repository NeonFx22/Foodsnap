import time
from functools import wraps
from django.core.cache import cache
from django.http import JsonResponse

def rate_limit(max_requests=10, window_seconds=60):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            ip_address = request.META.get('REMOTE_ADDR')
            key = f"rate_limit_{ip_address}_{view_func.__name__}"
            requests = cache.get(key, [])
            current_time = time.time()
            requests = [req_time for req_time in requests if current_time - req_time < window_seconds]
            if len(requests) >= max_requests:
                return JsonResponse({"error": "Too many requests. Please try again later."}, status=429)
            requests.append(current_time)
            cache.set(key, requests, timeout=window_seconds)
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator
