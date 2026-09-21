<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ countLabel }} </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p v-if="!products.length">
            Корзина пуста.
            <router-link :to="{ name: 'main' }">Перейти в каталог</router-link>
          </p>
          <ul class="cart__list">
            <CartItem
              v-for="item in products"
              :key="item.productId"
              :item="item"
            ></CartItem>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <button
            class="cart__button button button--primery"
            type="submit"
            :disabled="!products.length"
          >
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import numberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex";
import CartItem from "@/components/CartItem.vue";
import pluralizeProducts from "@/helpers/pluralizeProducts";
export default {
  filters: { numberFormat },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
    }),
    countLabel() {
      return pluralizeProducts(this.products.length);
    },
  },
  components: { CartItem },
};
</script>
