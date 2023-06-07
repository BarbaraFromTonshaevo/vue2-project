<template>
  <div>
    <HeaderBlock></HeaderBlock>
    <router-view />
    <FooterBlock></FooterBlock>
  </div>
</template>

<script>
import HeaderBlock from "./components/HeaderBlock.vue";
import FooterBlock from "./components/FooterBlock.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  // name: "App",
  components: { HeaderBlock, FooterBlock },
  created() {
    const userAccessKey = localStorage.getItem("userAccessKey");
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(["loadCart"]),
    ...mapMutations(["updateUserAccessKey"]),
  },
};
</script>

<style></style>
