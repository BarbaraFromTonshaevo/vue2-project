<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <!-- <ExampleForm
        :age="exampleAge"
        :name="exampleName"
        :married="exampleMarried"
      ></ExampleForm> -->
      <ProductFilter
        :price-from="filterPriceFrom"
        :price-to="filterPriceTo"
        :category-id="filterCategoryId"
      ></ProductFilter>
      <section class="catalog">
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
import { products } from "./data/products";
import ProductList from "./components/ProductList.vue";
import BasePagination from "./components/BasePagination.vue";
import ProductFilter from "./components/ProductFilter.vue";
// import ExampleForm from "./components/ExampleForm.vue";
export default {
  name: "App",
  components: { ProductList, BasePagination, ProductFilter },
  data: function () {
    return {
      exampleName: "Имя",
      exampleAge: "20",
      exampleMarried: false,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,

      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        );
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo
        );
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        );
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>

<style></style>
