# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY src ./src
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm run build
EXPOSE 3002
CMD ["npm", "run", "start"]
