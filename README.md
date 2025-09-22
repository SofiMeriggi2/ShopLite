# ShopLite — NestJS + Next.js 15 Monorepo

Monorepo listo para correr: API en NestJS + Prisma (PostgreSQL), Redis para cache/colas (BullMQ), 
Front en Next.js 15 (App Router + RSC), TanStack Query, formularios con Zod, testing (Jest/Vitest/Playwright), 
Storybook, CI con GitHub Actions, SAST (CodeQL) y secret scanning básico.

## Rápido inicio (dev)

```bash
# Requisitos: pnpm, Docker, Node 20, OpenSSL
pnpm i
pnpm prepare

# Infra (db/redis/mail)
docker compose up -d db redis mailhog

# Backend
pnpm --filter ./apps/backend prisma:generate
pnpm --filter ./apps/backend prisma:migrate
pnpm --filter ./apps/backend seed
pnpm --filter ./apps/backend dev

# Frontend (en otra terminal)
pnpm --filter ./apps/frontend dev

# URLs
# Web: http://localhost:3000
# API docs: http://localhost:3001/docs
# Mailhog: http://localhost:8025
```

## Scripts útiles (root)

- `pnpm -r build` compila todo
- `pnpm -r lint` lint en todos los paquetes
- `pnpm -r test` tests unitarios
- `pnpm -r test:coverage` cobertura ≥ 90%
- `pnpm --filter ./apps/frontend e2e` e2e web con Playwright

## Estética
Login y UI con paleta *baby pink / pastel* suave, accesible (contrastes AA para texto importante).
