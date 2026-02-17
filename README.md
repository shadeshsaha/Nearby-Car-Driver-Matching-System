# Nearby Car & Driver Matching System

A backend system that allows users to request a ride and retrieves all available drivers within a specified radius. Each driver returned includes distance from the user and current location. Built with TypeScript, Node.js, Express.js, and Prisma (PostgreSQL).

# Features

- Request nearby drivers using latitude, longitude, and radius.
- Distance calculated dynamically using the Haversine formula.
- Returns drivers sorted by nearest first.
- Proper input validation using Zod.
- Centralized error handling for Prisma, validation, and general errors.
- Seeded database with mock data of drivers and cars for testing.

# Project Structure

.
├─ prisma/
│ ├─ schema.prisma # Database models
│ └─ seed.ts # Seed data (drivers and cars)
├─ src/
│ ├─ app/
│ │ ├─ middlewares/
│ │ │ ├─ globalErrorHandler.ts
│ │ │ └─ validateRequest.ts
│ │ ├─ modules/
│ │ │ └─ ride/
│ │ │ ├─ ride.controller.ts
│ │ │ ├─ ride.route.ts
│ │ │ ├─ ride.service.ts
│ │ │ └─ ride.validation.ts
│ │ └─ routes/
│ │ └─ index.ts
│ ├─ config/
│ │ └─ prisma.ts # Prisma client
│ ├─ app.ts # Express app setup
│ └─ server.ts # Server entry
└─ package.json

# Database Models

## Users

model User {
id Int @id @default(autoincrement())
name String
phone String
}

## Drivers

model Driver {
id Int @id @default(autoincrement())
name String
is_available Boolean @default(true)
current_lat Float
current_lng Float
car Car? @relation(fields: [id], references: [driver_id])
}

## Cars

model Car {
id Int @id @default(autoincrement())
driver_id Int @unique
model String
plate_number String
driver Driver @relation(fields: [driver_id], references: [id])
}

# Setup Instructions

## 1. Clone the repository

`git clone https://github.com/shadeshsaha/Nearby-Car-Driver-Matching-System.git`
`cd Nearby-Car-Driver-Matching-System`

## 2. Install dependencies

`npm install`

## 3. Set up environment variables

### Create a `.env` file in the root directory:

DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"
NODE_ENV=development
PORT=3000

## 4. Setup Prisma and the database

#Generate Prisma client
npx prisma generate

#Apply database migrations (creates tables)
npx prisma migrate dev --name init

#Seed the database with mock drivers and cars
npx ts-node prisma/seed.ts

## 5. Run the server

`npm run dev`

# API Documentation

## POST /api/ride/request

## Request nearby drivers within a radius.

## Request Body Example

{
"user_id": 1,
"pickup_lat": 23.8103,
"pickup_lng": 90.4125,
"radius_km": 5
}

### Response Example:

{
"success": true,
"message": "Nearby drivers retrieved successfully",
"available_drivers": [
{
"driver_id": 2,
"car_model": "Toyota Axio",
"distance_km": 1.23,
"location": { "lat": 23.8110, "lng": 90.4150 }
}
]
}
