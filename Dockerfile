FROM node:17-alpine as build-stage
WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /frontend/build /usr/share/nginx/html