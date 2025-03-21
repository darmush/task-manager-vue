<template>
    <PinIcon @click="isPinnedLocal = !isPinnedLocal; $emit('pinned', isPinnedLocal)"
             class="shrink-0 w-4 h-4 cursor-pointer "
             :class="[isPinnedLocal && colorPin == 'dark' ? 'fill-gray-text stroke-gray-text' : !isPinnedLocal && colorPin == 'dark' ? 'fill-none stroke-gray-text' : isPinnedLocal ? 'stroke-gray-text-light fill-gray-text-light' : 'stroke-gray-text-light fill-none']" />
</template>

<script setup>
import { ref, watch } from 'vue';
import PinIcon from './icons/PinIcon.vue';

defineEmits(['pinned'])
const props = defineProps({
    isPinned: {
        type: Boolean,
        default: false,
    },
    colorPin: {
        type: String,
        default: '',
    },
});

const isPinnedLocal = ref(props.isPinned);

watch(() => props.isPinned, (val) => {
    isPinnedLocal.value = val;
});
</script>
