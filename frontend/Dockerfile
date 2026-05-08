# Stage 1: Build Vite frontend
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Use .env.docker file for production environment
RUN cp .env.docker .env.production

# Build the Vite project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy dist folder  //build frontend
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config   //run all pages
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]