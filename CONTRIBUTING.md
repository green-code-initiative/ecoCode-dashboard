# CONTRIBUTING

## Creedengo commons

Please read common [CONTRIBUTING.md](https://github.com/green-code-initiative/creedengo-common/blob/main/doc/CONTRIBUTING.md) in `creedengo-common` repository.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + The [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) Vue.js official extension (disable Vetur).
- [nvm](https://github.com/nvm-sh/nvm) and the vsc-nvm VSCode extension to ensure using the right node.js version
- [pnpm](https://pnpm.io/) as an alternative to npm which is more energy efficient by reducing consumed space and CPU

> To update pnpm, use `pnpm add -g pnpm`

## Project Setup


### Frontend development

```sh
pnpm install
```

Prefer `pnpm` for a faster and more secure installation with less network and disk space usage.

### Compile and Hot-Reload Design System for Development

```sh
pnpm storybook
```

### Compile and Hot-Reload the application for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# Install Playwright dependencies to run browsers
sudo apt-get install libgbm1 # for chrome
sudo apt-get install libgtk-3-0 # for firefox

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e -- --project=chromium
# Runs the tests of a specific file
pnpm test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Git conventional commits

This project uses the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines

This convention helps

- to have an explicit and readable git history
- to determine what should be the next [semantic version](https://semver.org/) number of releases

In short:

- prefix commit messages:
  - `fix:` a commit of the type fix patches a bug in your codebase (this correlates with `PATCH` in Semantic Versioning).
  - `feat:` a commit of the type feat introduces a new feature to the codebase (this correlates with `MINOR` in Semantic Versioning).
- In case of breaking changes:
  - add a footer line  like `BREAKING CHANGE: doesn't support sonar bellow version 9 anymore`  (this correlates with `MAJOR` in Semantic Versioning).

### Sonar plugin

#### Java 8

Sonar recommends usage of Java 8. Use either openjdk or Oracle Java.

Find below instructions for Ubuntu installation

##### Open JDK

```sh
sudo apt install openjdk-8-jrk-headless
```

##### Oracle official JDK

You need to download the compressed, adapt the package to finally install it

```sh
sudo apt install java-package
make-jpkg ./jdk-8u411-linux-x64.tar.gz
dpkg -i oracle-java8-jdk_8u411_amd64.deb
```

##### Alternate versions

You may need to handle different Java versions

```sh
sudo update-alternatives --config java
sudo update-alternatives --config javac
sudo update-alternatives --config javap
```

#### PostgreSQL 15

PostgreSQL database installation (version max: 15)

```sh
sudo apt install postgresal-15
sudo -u postgres createuser -e sonarqube
```

PostgreSQL database initialization
(here both the schema and user are named sonarqube)

First enter into the psql cli interface

```sh
 sudo -u postgres psql
```

You should have an output like this

```sh
could not change directory to "/home/mylogin": Permission denied
psql (15.6 (Ubuntu 15.6-1.pgdg22.04+1), server 15.7 (Ubuntu 15.7-1.pgdg22.04+1))
Type "help" for help.

postgres=#
```

Then use these PgSQL requests

```pgsql
CREATE SCHEMA sonarqube AUTHORIZATION sonarqube;
ALTER USER sonarqube SET search_path to sonarqube;
ALTER USER sonarqube WITH PASSWORD 'mypassword';
```

and use `\q` to quit this console

#### Sonarqube 10.5

Edit `<sonarqubeHome>/conf/sonar.properties` to configure the database settings.

```ini
sonar.jdbc.username=sonarqube
sonar.jdbc.password=mypassword
sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube
```