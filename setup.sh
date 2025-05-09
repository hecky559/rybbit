#!/bin/bash

# Exit 
DOMAIN_NAME=${DOMAIN_NAME}
BASE_URL=${BASE_URL}
BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}

# Defaulting to empty strings to suppress docker-compose warnings
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUD=
EOL

echo ".env file created successfully with domain ${DOMAIN_NAME}."

# Build and start the Docker Compose stack
echo "Building and starting Docker services..."
docker compose up --build -d

echo "Setup complete. Services are starting in the background."
echo "You can monitor logs with: docker compose logs -f" 