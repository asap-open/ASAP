# Stage 1: Install dependencies and generate Prisma
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl-dev

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma.config.ts ./prisma.config.js
COPY prisma ./prisma
RUN npx prisma generate

# Stage 2: Production dependencies only
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-optional

# Stage 3: Final Production Image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only runtime essentials
RUN apk add --no-cache libssl3 libstdc++ && \
    npm install -g tsx prisma

# Copy production dependencies and generated Prisma client
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/generated ./generated
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/prisma.config.js ./prisma.config.js

# Copy application source and data
COPY --chown=node:node src ./src
COPY --chown=node:node data ./data
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

USER node
EXPOSE 3000

CMD ["./entrypoint.sh"]