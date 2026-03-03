# DeftRank Admin Portal

Admin dashboard frontend built with React + Vite.

## Prerequisites

- Node.js 18+ (Node 20/22 recommended)
- npm 9+

## Install

```bash
npm install
```

## Environment Setup

Vite env priority:

1. `.env`
2. `.env.local`
3. `.env.<mode>`
4. `.env.<mode>.local`

This project currently has:

- `.env.dev`
- `.env.prod`

Modes used by scripts:

- `development` for local
- `dev` for dev environment
- `prod` for production

## Run (Dev Server)

```bash
# Local development mode
npm run dev:local

# Dev environment mode
npm run dev:dev

# Production-mode run
npm run dev:prod
```

Default command:

```bash
npm run dev
```

## Build (Compile)

```bash
# Default build
npm run build

# Local-mode build
npm run build:local

# Dev-mode build
npm run build:dev

# Prod-mode build
npm run build:prod
```

Additional admin build scripts:

```bash
npm run build:default
npm run build:all
```

Build output:

```text
dist/
```

## Preview Build

```bash
npm run preview
```
