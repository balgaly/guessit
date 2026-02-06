# GuessIt

[![CI](https://github.com/balgaly/guessit/actions/workflows/ci.yml/badge.svg)](https://github.com/balgaly/guessit/actions/workflows/ci.yml)
[![CodeQL](https://github.com/balgaly/guessit/actions/workflows/codeql.yml/badge.svg)](https://github.com/balgaly/guessit/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Social prediction platform for competing with friends on sports events.**

## 🚀 Quick Start

This project is under active development. Week 1 infrastructure setup is complete!

## 📋 Project Status

- ✅ Week 1: GitHub Infrastructure Setup (Complete)
  - CI/CD workflows (lint, typecheck, test, security scanning)
  - Branch protection rules
  - Issue/PR templates
  - 36 GitHub labels
  - Dependabot configuration

- 🔄 Week 2: Ticket Migration (In Progress)
  - Migrating backlog to GitHub Issues

## 🔗 Quick Links

- [**Contributing Guide**](./CONTRIBUTING.md) - Get started in 30 minutes
- [**Architecture Docs**](./CLAUDE.md) - Understand the codebase
- [**Open Issues**](https://github.com/balgaly/guessit/issues) - Find something to work on

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes + Supabase (PostgreSQL, Auth, Realtime)
- **Auth:** Google Sign-In via Supabase Auth
- **Hosting:** Vercel (frontend), Supabase (backend)
- **Testing:** Vitest (unit), Playwright (E2E), React Testing Library
- **CI/CD:** GitHub Actions

## 📖 Documentation

- [CLAUDE.md](./CLAUDE.md) - Project architecture and coding conventions
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- [docs/WEEK1-SETUP-INSTRUCTIONS.md](./docs/WEEK1-SETUP-INSTRUCTIONS.md) - Infrastructure setup guide

## 🔐 Security

This project uses automated security scanning:
- **CodeQL** - Static analysis for security vulnerabilities
- **Trivy** - Dependency vulnerability scanning
- **Dependabot** - Automated dependency updates

Found a security issue? Please report it via [GitHub Security Advisories](https://github.com/balgaly/guessit/security/advisories).

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🤝 Open Source

GuessIt is open source and welcomes contributions! This project is also offered as a SaaS application for users who prefer managed hosting.

---

**Built with ❤️ using Claude Code and the Agent SDK**
