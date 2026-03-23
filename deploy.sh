#!/bin/bash

APP_NAME="node-app"
IMAGE_NAME="node"
PORT=3000

echo "🔄 Pulling latest code from GitHub..."
git pull origin main

echo "🔁 Stopping and removing any existing container..."
docker stop $APP_NAME 2>/dev/null || true
docker rm $APP_NAME 2>/dev/null || true

echo "📦 Building Docker image..."
docker build -t $IMAGE_NAME .

echo "🚀 Running Docker container..."
docker run -d -p $PORT:$PORT --name $APP_NAME $IMAGE_NAME

echo "✅ Deployment complete."
echo "🌐 API is running at: http://localhost:$PORT"
