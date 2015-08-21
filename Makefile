.PHONY: build run preview clean install typecheck

build:
	pnpm build

run:
	pnpm dev

preview:
	pnpm preview

typecheck:
	pnpm typecheck

clean:
	rm -rf docs node_modules .astro

install:
	pnpm install
