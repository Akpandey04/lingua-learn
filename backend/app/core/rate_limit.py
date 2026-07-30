import time
from collections import defaultdict
from fastapi import Request, HTTPException, status

class RateLimiter:
    def __init__(self, requests_per_minute: int = 10):
        self.requests_per_minute = requests_per_minute
        self.window_seconds = 60
        self.client_records = defaultdict(list)

    def check_rate_limit(self, client_ip: str):
        now = time.time()
        # Clean old timestamps
        timestamps = [ts for ts in self.client_records[client_ip] if now - ts < self.window_seconds]
        self.client_records[client_ip] = timestamps
        
        if len(timestamps) >= self.requests_per_minute:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please try again later."
            )
        
        self.client_records[client_ip].append(now)

auth_rate_limiter = RateLimiter(requests_per_minute=10)

async def rate_limit_auth(request: Request):
    client_ip = request.client.host if request.client else "127.0.0.1"
    auth_rate_limiter.check_rate_limit(client_ip)
