# Self-Hosted Deployment

This directory contains everything you need to run ASAP on your own infrastructure using Docker Compose.

Two deployment options are provided depending on whether you want Docker to manage your database or whether you already have one running.

---

## Option A – Compose with bundled database

Use this if you want a fully self-contained stack where Docker manages the PostgreSQL database for you.

**Files**
| File | Purpose |
|---|---|
| `compose.with-db.yaml` | Spins up PostgreSQL, the API server, and the web client |
| `.env.with-db` | Environment variables for the above |

**Steps**

1. Copy the env file and fill in your values:
   ```bash
   cp .env.with-db .env
   ```
2. Edit `.env` – at a minimum change `POSTGRES_PASSWORD`, `JWT_SECRET`, and `DOMAIN_NAME`.
3. Start the stack:
   ```bash
   docker compose -f compose.with-db.yaml --env-file .env up -d
   ```
4. The client will be available at `http://<your-host>:${CLIENT_PORT}` (default port `80`).

> Database data is persisted in a named Docker volume (`asap-db-data`) and will survive container restarts.

---

## Option B – Compose with external database

Use this if you already have a PostgreSQL instance running (on the host machine, a remote server, a managed cloud database, etc.).

**Files**
| File | Purpose |
|---|---|
| `compose.external-db.yaml` | Spins up only the API server and web client |
| `.env.external-db` | Environment variables for the above |

**Steps**

1. Copy the env file and fill in your values:
   ```bash
   cp .env.external-db .env
   ```
2. Edit `.env` – set `DATABASE_URL` to point at your existing database and update `JWT_SECRET` and `DOMAIN_NAME`.
3. Make sure your database is accessible from the Docker network:
   - If it runs on the same machine, the compose file already adds the `host.docker.internal` alias. Use `host.docker.internal` as the hostname in `DATABASE_URL`.
   - If it runs on a remote host, use that host's IP or domain name and ensure the port is open to the Docker host.
4. Start the stack:
   ```bash
   docker compose -f compose.external-db.yaml --env-file .env up -d
   ```
5. The client will be available at `http://<your-host>:${CLIENT_PORT}` (default port `80`).

---

## Stopping the stack

```bash
# Option A
docker compose -f compose.with-db.yaml down

# Option B
docker compose -f compose.external-db.yaml down
```

Add `-v` to also remove the database volume (Option A only) – **this will delete all data**.

---

## Environment variable reference

| Variable | Used in | Description |
|---|---|---|
| `POSTGRES_USER` | A | PostgreSQL username created on first boot |
| `POSTGRES_PASSWORD` | A | PostgreSQL password |
| `POSTGRES_DB` | A | PostgreSQL database name |
| `DATABASE_URL` | B | Full connection string for your external database |
| `SERVER_PORT` | A, B | Host port mapped to the API server (default `3000`) |
| `JWT_SECRET` | A, B | Secret key for signing JWTs |
| `TOKEN_EXP` | A, B | JWT expiry duration (default `7d`) |
| `FRONTEND_DOMAIN` | A, B | URL the server will accept CORS requests from |
| `CLIENT_PORT` | A, B | Host port mapped to the web client (default `80`) |
| `DOMAIN_NAME` | A, B | Public domain or IP for the web client |
