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
export default {
  // name: "App",
  components: { HeaderBlock, FooterBlock },
};
</script>

<style></style>
