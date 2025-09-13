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
├─ scripts/       # Scripts utilitários (e.g. clean.js)
├─ package.json # Scripts globais
├─ turbo.json # Configuração Turborepo
└─ tsconfig.json # Config base TS
```

## 📦 Scripts principais
```bash
pnpm dev     # turbo run dev - inicia todos os apps em modo desenvolvimento
pnpm build   # turbo run build - compila apps e pacotes
pnpm lint    # turbo run lint - verifica estilo de código
pnpm test    # turbo run test - executa testes
pnpm clean   # node scripts/clean.js - limpa artefatos de build
```
## Instalação

No diretório raiz, execute:

```bash
pnpm install
```

## Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request para melhorias e correções.

## Licença

Este projeto ainda não possui licença definida. Adicione um arquivo `LICENSE` conforme necessário. 