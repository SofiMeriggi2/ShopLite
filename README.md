# ShopLite — NestJS + Next.js 15 Monorepo

Monorepo listo para correr: API en NestJS + Prisma (PostgreSQL), Redis para cache/colas (BullMQ), 
Front en Next.js 15 (App Router + RSC), TanStack Query, formularios con Zod, testing (Jest/Vitest/Playwright), 
Storybook, CI con GitHub Actions, SAST (CodeQL) y secret scanning básico.

## Rápido inicio (dev)

```bash
# Requisitos: Corepack (yarn@4.10.2), Docker, Node 20, OpenSSL
corepack prepare yarn@4.10.2 --activate
yarn install --immutable
yarn prepare

# Infra (db/redis/mail)
docker compose up -d db redis mailhog

# Backend
yarn workspace @shoplite/backend prisma:generate
yarn workspace @shoplite/backend prisma:migrate
yarn workspace @shoplite/backend prisma:seed
yarn workspace @shoplite/backend dev

# Frontend (en otra terminal)
yarn workspace @shoplite/frontend dev

# URLs
# Web: http://localhost:3000
# API docs: http://localhost:3001/docs
# Mailhog: http://localhost:8025
```

## Scripts útiles (root)

- `yarn build` compila todo
- `yarn lint` lint en todos los paquetes
- `yarn test` tests unitarios
- `yarn test:coverage` cobertura ≥ 90%
- `yarn e2e` e2e web con Playwright

## Estética
Login y UI con paleta *baby pink / pastel* suave, accesible (contrastes AA para texto importante).
