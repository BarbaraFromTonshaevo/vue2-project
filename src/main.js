import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mockAdapter from "./mockApi";
Vue.config.productionTip = false;

if (process.env.VUE_APP_USE_MOCK === "true") {
  axios.defaults.adapter = mockAdapter;
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
