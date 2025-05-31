# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.1.0
FROM node:${NODE_VERSION}-alpine

# Set development environment
ENV NODE_ENV=development

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file
COPY package*.json ./

# Use cache for npm and install ALL dependencies (including dev)
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Expose app port
EXPOSE 5000

# Start the app using nodemon (installed in devDependencies)
CMD ["npx", "nodemon", "index.ts"]
