<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img v-bind:src="product.image" alt="Название товара" />
    </router-link>

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
