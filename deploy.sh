#!/bin/bash

# Stop running containers
docker-compose down

# Pull latest changes
git pull

# Build and start containers
docker-compose up --build -d

# Show logs
docker-compose logs -f
