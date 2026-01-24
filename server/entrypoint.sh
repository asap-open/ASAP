#!/bin/sh

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npx prisma db seed

echo "🚀 Starting server..."
npx tsx src/index.ts