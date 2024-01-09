# Use a lightweight Linux base image
FROM node:16.20.2-slim AS builder

# Set the working directory
WORKDIR /app

# Install necessary packages and clean up in a single step
RUN apt-get update && apt-get install -y \
    build-essential make gcc g++ automake autoconf python openssl libssl-dev -y \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy package.json and yarn.lock separately to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies with a production-like flag and cleanup
RUN yarn install --frozen-lockfile --production=false && \
    yarn cache clean

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384

# Build the application and install serve globally
RUN yarn build && \
    yarn global add serve && \
    yarn cache clean

# Expose the port
EXPOSE 3000

# Start the application with serve
CMD ["yarn","start"]