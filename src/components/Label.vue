<template>
    <div class="relative">
        <button type="button"
                class="flex gap-2 h-max items-center text-gray-text font-medium px-button-x py-button-y rounded-full transition text-nowrap truncate"
                :class="colorButton == 'white' ? 'bg-white outline outline-1 outline-offset-[-1px] outline-gray-dark' : colorButton ? 'bg-white outline outline-2 outline-offset-[-2px] outline-' + colorButton + ' hover:bg-gray-light' : 'bg-gray-light hover:bg-gray-dark'">
            <slot name="iconBefore"></slot>
            {{ text }}
            <slot name="iconAfter"></slot>
        </button>
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        default: '',
    },
    colorButton: {
        type: String,
        default: '',
    },
});

</script>
