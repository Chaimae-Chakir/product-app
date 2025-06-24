# Product Management App

A full-stack product management application with a Spring Boot backend and React frontend.

---

## Features
- User authentication (JWT)
- Product CRUD
- Role-based access
- PostgreSQL database
- Dockerized for easy deployment

---

## Prerequisites
- Java 17+
- Node.js 18+
- npm 9+
- React 18+
- PostgreSQL 14+ (if running without Docker)
- Maven 3.8+

---

## User Authentication

- **Admin login:**
  - Username: `admin`
  - Password: `123`
- **User login:**
  - Username: `user`
  - Password: `123`

---

## Running Locally (Without Docker)

### 1. **Database Setup**
- Create a PostgreSQL database (e.g., `product`).
- Update `product-back/src/main/resources/application.yml` with:
  - **Database:** `product`
  - **User:** `postgres`
  - **Password:** `postgres`

### 2. **Backend**
```bash
cd product-back
mvn clean install
mvn spring-boot:run
```

### 3. **Frontend**
```bash
cd product-front
npm install
npm start
```

- The frontend will run on [http://localhost:3000](http://localhost:3000)
- The backend will run on [http://localhost:8080](http://localhost:8080)

---

## Running with Docker

### 1. **Build and Start All Services**
```bash
docker-compose up --build
```
- This will start:
  - Backend (Spring Boot)
  - Frontend (React)
  - PostgreSQL
  - pgAdmin (for DB management)

### 2. **Access Services**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8080](http://localhost:8080)
- pgAdmin: [http://localhost:5050](http://localhost:5050)

---

## pgAdmin Setup

1. Open [http://localhost:5050](http://localhost:5050) in your browser.
2. **Login credentials:**
   - Email: `admin@gmail.com`
   - Password: `123`
3. **Add a new server:**
   - Click "Add New Server"
   - **General tab:**
     - Name: `product` (or any name)
   - **Connection tab:**
     - Host name/address: `db`
     - Port: `5432`
     - Username: `postgres`
     - Password: `postgres`
     - Database: `product`
     - Save Password: checked
   - Click "Save"
4. You can now manage your PostgreSQL database from pgAdmin.

---

## Database Migrations
- Managed by Liquibase (runs automatically on backend startup)

---

## Useful Commands
- **Stop Docker containers:**
  ```bash
  docker-compose down
  ```
- **Rebuild containers:**
  ```bash
  docker-compose up --build
  ```
