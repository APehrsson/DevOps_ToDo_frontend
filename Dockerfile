# Base image
FROM node:slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g typescript

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]
