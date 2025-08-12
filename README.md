# Food Munch – Restaurant Web App

A full‑stack restaurant application with secure user authentication and a responsive, mobile‑friendly UI for browsing menu categories. Backend is built with Node.js/Express and MongoDB (Mongoose); frontend is served as static assets from the `public` directory.

## Features
- Secure user registration and login with email validation and bcrypt password hashing
- Responsive UI built with HTML, CSS, Bootstrap 4, and vanilla JavaScript
- Rich landing page with category navigation (Soups, Noodles, Salads, Desserts, Main Course, Non‑Veg/Veg starters, Fish & Seafood)
- Static asset hosting from Express for all frontend pages and images

## Tech Stack
- Backend: Node.js, Express 5, Mongoose 8, bcrypt, dotenv
- Database: MongoDB (Atlas or local)
- Frontend: HTML5, CSS3, Bootstrap 4.5, Vanilla JavaScript, Font Awesome

## Project Structure
```text
restaurant-app_copy/
├─ server.js                # Express app, Mongo connection, static hosting, routes
├─ routes/
│  └─ auth.js               # /api/auth (register, login)
├─ models/
│  └─ User.js               # Mongoose User schema (email, password)
├─ createUser.js            # Utility script to seed a user
├─ public/                  # Frontend assets (served statically)
│  ├─ login.html            # Login + Register UI (redirects to /home.html on success)
│  ├─ home.html             # Landing page with navigation to categories
│  ├─ style.css             # Styles for home and sections
│  ├─ *.html                # Category pages (soups, noodles, salads, etc.)
│  └─ *.jpeg / *.jpg        # Food images
├─ package.json             # Scripts + dependencies
└─ package-lock.json
```

## Prerequisites
- Node.js ≥ 18
- MongoDB (Atlas cluster or local instance)

## Environment Variables
Create a `.env` file in the project root:
```bash
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=5000  # optional, defaults to 5000
```

## Installation & Running
```bash
# Install dependencies
npm install

# Start the server
npm start
# or (for hot reload during development)
npx nodemon server.js
```
Then open `http://localhost:5000` in your browser. You will land on the login/registration page. On successful login, the app redirects to `/home.html`.

## API Reference
Base URL: `http://localhost:5000`

### POST /api/auth/register
Registers a new user.
- Request body (JSON):
```json
{ "email": "user@example.com", "password": "StrongP@ssw0rd" }
```
- Responses:
  - 201: `{ "message": "Registration successful" }`
  - 400: `{ "error": "Please enter a valid email address" | "User already exists" }`
  - 500: `{ "error": "Registration failed" }`

Example:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Passw0rd!"}'
```

### POST /api/auth/login
Authenticates a user.
- Request body (JSON):
```json
{ "email": "user@example.com", "password": "StrongP@ssw0rd" }
```
- Responses:
  - 200: `{ "message": "Login successful" }`
  - 400: `{ "error": "Please enter a valid email address" | "Invalid credentials" }`
  - 500: `{ "error": "Login failed" }`

Example:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Passw0rd!"}'
```

## Frontend Pages
- `public/login.html`: Login and registration UI (client‑side fetch to auth endpoints)
- `public/home.html`: Landing page with sections:
  - Why Choose Us, Explore Menu (8 categories), Delivery & Payment, Follow Us, Footer
- Category pages: `non_veg.html`, `veg_starters.html`, `soups.html`, `fish_and_sea_food.html`, `main_course.html`, `noodles.html`, `salads.html`, `deserts.html`

## Seeding a User (Optional)
Use the included utility to insert a user directly into MongoDB:
```bash
# Edit email/password in createUser.js as needed, then run:
node createUser.js
```
This script reads `MONGO_URI` from `.env`, hashes the password with bcrypt, and saves the user.

## Scripts
- `npm start`: Run the server with Node (`server.js`)
- `npx nodemon server.js`: Run with live reload in development

## Notes & Limitations
- Sessions/JWT are not implemented. The login flow provides a success response and the frontend redirects to `home.html`. To protect routes and pages server‑side, add proper session/JWT middleware.
- CORS is not required for same‑origin usage (frontend is served by the same Express app).

## Troubleshooting
- MongoDB connection fails:
  - Verify `MONGO_URI` credentials and database name
  - If using Atlas, allow your IP in Network Access and ensure SRV connection string format
- Cannot open `home.html` after login:
  - Ensure the file exists under `public/` and the server is running without errors



