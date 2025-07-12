# Etapa 1: Compilar la aplicación Angular
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Crear la imagen de producción con Node.js
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist/partes-cars/ ./dist/partes-cars/

EXPOSE 4000

CMD ["node", "dist/partes-cars/server/server.mjs"]