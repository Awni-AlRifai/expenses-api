# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code to container
COPY frontend/. .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
