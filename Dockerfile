# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# Stage 2: Nginx serve built app
FROM nginx:alpine

# Copy built Angular app to Nginx html directory
COPY --from=build /app/dist/app/browser /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
