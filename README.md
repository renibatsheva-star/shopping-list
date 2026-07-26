# Shopping List

## Description

Shopping List is a full-stack web application that allows users to manage a shopping list.

Users can:

- Add new shopping items
- View all items
- Update existing items
- Delete items
- Search for items
- Mark items as bought

The frontend was built with **React (Vite)** and the backend was built with **Node.js** and **Express**. Data is stored in a local JSON file, and the project is containerized using Docker.

---

## Features

- Add new shopping items
- View all shopping items
- Update existing items
- Delete shopping items
- Search items
- Mark items as bought
- Input validation
- REST API
- Request logging
- Backend unit tests with Jest and Supertest
- Docker support
- Docker Compose
- GitHub Actions CI workflow

---

## Technologies

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express
- Morgan
- CORS

### Testing

- Jest
- Supertest

### DevOps

- Docker
- Docker Compose
- GitHub Actions

---

## Project Structure

```text
shopping-list/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── server/
│   ├── app.js
│   ├── app.test.js
│   ├── items.json
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── package.json
├── README.md
└── ALL_LICENSES
```

---

## Requirements

Before running the project, make sure you have installed:

- Node.js
- npm
- Docker (optional)
- Docker Compose (optional)

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd shopping-list
```

Install the project dependencies:

```bash
npm install
cd server
npm install
cd ../client
npm install
```

---

## Running the Project

Run both the frontend and backend:

```bash
npm run dev
```

Or run them separately.

### Backend

```bash
cd server
npm start
```

Runs on:

```
http://localhost:5000
```

### Frontend

```bash
cd client
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Running Tests

Run backend tests:

```bash
cd server
npm test
```

The tests cover:

- GET /items
- POST /items
- PUT /items/:id
- DELETE /items/:id
- Input validation
- Error handling

---

## Docker

Build and run the application:

```bash
docker compose up --build
```

Stop the application:

```bash
docker compose down
```

Docker Compose starts both the React frontend and the Express backend.

---

## CI/CD

The project includes a GitHub Actions workflow.

Whenever code is pushed to the repository, GitHub Actions automatically:

- Builds the backend Docker image
- Builds the frontend Docker image
- Verifies that both Docker images build successfully

---

## Logging

The backend uses **Morgan** to log incoming HTTP requests.

Application events such as:

- Item added
- Item updated
- Item deleted
- Validation errors

are written to a log file during runtime.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API status |
| GET | /items | Get all items |
| POST | /items | Create a new item |
| PUT | /items/:id | Update an item |
| DELETE | /items/:id | Delete an item |

---

## Validation

The backend validates all user input.

Invalid requests include:

- Empty product name
- Quantity less than or equal to 0
- Missing required fields

These requests return:

```
400 Bad Request
```

If an item does not exist, the API returns:

```
404 Not Found
```

---

## Future Improvements

- Store data in MongoDB
- User authentication
- Filter items
- Responsive design improvements

---

## Author

**Renana Yosef**