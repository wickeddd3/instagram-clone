# Stage 1 — Build the TypeScript code
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2 — Run the server
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN yarn install --omit=dev

EXPOSE 4000
CMD ["node", "dist/index.js"]
