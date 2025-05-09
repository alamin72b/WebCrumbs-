# Use a lightweight Python image as base
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy all files from your local project into the container's /app folder
COPY . .

# Expose port 8000 (so we can access it from outside the container)
EXPOSE 8000

# Run a simple Python HTTP server on port 8000
CMD ["python", "-m", "http.server", "8000"]
