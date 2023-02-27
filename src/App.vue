<template>
  <component :is="currentPageComponent" :page-params="currentPageParams" @goToPage="(pageName, pageParams)=>goToPage(pageName, pageParams)"/>
</template>

<script>
import MainPage from "./pages/MainPage.vue";
import ProductPage from "./pages/ProductPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
const routes = {
  main: 'MainPage',
  product: 'ProductPage',
}
export default {
  name: "App",
  components: { MainPage, ProductPage, NotFoundPage },
  data: function () {
    return {
      currentPage: "main",
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent(){
      return routes[this.currentPage] || 'NotFoundPage';
    }
  },
  methods: {
    goToPage(pageName, pageParams){
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    }
  },
};
</script>

<style></style>
