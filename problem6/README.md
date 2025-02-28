# Live Scoreboard API Module Specification

## Overview

This document outlines the design and implementation of a real-time scoreboard system that displays the top 10 users based on their scores. The module handles score updates securely, prevents unauthorized modifications, and pushes live updates to connected clients.

## Table of Contents

- [System Architecture](#system-architecture)
- [API Endpoints](#api-endpoints)
- [Authentication & Security](#authentication--security)
- [Data Model](#data-model)
- [Real-time Updates](#real-time-updates)
- [Caching Strategy](#caching-strategy)
- [Implementation Considerations](#implementation-considerations)

## System Architecture

### Flow Diagram

```
┌────────────┐         ┌─────────────────┐         ┌────────────────┐
│            │  Auth   │                 │ Validate │                │
│   Client   ├────────►│  API Gateway    ├────────►│  Auth Service  │
│            │         │                 │         │                │
└────────────┘         └─────────────────┘         └────────────────┘
      │                         │                           │
      │                         │                           │
      │                         ▼                           │
      │               ┌─────────────────┐                   │
      │               │                 │                   │
      │               │  Score Service  │◄──────────────────┘
      │               │                 │
      │               └─────────────────┘
      │                         │
      │                         │ Update
      │                         ▼
      │               ┌─────────────────┐
      │               │                 │
      │               │  Score DB       │
      │               │                 │
      │               └─────────────────┘
      │                         │
      │                         │ Notify
      │                         ▼
      │               ┌─────────────────┐
      │               │                 │
      │    Subscribe  │  Pub/Sub        │
      └──────────────►│  Service        │
                      │                 │
                      └─────────────────┘
```

## API Endpoints

### 1. Update User Score

```
POST /api/{version}/scores/
```

**Request Header:**

```json
{
  "authorization": "string",
  "x-request-id": "string" // Enhance tracing and tracking requests (logs)
}
```

**Request Body:**

```json
{
  "point": "number"
}
```

**Response:**

```json
{
  "status_code": "number",
  "message": "string",
  "data": {
    "newScore": "number",
    "rank": "number",
    "newToken": "string"
  }
}
```

**Status Codes:**

- 200: Success
- 401: Unauthorized
- 409: Conflict (duplicate action)
- 422: Invalid request

### 2. Get Top Scoreboard

```
GET /api/{version}/scores/leaderboard
```

**Response:**

```json
{
  "status_code": "number",
  "message": "string",
  "data": {
    "leaderboard": [
      {
        "userId": "string",
        "username": "string",
        "score": "number",
        "rank": "number"
      }
      // ... up to 10 records
    ]
  }
}
```

**Status Codes:**

- 200: Success
- 304: Not Modified (if using If-None-Match header)

### 3. WebSocket Connection

```
WS /api/scores/live
```

**Events:**

- `leaderboard_update`: Pushed when the top 10 changes
- `user_score_update`: Pushed when the authenticated user's score changes

## Authentication & Security

### JWT-Based Authentication

- All API requests used for update point must include a valid JWT token in the Authorization header
- Each token should include:
  - User ID
  - Expiration time (5 min)
  - A unique nonce to prevent replay attacks
  - Timestamp

### Replay Attack Prevention

1. Each score update request must contain:
   - A unique nonce
   - Current timestamp
   - Valid JWT with unexpired nonce
2. Server will store processed nonce for a configurable period (Redis)
3. Duplicate action IDs within the retention period will be rejected

### Rate Limiting

- Maximum 10 score update requests per minute per user
- Maximum 100 leaderboard requests per minute per IP address

## Data Model

### User Score Schema

```json
{
  "userId": "string (UUID)",
  "username": "string",
  "score": "integer",
  "lastUpdated": "timestamp",
  "actionLog": [
    {
      "points": "integer",
      "timestamp": "timestamp"
    }
  ]
}
```

## Real-time Updates

### WebSocket Implementation

- Client establishes WebSocket connection
- Server authenticates using initial token
- Server pushes updates when:
  - Top 10 leaderboard changes
  - The specific user's score changes

### Message Format

```json
{
  "type": "leaderboard_update",
  "data": {
    "leaderboard": [...]
  },
  "timestamp": "ISO-8601 string"
}
```

## Caching Strategy

### Leaderboard Cache

- Cache top 10 leaderboard in Redis
- Invalidate cache on score updates that affect the top 10
- Set TTL of 1 minute as backup invalidation

### User Score Cache

- Cache individual user scores with TTL of 5 minutes
- Update cache on score changes

## Implementation Considerations

### Scalability Considerations

- Horizontally scalable API servers behind load balancer (Redis cluster, Replica set for Mongodb, Master slave pattern for Postgres,...)
- WebSocket connections should be sticky (same client to same server)
- Consider sharding user data if the user base grows significantly

## Implementation Notes and Improvements

1. **Security Enhancements**:

   - Consider implementing server-side action verification to ensure each score update is legitimate
   - Add IP-based tracking for suspicious activity patterns
   - Implement progressive rate limiting (increasing lockout periods for repeated abuse)

2. **Monitoring Suggestions**:

   - Add Prometheus metrics for tracking:
     - Score update frequency
     - Leaderboard request frequency
     - Rejected score update attempts
     - WebSocket connection count
