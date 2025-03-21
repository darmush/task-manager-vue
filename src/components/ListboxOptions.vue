<template>
    <ul class="absolute  z-30 flex bg-white shadow-md border border-line-color rounded-card-rounded"
        :class="attach == 'bottom' ? 'flex-col left-0 top-[105%]' : attach == 'top' ? 'flex-col left-0 bottom-[105%]' : attach == 'right' ? 'flex-row left-[calc(100%+8px)]' : ''"
        v-if="isShow">
        <slot @select-list="isShow = false"></slot>
    </ul>
</template>

<script setup>
defineProps({
    attach: {
        type: String,
        default: 'top',
    },
    isShow: {
        type: Boolean,
        default: true,
    },
});
</script>
