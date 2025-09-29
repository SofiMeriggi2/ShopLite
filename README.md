# ShopLite

A modern e-commerce platform built with JavaScript and TypeScript.

## Features

- Monorepo structure (pnpm, TurboRepo)
- Modern API (NestJS, PostgreSQL, Redis)
- Frontend & Backend separation
- Docker and docker-compose for dev/prod
- CI/CD via GitHub Actions
- Prettier & ESLint for code quality

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SofiMeriggi2/ShopLite.git
cd ShopLite
```

### 2. Install dependencies

```bash
corepack enable
yarn install
```

### 3. Environment setup

Copy the example env file and fill your values:
```bash
cp .env.example .env
```

### 4. Run with Docker Compose

```bash
docker-compose up -d
```

### 5. Develop

- Backend: `yarn workspace @shoplite/backend dev`
- Frontend: `yarn workspace @shoplite/frontend dev`

### 6. Test and Lint

```bash
yarn lint
yarn test
```

## CI/CD

This repo uses GitHub Actions (`.github/workflows/ci.yml`) for:
- Linting
- Building
- Testing
- Security audit

## Contributing

Open an issue or PR. Please follow code style and use the pre-commit hooks.

---

## License

MIT
