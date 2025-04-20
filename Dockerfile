# Stage 1: Build the app (if you're using TypeScript)
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN yarn install -g nx && yarn install

# Replace `api` with your actual app name if different
RUN nx run api:build:production

# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/api ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

RUN npm install --omit=dev

EXPOSE 3000
CMD ["node", "main.js"]  # Change this if your entry point is different
