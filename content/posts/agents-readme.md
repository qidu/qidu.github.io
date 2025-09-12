+++
date = '2025-09-12T17:54:52+08:00'
draft = false
title = 'Agents Readme'
+++

[https://agents.md/](https://agents.md/)

An open format for guiding coding agents, provides the context and instructions to help AI coding agents work. 
AGENTS.md is used by over [30k open-source projects.](https://github.com/search?q=path%3AAGENTS.md&type=code)

```markdown
# Sample AGENTS.md file

## Dev environment tips
- Use `pnpm dlx turbo run where <project_name>` to jump to a package instead of scanning with `ls`.
- Run `pnpm install --filter <project_name>` to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
- ...

## Testing instructions
- Find the CI plan in the .github/workflows folder.
- Run `pnpm turbo run test --filter <project_name>` to run every check defined for that package.
- ...

## PR instructions
- Title format: [<project_name>] <Title>
- Always run `pnpm lint` and `pnpm test` before committing.
```
