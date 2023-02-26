<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img
        v-bind:src="product.img"
        alt="Название товара"
      />
    </a>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" v-bind:key="color">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value=color
          />
          <span class="colors__value" v-bind:style="{ backgroundColor: color}"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
export default {
  data() {
    return {
      colors: this.product.colors,
    };
  },
  props: ["product"],
};
</script>
