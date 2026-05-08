Task Management Microservices Platform

A containerized task management platform built with a microservices architecture using Docker, Kubernetes, and Helm.

This project demonstrates modern DevOps practices including:

* Multi-service application architecture
* Docker containerization
* Docker Compose orchestration
* Kubernetes deployments
* Helm packaging
* Reverse proxy configuration with Nginx
* Redis background processing
* PostgreSQL persistence

⸻

                   Architecture
                ┌─────────────┐
                │   Frontend  │
                └──────┬──────┘
                       │
                 HTTP Requests
                       │
                ┌──────▼──────┐
                │    Nginx    │
                │ ReverseProxy│
                └──────┬──────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
 ┌──────▼──────┐              ┌──────▼──────┐
 │     API     │              │   Worker    │
 │  Node.js    │              │ Background  │
 └──────┬──────┘              │ Processing  │
        │                     └──────┬──────┘
        │                            │
        │                    Redis Queue
        │                            │
 ┌──────▼──────┐              ┌──────▼──────┐
 │ PostgreSQL  │              │    Redis    │
 │ Database    │              │    Cache    │
 └─────────────┘              └─────────────┘

 ⸻

Tech Stack

Backend

* Node.js
* Express.js

Frontend

* HTML/CSS/JavaScript

Infrastructure

* Docker
* Docker Compose
* Kubernetes
* Helm
* Nginx

Data Layer

* PostgreSQL
* Redis

⸻

Features

* Task creation API
* Background worker processing
* Redis queue integration
* PostgreSQL persistence
* Reverse proxy routing
* Multi-container orchestration
* Kubernetes-ready deployment
* Helm chart packaging

⸻

Project Structure
task-system/
│
├── api/
├── worker/
├── frontend/
├── nginx/
├── helm/
│   ├── templates/
│   ├── Chart.yaml
│   └── values.yaml
│
├── docker-compose.yml
└── README.md

Running Locally With Docker Compose

Clone Repository

git clone <your-repository-url>

cd task-system


Start Services

docker compose up -d --build

