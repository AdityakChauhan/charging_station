# Charging Station Management System

A full-stack web application for managing electric vehicle charging stations. Built with Vue.js, Node.js, Express, and MySQL.

## Deployed Link: https://chargingstationsapplication.netlify.app/

## Test Account
```
Email: testuser@email.com
Password: testuserpassword
```

## Features

- 🔐 User Authentication with JWT
- 📍 Interactive Map View with OpenStreetMap
- ⚡ CRUD Operations for Charging Stations
- 🔍 Advanced Filtering and Search
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- Vue.js 3 with Composition API
- Vue Router for navigation
- Pinia for state management
- Tailwind CSS for styling
- Leaflet for map integration
- Axios for API calls

### Backend
- Node.js & Express
- MySQL with Sequelize ORM
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd charging-station
```

2. Set up the backend:
```bash
cd backend
npm install

# Create a .env file with the following content:
# DB_PASS=your_mysql_password
# JWT_SECRET=your_jwt_secret
# CLIENT_ORIGIN=http://localhost:5173
# BACKEND_PORT=8081
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8081

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- POST /api/users/logout - Logout user
- GET /api/users/me - Get current user

### Charging Stations
- GET /api/stations - Get all stations (with optional filters)
- GET /api/stations/:id - Get station by ID
- POST /api/stations - Create new station
- PUT /api/stations/:id - Update station
- DELETE /api/stations/:id - Delete station

## Database Schema

### Users
- id (UUID)
- email (String, unique)
- name (String)
- password (String, hashed)

### Charging Stations
- id (UUID)
- name (String, unique)
- location (Point, latitude/longitude)
- status (Enum: Active/Inactive)
- powerOutput (Float)
- connectorType (Enum: Type2/CCS/CHAdeMO/Tesla/GB/T)

## Features in Detail

### Authentication
- JWT-based authentication
- Protected routes
- Persistent sessions
- Secure password hashing

### Charging Station Management
- Create, view, edit, and delete stations
- Filter stations by:
  - Status
  - Connector type
  - Power output range
- Interactive map view
- Real-time updates

### Map Features
- Display all stations on map
- Click markers to view details
- Center map on stations
- Custom markers for station status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 
