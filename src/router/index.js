import Vue from "vue";
import MainPage from "@/pages/MainPage";
import ProductPage from "@/pages/ProductPage";
import NotFoundPage from "@/pages/NotFoundPage";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const routes = [
  { name: "main", component: MainPage, path: "/" },
  { name: "product", component: ProductPage, path: "/product/:id" },
  { name: "notFound", component: NotFoundPage, path: "*" },
];
const router = new VueRouter({ routes });
export default router;
