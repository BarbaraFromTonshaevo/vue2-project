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

## Деплой

Для этого сервера нужен хостинг с долгоживущим Node-процессом (есть `Dockerfile`), а бесплатные варианты без карты почти исчезли. Поэтому живое демо собирается без бэкенда: `npm run build:demo` в корне проекта включает клиентский мок (`src/mockApi.js`), который отвечает на те же запросы прямо в браузере, а корзину хранит в localStorage.
