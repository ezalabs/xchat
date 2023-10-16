.PHONY: start
start:
	uvicorn main:app --reload --host 0.0.0.0 --port 8080

.PHONY: format
format:
	black .
	isort .