<template>
  <li class="catalog__item">
    <a
      class="catalog__pic"
      href="#"
      @click.prevent="goToPage('product', { id: product.id })"
    >
      <img v-bind:src="product.img" alt="Название товара" />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} </span>

    <ul class="colors colors--black">
      <li
        class="colors__item"
        v-for="color in product.colors"
        v-bind:key="color"
      >
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color" />
          <span class="colors__value" v-bind:style="{ backgroundColor: color }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
import goToPage from "@/helpers/goToPage";
import numberFormat from "@/helpers/numberFormat";
export default {
  data() {
    return {
      colors: this.product.colors,
    };
  },
  props: ["product"],
  methods: {
    goToPage,
  },
  filters: {
    numberFormat,
  },
};
</script>
