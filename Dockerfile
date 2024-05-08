# stage 0: compile angular frontend
FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# stage 1: serve app with nginx server
FROM nginx:alpine
COPY --from=build /app/dist/handson-angular/browser /usr/share/nginx/html
EXPOSE 80