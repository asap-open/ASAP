#!/bin/sh
set -e

echo "⏳ Waiting for database at host.docker.internal:5432..."
# Wait for the port to open (requires netcat/nc, available in alpine)
until nc -z host.docker.internal 5432; do
  echo "Database is unavailable - sleeping"
  sleep 2
done
echo "✅ Database is up!"

echo "🔄 Running database migrations..."
# Use the explicit config flag to avoid ambiguity
npx prisma migrate deploy --config prisma.config.ts

echo "🌱 Seeding database..."
npx prisma db seed --config prisma.config.ts

echo "🚀 Starting server..."
# Using exec ensures the process handles signals correctly
exec yarn start