<template>
    <li class="flex flex-row justify-between items-center gap-3 px-3 py-2 text-nowrap cursor-pointer hover:bg-gray-light first:rounded-t-card-rounded last:rounded-b-card-rounded"
        v-for="item in items"
        :key="item"
        @click="$emit('selectItem', item)">
        <div v-if="item.name">{{ item.name }}</div>
        <slot name="icon">
            <div v-if="needIcon"
                 class="inline-block rounded-full w-3 h-3"
                 :class="'bg-' + item.color"></div>
        </slot>
    </li>
</template>

<script setup>
defineEmits(['selectItem']);
defineProps({
    items: {
        type: Array,
        default: [],
    },
    needIcon: {
        type: Boolean,
        default: false,
    },
});
</script>
