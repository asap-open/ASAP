# --- Stage 1: Base & Dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app    
# Required for Prisma and bcryptjs (native builds)
RUN apk add --no-cache openssl-dev python3 make g++
COPY package.json yarn.lock ./
COPY prisma ./prisma
# Install all dependencies including devDependencies for the build
RUN yarn install --frozen-lockfile

# --- Stage 2: Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl-dev

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 1. Generate Prisma Client
RUN npx prisma generate

# 2. Build the TypeScript code to /dist
RUN yarn build

# --- Stage 3: Production Dependencies ---
FROM node:20-alpine AS prod-deps
WORKDIR /app
RUN apk add --no-cache openssl-dev

COPY package.json yarn.lock ./
COPY prisma ./prisma 

# Now yarn install will find the schema for the postinstall script
RUN yarn install --frozen-lockfile --production --ignore-optional

# --- Stage 4: Runtime Image ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install runtime-only essentials
RUN apk add --no-cache libssl3 libstdc++

# Copy everything needed to run the app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/data ./data
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

# Use the non-root node user for security
USER node
EXPOSE 3000

CMD ["./entrypoint.sh"]