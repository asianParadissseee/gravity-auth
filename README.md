# Пример авторизацииAdd commentMore actions

# Запуск клиента:

```bash
npm i
```
```js
npm run dev
```

# Запуск сервера

```bash
cd server-api
```
Зависимости:
```bash
npm i
```

Запуск в обычном режиме:

```bash
npm run start
```

Запуск в режиме разработки:

```bash
npm run dev
```
### Endpoints

1. POST /api/v1/register

2. POST /api/v1/login

3. GET /api/v1/user (в заголовке Authorization: <token>, без Bearer)

4. POST /api/v1/forgot-password