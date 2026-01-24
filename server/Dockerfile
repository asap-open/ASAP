# Stage 1: Build & Prune
FROM node:20-bookworm AS builder
WORKDIR /app

COPY package.json yarn.lock ./
# Install ALL dependencies (needed for build)
RUN yarn install --frozen-lockfile
COPY prisma.config.ts ./prisma.config.js
COPY prisma ./prisma
RUN npx prisma generate

COPY . .

# Remove devDependencies to shrink node_modules for the next stage
RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline

# ---

# Stage 2: Final Production Image
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN npm install -g tsx prisma
RUN apt-get update -y && apt-get install -y openssl libssl-dev
# Copy production dependencies and generated Prisma client
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/generated ./generated
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --chown=node:node ./data ./data
# Copy source code and config files
COPY --chown=node:node src ./src
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node tsconfig.json ./tsconfig.json
COPY --chown=node:node entrypoint.sh ./entrypoint.sh
COPY --from=builder --chown=node:node /app/prisma.config.js ./prisma.config.js

RUN chmod +x ./entrypoint.sh

USER node
EXPOSE 3000

CMD ["./entrypoint.sh"]