<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="text"
      :value="value"
      @input="$emit('input', +$event.target.value)"
    />

    <button type="button" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
    },
  },
};
</script>
