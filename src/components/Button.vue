<template>
  <button type="button"
          class="flex gap-2 justify-center items-center h-max min-h-[38px] px-button-x py-button-y rounded-button-rounded transition text-nowrap"
          :class="style === 'white' ? 'bg-white text-black border border-line-color hover:bg-gray-light'
            : style === 'white-unactive' ? 'bg-gray-light text-gray-text-light border border-line-color cursor-default'
              : style === 'black' ? 'bg-black text-white hover:bg-black-hover focus:outline-offset-2' : ''">
    <slot></slot>
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  style: {
    type: String,
    default: 'white',
  },
});
</script>
