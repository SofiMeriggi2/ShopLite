FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate
RUN pnpm i --frozen-lockfile || true
COPY . .
RUN pnpm build
CMD ["node", "dist/main.js"]
