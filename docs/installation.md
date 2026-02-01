# Installation

ASAP can be deployed in multiple ways depending on your needs. Choose the method that works best for you.

## Prerequisites

- **Docker & Docker Compose** (recommended)
- **Node.js 18+** and **PostgreSQL 14+** (for manual installation)
- **Git** for cloning the repository

---

## Method 1: Docker Compose (Recommended)

The easiest way to get ASAP running is with Docker Compose.

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/asap.git
cd asap
```

### Step 2: Environment Configuration

/workout_tool/tool-main/docs/public/logo-2.webp
Create a `.env` file in the `server` directory:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@db:5432/asap"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Server
PORT=3000
NODE_ENV=production
```

::: tip
Generate a secure JWT secret with: `openssl rand -base64 32`
:::

### Step 3: Start the Application

```bash
docker-compose up -d
```

This will:

- Start a PostgreSQL database
- Run database migrations
- Start the backend server on port 3000
- Start the frontend on port 80

### Step 4: Access ASAP

Open your browser and navigate to:

- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

### Step 5: Create Your Account

1. Click "Sign Up" on the homepage
2. Enter your details (username, email, password, full name)
3. Start tracking your workouts!

---

## Method 2: Docker (Separate Containers)

If you want more control over the containers:

### Build the Images

```bash
# Build backend
docker build -t asap-server ./server

# Build frontend
docker build -t asap-client ./client
```

### Run PostgreSQL

```bash
docker run -d \
  --name asap-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=asap \
  -p 5432:5432 \
  postgres:16-alpine
```

### Run Backend

```bash
docker run -d \
  --name asap-server \
  --link asap-db:db \
  -e DATABASE_URL="postgresql://postgres:postgres@db:5432/asap" \
  -e JWT_SECRET="your-jwt-secret" \
  -e PORT=3000 \
  -p 3000:3000 \
  asap-server
```

### Run Frontend

```bash
docker run -d \
  --name asap-client \
  -p 80:80 \
  asap-client
```

---

## Method 3: Manual Installation (Development)

For development or if you prefer not to use Docker:

### Step 1: Clone and Install Dependencies

```bash
# Clone repository
git clone https://github.com/yourusername/asap.git
cd asap

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Setup PostgreSQL

Install PostgreSQL and create a database:

```bash
createdb asap
```

### Step 3: Configure Environment

Create `server/.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/asap"
JWT_SECRET="your-jwt-secret"
PORT=3000
NODE_ENV=development
```

### Step 4: Run Database Migrations

```bash
cd server
npx prisma migrate deploy
```

### Step 5: Seed Initial Data (Optional)

```bash
npm run seed
```

### Step 6: Start Development Servers

In one terminal (backend):

```bash
cd server
npm run dev
```

In another terminal (frontend):

```bash
cd client
npm run dev
```

Access the application:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000/api](http://localhost:3000/api)

---

## Verification

After installation, verify everything is working:

1. **Check Backend Health**

   ```bash
   curl http://localhost:3000/api/health
   ```

2. **Access Frontend**
   Open [http://localhost:5173](http://localhost:5173) in your browser

3. **Create Test Account**
   - Click "Sign Up"
   - Fill in the registration form
   - Log in with your credentials

---

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View database logs
docker logs asap-db
```

### Port Already in Use

If ports 3000 or 5173 are already in use:

```bash
# Change ports in docker-compose.yaml or .env files
# Backend port: modify PORT in .env
# Frontend port: modify docker-compose.yaml ports section
```

### Migration Failures

If database migrations fail:

```bash
# Reset database (warning: deletes all data)
cd server
npx prisma migrate reset

# Or manually run migrations
npx prisma migrate deploy
```

---

## Next Steps

- [Quick Start Guide](/guide/quick-start)
- [API Documentation](/api/authentication)
- [Feature Overview](/guide/features/sessions)

::: tip Need Help?
Open an issue on GitHub or check the troubleshooting guide.
:::
