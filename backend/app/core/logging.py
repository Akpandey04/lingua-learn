import logging
import json
import sys
from datetime import datetime, timezone

SENSITIVE_KEYS = {"password", "hashed_password", "token", "access_token", "refresh_token", "secret", "authorization"}

def sanitize_data(data):
    if isinstance(data, dict):
        sanitized = {}
        for key, value in data.items():
            if any(s_key in key.lower() for s_key in SENSITIVE_KEYS):
                sanitized[key] = "[REDACTED]"
            else:
                sanitized[key] = sanitize_data(value)
        return sanitized
    elif isinstance(data, list):
        return [sanitize_data(item) for item in data]
    return data

class StructuredFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        log_object = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        if hasattr(record, "event_type"):
            log_object["event_type"] = record.event_type
        if hasattr(record, "extra_data") and isinstance(record.extra_data, dict):
            log_object["data"] = sanitize_data(record.extra_data)
        if record.exc_info:
            log_object["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_object)

def setup_logging():
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(StructuredFormatter())
    
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.handlers = [handler]

logger = logging.getLogger("lingua_learn")

def log_event(event_type: str, message: str, level: int = logging.INFO, **extra_data):
    logger.log(level, message, extra={"event_type": event_type, "extra_data": extra_data})
