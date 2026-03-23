
# Use lightweight Node 16 Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the full project source
COPY . .

# Expose the app's port
EXPOSE 3000

# Command to run your Node.js app	
CMD ["node", "./src/server.js"]
