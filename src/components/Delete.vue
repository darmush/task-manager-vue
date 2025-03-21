<template>
    <div class="">
        <DeleteIcon @click="$emit('delete')"
                    class="w-4 h-4 cursor-pointer" />
    </div>
</template>

<script setup>
import DeleteIcon from './icons/DeleteIcon.vue';
defineEmits(['delete']);
</script>
