<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrement">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="text"
      :value="counter"
      @input="$emit('input', +$event.target.value)"
    />

    <button type="button" aria-label="Добавить один товар" @click="increment">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  props: ["counter"],
  methods: {
    increment() {
      this.$emit("update:counter", this.counter + 1);
    },
    decrement() {
      if (this.counter > 1) {
        this.$emit("update:counter", this.counter - 1);
      }
    },
  },
};
</script>
