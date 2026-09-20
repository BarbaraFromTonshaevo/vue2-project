import axios from "axios";
import { products } from "@/data/products";
import categories from "@/data/categories";

const STORAGE_KEY = "mockBaskets";
const DELAY_MS = 250;

const imageUrl = (file) =>
  `${process.env.BASE_URL}img/${file.split("/").pop()}`;

const serializeProduct = (product) => {
  const category = categories.find((c) => c.id === product.categoryId);
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    colors: product.colors,
    category: { id: category.id, title: category.title },
    image: { file: { url: imageUrl(product.image) } },
  };
};

const readBaskets = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
};

const writeBaskets = (baskets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(baskets));
  } catch (e) {
    // storage unavailable: the basket just won't survive a reload
  }
};

const serializeBasket = (accessKey, basket) => ({
  user: { accessKey },
  items: Object.entries(basket).map(([productId, quantity]) => ({
    id: Number(productId),
    quantity,
    product: serializeProduct(products.find((p) => p.id === Number(productId))),
  })),
});

const fail = (config, status, message) => {
  const response = {
    data: { error: { code: status, message } },
    status,
    config,
  };
  return Promise.reject(
    new axios.AxiosError(message, String(status), config, null, response)
  );
};

const ok = (config, data) =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({ data, status: 200, statusText: "OK", headers: {}, config }),
      DELAY_MS
    )
  );

const handleBasketChange = (config, method, params, body) => {
  const accessKey = params.userAccessKey;
  const productId = Number(body.productId);
  if (!accessKey) return fail(config, 400, "userAccessKey is required");
  if (!products.some((p) => p.id === productId)) {
    return fail(config, 400, "Product not found");
  }
  const quantity = Number(body.quantity);
  if (method !== "delete" && (!Number.isInteger(quantity) || quantity < 1)) {
    return fail(config, 400, "quantity must be a positive integer");
  }

  const baskets = readBaskets();
  const basket = baskets[accessKey] || {};
  if (method === "post")
    basket[productId] = (basket[productId] || 0) + quantity;
  if (method === "put") basket[productId] = quantity;
  if (method === "delete") delete basket[productId];
  baskets[accessKey] = basket;
  writeBaskets(baskets);
  return ok(config, serializeBasket(accessKey, basket));
};

const mockAdapter = (config) => {
  const method = config.method.toLowerCase();
  const path = new URL(config.url, window.location.href).pathname;
  const params = config.params || {};
  const body =
    typeof config.data === "string"
      ? JSON.parse(config.data)
      : config.data || {};

  if (method === "get" && path === "/api/productCategories") {
    return ok(config, { items: categories });
  }

  if (method === "get" && path === "/api/products") {
    const page = Math.max(parseInt(params.page, 10) || 1, 1);
    const limit = Math.max(parseInt(params.limit, 10) || 12, 1);
    const categoryId = Number(params.categoryId) || 0;
    const minPrice = Number(params.minPrice) || 0;
    const maxPrice = Number(params.maxPrice) || 0;
    const filtered = products.filter(
      (p) =>
        (!categoryId || p.categoryId === categoryId) &&
        (!minPrice || p.price >= minPrice) &&
        (!maxPrice || p.price <= maxPrice)
    );
    const start = (page - 1) * limit;
    return ok(config, {
      items: filtered.slice(start, start + limit).map(serializeProduct),
      pagination: {
        page,
        pages: Math.ceil(filtered.length / limit),
        total: filtered.length,
      },
    });
  }

  const productMatch = path.match(/^\/api\/products\/(\d+)$/);
  if (method === "get" && productMatch) {
    const product = products.find((p) => p.id === Number(productMatch[1]));
    return product
      ? ok(config, serializeProduct(product))
      : fail(config, 404, "Product not found");
  }

  if (method === "get" && path === "/api/baskets") {
    const accessKey = params.userAccessKey || crypto.randomUUID();
    const baskets = readBaskets();
    baskets[accessKey] = baskets[accessKey] || {};
    writeBaskets(baskets);
    return ok(config, serializeBasket(accessKey, baskets[accessKey]));
  }

  if (
    path === "/api/baskets/products" &&
    ["post", "put", "delete"].includes(method)
  ) {
    return handleBasketChange(config, method, params, body);
  }

  return fail(config, 404, "Not found");
};

export default mockAdapter;
