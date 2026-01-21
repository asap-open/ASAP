FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install ALL dependencies (including devDependencies like tsx)
RUN yarn install --frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the source code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Run directly with tsx
CMD ["npx", "tsx", "src/index.ts"]