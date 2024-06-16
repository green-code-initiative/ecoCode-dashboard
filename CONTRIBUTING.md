# CONTRIBUTING

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + The [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) Vue.js official extension (disable Vetur).
- [nvm](https://github.com/nvm-sh/nvm) and the vsc-nvm VSCode extension to ensure using the right node.js version
- [pnpm](https://pnpm.io/) as an alternative to npm which is more energy efficient by reducing consumed space and CPU



## Project Setup

```sh
pnpm install
```

Prefer `pnpm` for a faster and more secure installation with less network and disk space usage.

### Compile and Hot-Reload Design System for Development

```sh
npm run storybook
```

### Compile and Hot-Reload the application for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# Install Playwright dependencies to run browsers
sudo apt-get install libgbm1 # for chrome
sudo apt-get install libgtk-3-0 # for firefox

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Git conventional commits

This project uses the conventional commits guidelines

This convention helps 
- to have an explicit and readable git history
- to determine what should be the next [semantic version](https://semver.org/) number of releases

In short: 
- prefix commit messages:
    - `fix:` a commit of the type fix patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).
    - `feat:` a commit of the type feat introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).
- In case of breaking changes:
    - add a footer line  like `BREAKING CHANGE: doesn't support sonar bellow version 9 anymore`  (this correlates with `MAJOR` in Semantic Versioning).

https://www.conventionalcommits.org/en/v1.0.0/

## Ecocode commons

Please read common [CONTRIBUTING.md](https://github.com/green-code-initiative/ecoCode-common/blob/main/doc/CONTRIBUTING.md) in `ecoCode-common` repository.
