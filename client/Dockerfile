# Use Node.js LTS alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package definition files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port Vite preview runs on (default 4173)
EXPOSE 4173

# Run the preview server accessible from outside the container
CMD ["yarn", "preview", "--host"]