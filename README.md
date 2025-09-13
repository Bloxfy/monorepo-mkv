# Monorepo NestJS + Nuxt

Este repositório organiza **backend** e **frontend** em um único monorepo, facilitando o compartilhamento de código, automação e deploy.

## 🚀 Tecnologias
- [NestJS](https://nestjs.com/) – API backend modular e escalável
- [Nuxt](https://nuxt.com/) – Frontend Vue 3 SSR/SPA
- [pnpm workspaces](https://pnpm.io/workspaces) – Gerenciamento de dependências
- [Turborepo](https://turbo.build/repo) – Build pipeline com cache e paralelismo
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- [GitHub Actions](https://docs.github.com/en/actions) – CI/CD
```text
## 📂 Estrutura de pastas
monorepo-nestjs-nuxt/
├─ apps/
│ ├─ backend/ # API NestJS
│ └─ frontend/ # Aplicação Nuxt
├─ packages/
│ ├─ ui/ # Biblioteca de componentes Vue compartilhados
│ ├─ types/ # Tipos/DTOs usados entre frontend e backend
│ └─ utils/ # Funções utilitárias
├─ .github/ # Workflows CI/CD
├─ package.json # Scripts globais
├─ turbo.json # Configuração Turborepo
└─ tsconfig.json # Config base TS
```

## 📦 Scripts principais
- `pnpm dev` – roda frontend + backend em paralelo
- `pnpm dev:backend` – roda somente o backend
- `pnpm dev:frontend` – roda somente o frontend
- `pnpm build` – build de todos os apps/pacotes

## 🔄 CI/CD
O repositório utiliza **GitHub Actions** para:
- Instalação de dependências com cache
- Lint e testes
- Build incremental via Turborepo
- Deploy automatizado (opcional)

## 📜 Licença
MIT
