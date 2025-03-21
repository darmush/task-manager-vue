<template>
    <div class="">
        <EditIcon @click="$emit('edit')"
                  class="w-4 h-4 cursor-pointer" />
    </div>
</template>

<script setup>
import EditIcon from './icons/EditIcon.vue';
defineEmits(['edit']);
</script>
