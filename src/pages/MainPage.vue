<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color.sync="filterColor"
      ></ProductFilter>
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">
          Поизошла ошибка при загрузке товаров.
          <button @click.prevent="loadProducts">Попробовать еще раз</button>
        </div>
        <ProductList :products="products"></ProductList>

        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        ></BasePagination>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from "axios";
import { API_BASE_URL } from "@/config";
export default {
  components: { ProductList, BasePagination, ProductFilter },
  data: function () {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,

      page: 1,
      productsPerPage: 3,
      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => {
            return {
              ...product,
              image: product.image.file.url,
            };
          })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + `/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false));
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style></style>
