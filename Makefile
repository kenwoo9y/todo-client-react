.PHONY: help build-local up down logs ps 
.DEFAULT_GOAL := help

build-local: ## Build docker image to local development
	docker compose build --no-cache

up: ## Do docker compose up
	docker compose up

down: ## Do docker compose down
	docker compose down

logs: ## Tail docker compose logs
	docker compose logs -f

ps: ## Check container status
	docker compose ps

test: ## Execute tests
	cd client && docker compose run todo-app yarn test

test-coverage: ## Execute tests with coverage
	cd client && docker compose run todo-app yarn test:coverage

lint-check: ## Execute lint check
	cd client && docker compose run todo-app yarn lint:check

lint-fix: ## Execute lint fix
	cd client && docker compose run todo-app yarn lint:fix

format-check: ## Execute format check
	cd client && docker compose run todo-app yarn format:check

format-fix: ## Execute format fix
	cd client && docker compose run todo-app yarn format:fix

storybook: ## Execute storybook
	cd client && DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose build todo-app && DOCKER_DEFAULT_PLATFORM=linux/amd64 docker compose run --rm -p 6006:6006 todo-app yarn storybook --ci

help: ## Show options
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'