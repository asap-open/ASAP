# ASAP - Applied Strength & Advancement Platform

A data-driven workout management and analytics system for serious lifters who want to track, analyze, and optimize their training.

![ASAP Platform](docs/public/logo-2.webp)

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
- Git

### Installation

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
npm install
npm run dev
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

### Database Migrations

```bash
cd server
npx prisma migrate dev
```

### Seed Database

```bash
cd server
npm run seed
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
npm install
npm run docs:dev
```

Visit http://localhost:5174 to view the documentation.

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/exercises` - List exercises
- `POST /api/sessions` - Create workout session
- `GET /api/sessions/:id` - Get session details
- `POST /api/weights` - Log body weight
- `GET /api/weights/history` - Get weight history

See [API Documentation](docs/api/) for complete details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.

---

Built with precision for measurable improvement.
