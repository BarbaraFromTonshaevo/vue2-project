---
title: Vue2 Shop Mock API
sdk: docker
app_port: 7860
---

# Mock API

Небольшой Express-сервер, повторяющий API, которое раньше использовал фронтенд (`vue-study.skillbox.cc`).
Товары и категории лежат в `data.js`, картинки — в `images/`, корзины хранятся в памяти (после перезапуска сбрасываются).

## Локальный запуск

```
cd server
npm install
npm start        # http://localhost:3000
```

Фронтенд по умолчанию обращается к `http://localhost:3000`. Другой адрес задаётся переменной `VUE_APP_API_BASE_URL` при сборке.

## Эндпоинты

| Метод  | Путь                                                   | Описание                                   |
| ------ | ------------------------------------------------------ | ------------------------------------------ |
| GET    | `/api/products?page&limit&categoryId&minPrice&maxPrice` | Список товаров с пагинацией и фильтрами    |
| GET    | `/api/products/:id`                                    | Один товар                                 |
| GET    | `/api/productCategories`                               | Категории                                  |
| GET    | `/api/baskets?userAccessKey`                           | Корзина (без ключа создаётся новая)        |
| POST   | `/api/baskets/products?userAccessKey`                  | Добавить товар `{productId, quantity}`     |
| PUT    | `/api/baskets/products?userAccessKey`                  | Изменить количество `{productId, quantity}` |
| DELETE | `/api/baskets/products?userAccessKey`                  | Удалить товар `{productId}`                |

## Деплой на Hugging Face Spaces (бесплатно, без карты)

1. Зарегистрируйтесь на [huggingface.co](https://huggingface.co) и создайте токен: Settings → Access Tokens → New token, роль **Write**.
2. New Space: имя, например, `vue2-shop-api`, SDK **Docker** (шаблон Blank), Hardware **CPU basic (free)**, доступ Public.
3. Из корня репозитория отправьте папку `server` в Space:

```
git remote add hf https://huggingface.co/spaces/<ваш-логин>/vue2-shop-api
git subtree push --prefix server hf main
```

   Логин — ваш username на Hugging Face, пароль — токен из шага 1.
4. Сборка занимает 1–2 минуты (вкладка Logs). Адрес API: `https://<ваш-логин>-vue2-shop-api.hf.space`. Проверка: откройте `/api/products` на этом адресе.
5. Укажите этот адрес в `VUE_APP_API_BASE_URL` при сборке фронтенда (Netlify/Vercel: Environment variables), без слеша в конце.

Бесплатный Space засыпает после периода бездействия, первый запрос после этого идёт дольше. Корзины при этом сбрасываются.

Обновление после правок в `server/`: закоммитить и снова выполнить `git subtree push --prefix server hf main`.
