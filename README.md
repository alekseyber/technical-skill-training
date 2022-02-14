# Technical skill training

Сервис для тренировки технических скилов - настраиваемые квизы

## Frontend

ReactJS TypeScript в связке с redux, react-router-dom. Настройки Webpack 5, Babel, Eslintrc и Prettierrc.

## Backend

Nest Js, БД MongoDb, документация Swagger по адресу <API_SERVER>/docs

## Перед запуском

Необходимо скопировать файл .env.dev с именем .dev и заменить значение переменных окружения по умолчанию на актуальные значения.

### Переменные окружения

NGINX_HOST - домен на котором будет размещаться сервис,
NGINX_PORT - порт сервиса,
NGINX_PORTS - Порты NGINX внутренний внешний,
API_SECRET_KEY - секртетный ключ api для jwt,
API_SWAGGER_SERVER_API_URL - url api для Swagger, согласно текущей конфигурации Docker Compose - '/api'.

## Запуск с Docker Compose

### Запустить в режиме development

Сборка docker-compose build

```shell script
make dc-build-dev
```

Создание и запуск docker-compose up

```shell script
make dc-up-dev
```

Запуск docker-compose start

```shell script
make dc-start-dev
```

Остановка docker-compose stop

```shell script
make dc-stop-dev
```

## Запустить в режиме production

Сборка docker-compose build

```shell script
make dc-build
```

Создание и запуск docker-compose up

```shell script
make dc-up
```

Запуск docker-compose start

```shell script
make dc-start
```

Остановка docker-compose stop

```shell script
make dc-stop
```
