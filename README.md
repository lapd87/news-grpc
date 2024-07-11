# News API

A simple gRPS server for news using Node.js and MongoDB.

## Requirements

- Node.js
- MongoDB
- Docker
- Docker Compose

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lapd87/news-grpc.git
   ```
   then navigate to it

   ```bash
   cd news-grpc
   ```

2. Build and start the Docker containers:
   ```bash
    docker-compose up --build
    ```
    or run the server locally
   ```bash
    npm start
    ```
3. Interact with the gRPC service using the included gRPC client or tools like `grpcurl` at http://localhost:50051.


## GRPC API

- `CreateNews`: Create a new news article.
- `GetNews`: Get all news articles (supports filtering and sorting).
  - `sortBy`: Field to sort news entities ('date' or 'title'). 
  - `sortOrder`: Sorting direction ('asc' or 'desc').
  - `filterBy`: Field to filter news entities ('date' or 'title').
  - `filterValue`: Value to filter news entities.

Every request is recorded into a new MongoDB collection using the Saga design pattern.
