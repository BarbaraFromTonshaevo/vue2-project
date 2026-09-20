const crypto = require("crypto");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { categories, products } = require("./data");

const PORT = process.env.PORT || 3000;
const MAX_BASKETS = 1000;

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// accessKey -> Map(productId -> quantity)
const baskets = new Map();

const baseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const serializeProduct = (req, product) => {
  const category = categories.find((c) => c.id === product.categoryId);
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    colors: product.colors,
    category: { id: category.id, title: category.title },
    image: { file: { url: `${baseUrl(req)}/images/${product.image}` } },
  };
};

const serializeBasket = (req, accessKey) => ({
  user: { accessKey },
  items: [...baskets.get(accessKey)].map(([productId, quantity]) => ({
    id: productId,
    quantity,
    product: serializeProduct(
      req,
      products.find((p) => p.id === productId)
    ),
  })),
});

const getBasket = (accessKey) => {
  if (!baskets.has(accessKey)) {
    if (baskets.size >= MAX_BASKETS) {
      baskets.delete(baskets.keys().next().value);
    }
    baskets.set(accessKey, new Map());
  }
  return baskets.get(accessKey);
};

const badRequest = (res, message) =>
  res.status(400).json({ error: { code: 400, message } });

const validateBasketRequest = (req, res, { needQuantity }) => {
  const accessKey = req.query.userAccessKey;
  if (!accessKey) {
    badRequest(res, "userAccessKey is required");
    return null;
  }
  const productId = Number(req.body.productId);
  if (!products.some((p) => p.id === productId)) {
    badRequest(res, "Product not found");
    return null;
  }
  let quantity;
  if (needQuantity) {
    quantity = Number(req.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      badRequest(res, "quantity must be a positive integer");
      return null;
    }
  }
  return { accessKey, productId, quantity };
};

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "vue2-project mock API" });
});

app.get("/api/productCategories", (req, res) => {
  res.json({ items: categories });
});

app.get("/api/products", (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 12, 1);
  const categoryId = Number(req.query.categoryId) || 0;
  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || 0;

  const filtered = products.filter(
    (p) =>
      (!categoryId || p.categoryId === categoryId) &&
      (!minPrice || p.price >= minPrice) &&
      (!maxPrice || p.price <= maxPrice)
  );
  const start = (page - 1) * limit;

  res.json({
    items: filtered.slice(start, start + limit).map((p) => serializeProduct(req, p)),
    pagination: { page, pages: Math.ceil(filtered.length / limit), total: filtered.length },
  });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: { code: 404, message: "Product not found" } });
  }
  res.json(serializeProduct(req, product));
});

app.get("/api/baskets", (req, res) => {
  const accessKey = req.query.userAccessKey || crypto.randomUUID();
  getBasket(accessKey);
  res.json(serializeBasket(req, accessKey));
});

app.post("/api/baskets/products", (req, res) => {
  const data = validateBasketRequest(req, res, { needQuantity: true });
  if (!data) return;
  const basket = getBasket(data.accessKey);
  basket.set(data.productId, (basket.get(data.productId) || 0) + data.quantity);
  res.json(serializeBasket(req, data.accessKey));
});

app.put("/api/baskets/products", (req, res) => {
  const data = validateBasketRequest(req, res, { needQuantity: true });
  if (!data) return;
  getBasket(data.accessKey).set(data.productId, data.quantity);
  res.json(serializeBasket(req, data.accessKey));
});

app.delete("/api/baskets/products", (req, res) => {
  const data = validateBasketRequest(req, res, { needQuantity: false });
  if (!data) return;
  getBasket(data.accessKey).delete(data.productId);
  res.json(serializeBasket(req, data.accessKey));
});

app.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
});
