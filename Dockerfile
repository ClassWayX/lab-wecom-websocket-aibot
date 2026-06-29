# ===== Install Dependencies =====
FROM node:24-alpine AS deps
WORKDIR /app

COPY package*.json .
RUN npm ci

# ===== Run Development =====
FROM node:24-alpine AS dev
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Need to mount source code

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "run", "dev"]
