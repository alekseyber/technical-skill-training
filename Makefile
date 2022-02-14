.PHONY: dc-build dc-up dc-up-dev dc-build-no-cache dc-build-dev dc-stop-dev dc-stop dc-start dc-build-dev-no-cache
dc-build-no-cache:
	docker compose build --no-cache

dc-build-dev-no-cache:
	docker compose -f docker-compose.yml -f docker-compose.development.yml build --no-cache

dc-build:
	docker compose build

dc-build-dev:
	docker compose -f docker-compose.yml -f docker-compose.development.yml build

dc-up:
	docker compose up

dc-up-dev:
	docker compose -f docker-compose.yml -f docker-compose.development.yml up

dc-start:
	docker compose start

dc-start-dev:
	docker compose -f docker-compose.yml -f docker-compose.development.yml start

dc-stop:
	docker compose stop

dc-stop-dev:
	docker compose -f docker-compose.yml -f docker-compose.development.yml stop

