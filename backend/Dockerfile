FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the application code
COPY . .

# App runs on this port
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]










# FROM node:20

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE  3000

# CMD ["node", "app.js"]