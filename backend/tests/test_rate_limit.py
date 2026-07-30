from fastapi.testclient import TestClient
from app.main import app
from app.core.rate_limit import RateLimiter, rate_limit_auth
from fastapi import HTTPException

def test_rate_limiter_exceeded():
    limiter = RateLimiter(requests_per_minute=2)
    client_ip = "192.168.1.100"
    
    # 1st request ok
    limiter.check_rate_limit(client_ip)
    # 2nd request ok
    limiter.check_rate_limit(client_ip)
    
    # 3rd request throws 429
    try:
        limiter.check_rate_limit(client_ip)
        assert False, "Should have raised 429 HTTPException"
    except HTTPException as exc:
        assert exc.status_code == 429
        assert "Rate limit exceeded" in exc.detail
