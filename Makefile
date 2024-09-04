install:
	./scripts/install.sh

test:
	pnpm lint
	pnpm coverage
	pnpm test:e2e

build:
	pnpm build
