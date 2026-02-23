<p align="center">
  <img src="public/logo-2.webp" alt="ASAP" width="96" />
</p>

<h1 align="center">ASAP — Applied Strength & Advancement Platform</h1>

<p align="center">
  A self-hosted, data-driven workout management and analytics platform for serious lifters who want to track, analyze, and optimize their training.
</p>

<p align="center">
  <a href="https://asap-open.github.io/asap-docs/">Documentation</a> ·
  <a href="https://asap-open.github.io/asap-docs/installation">Installation</a> ·
  <a href="https://asap-open.github.io/asap-docs/api/authentication">API Reference</a>
</p>

## Features

- **Smart Workout Tracking** - Log sets, reps, and weights with precision
- **Progress Analytics** - Visualize strength gains with comprehensive charts
- **Progressive Overload** - Built-in insights to optimize training decisions
- **Exercise Library** - Comprehensive database with custom exercise support
- **Body Weight Tracking** - Monitor weight changes alongside performance
- **Self-Hosted** - Full control over your training data

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for fast development
- Recharts for data visualization
- TailwindCSS for styling
- React Router for navigation

### Backend

- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL database
- JWT authentication

### Infrastructure

- Docker & Docker Compose
- Nginx reverse proxy
- Multi-container architecture

## Quick Start

### Prerequisites

- Docker & Docker Compose

### Self-Hosted Deployment

All deployment files are in the [`deploy/`](deploy/) directory. See the [Installation Guide](https://asap-open.github.io/asap-docs/installation) for the full walkthrough.

**1. Create a directory and download the files**

```bash
mkdir asap && cd asap

# With bundled database:
curl -O https://raw.githubusercontent.com/asap-open/ASAP/main/deploy/compose.with-db.yaml
curl -O https://raw.githubusercontent.com/asap-open/ASAP/main/deploy/.env.with-db

# Or with your own external database:
curl -O https://raw.githubusercontent.com/asap-open/ASAP/main/deploy/compose.external-db.yaml
curl -O https://raw.githubusercontent.com/asap-open/ASAP/main/deploy/.env.external-db
```

**2. Copy the env file, fill in your values, and start**

```bash
cp .env.with-db .env          # or .env.external-db
# edit .env — set JWT_SECRET, DOMAIN_NAME, etc.
docker compose -f compose.with-db.yaml up -d
```

The app will be available at `http://<your-host>` (port 80).

### Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/ASAP/workout-tool.git
cd workout-tool
```

2. **Set up environment variables**

Create `.env` files in both `client/` and `server/` directories:

**server/.env**

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/workout_db"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=3000
NODE_ENV=development
```

**client/.env**

```env
VITE_API_URL=http://localhost:3000
```

3. **Start the application**

```bash
docker-compose up -d
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Development

### Run without Docker

**Backend**

```bash
cd server
yarn install
yarn dev
```

**Frontend**

```bash
cd client
yarn install
yarn dev
```

### Database Migrations

```bash
cd server
yarn prisma migrate dev
```

### Seed Database

```bash
cd server
yarn seed
```

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   ├── layouts/     # Layout components
│   │   └── utils/       # Utilities and API client
│   └── Dockerfile
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Custom middleware
│   │   └── utils/       # Utilities
│   ├── prisma/          # Database schema & migrations
│   └── Dockerfile
├── docs/                # VitePress documentation
└── docker-compose.yaml  # Container orchestration
```

## Documentation

Full documentation is available at the `/docs` directory. Build and serve locally:

```bash
cd docs
yarn install
yarn docs:dev
```

Visit http://localhost:5174 to view the documentation.

## API Reference

Full API documentation is available at [asap-open.github.io/asap-docs/api/authentication](https://asap-open.github.io/asap-docs/api/authentication).

Key endpoints:

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| `POST` | `/api/auth/signup`      | Register a new user         |
| `POST` | `/api/auth/signin`      | Sign in (email or username) |
| `GET`  | `/api/exercises/search` | Search exercise library     |
| `POST` | `/api/sessions`         | Log a workout session       |
| `GET`  | `/api/progress/pbs`     | Get personal bests          |
| `POST` | `/api/weights`          | Log body weight             |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the **GPLv3 License** — see [LICENSE](LICENSE) for details.

---

<p align="center">Built with precision for measurable improvement.</p>
