# Deployment Guide

This guide explains how to deploy the API service using either manual setup or Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Manual Deployment](#manual-deployment)
- [Docker Compose Deployment](#docker-compose-deployment)

## Prerequisites

- Node.js v20 or higher (for manual deployment)
- MongoDB v4.4 or higher (for manual deployment)
- Redis v7.x or higher (for manual deployment)
- Docker and Docker Compose (for containerized deployment)
- Git

## Environment Configuration

Create a `.env` file in the project root with the following variables:

```
PORT=3000
NODE_ENV=PROD  # Use "DEV" for development environments

# For manual deployment, use localhost or your actual DB server addresses
MONGO_URL=mongodb://localhost:27017/problem5
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# For Docker deployment, these will work as-is (uses service names)
# MONGO_URL=mongodb://mongo:27017/problem5
# REDIS_HOST=redis
# REDIS_PORT=6379
# REDIS_DB=0

# Replace these with secure random strings in production
JWT_ACCESS_SECRET="your-secure-access-token-secret"
JWT_REFRESH_SECRET="your-secure-refresh-token-secret"
```

## Manual Deployment

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Build the application:

   ```bash
   yarn build
   ```

3. Set up environment variables (or use a .env file):

   ```bash
   cp .env.example .env
   # Edit the .env file with your configuration
   ```

4. Start the application:

   ```bash
   # Direct start
   node dist/index.js
   
   # Using PM2 for production (recommended)
   npm install -g pm2
   pm2 start dist/index.js --name problem5
   pm2 save
   pm2 startup
   ```

## Docker Compose Deployment

1. Create or update your `.env` file with Docker-specific settings:

   ```
   PORT=3000
   NODE_ENV=production
   
   # Use the service names defined in docker-compose.yml
   MONGO_URL=mongodb://mongo:27017/problem5
   REDIS_HOST=redis
   REDIS_PORT=6379
   REDIS_DB=0
   
   JWT_ACCESS_SECRET="your-secure-access-token-secret"
   JWT_REFRESH_SECRET="your-secure-refresh-token-secret"
   ```

2. Start the Docker Compose stack:

   ```bash
   docker-compose up -d
   ```

   This will:
   - Build the application container
   - Start MongoDB and Redis containers
   - Set up a Docker network for communication
   - Mount volumes for data persistence
