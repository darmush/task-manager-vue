<template>
    <div @click.self="$emit('cancel')"
         class="fixed z-[40] inset-0 bg-black/75 transition-opacity">
        <div class="absolute left-[50%] top-[50%] -translate-y-2/4 -translate-x-2/4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineEmits(['cancel']);
</script>
