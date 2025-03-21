<template>
    <div class="">
        <svg @click="isChecked = !isChecked; $emit('check', isChecked)"
             :class="isChecked ? 'stroke-gray-text-light' : 'stroke-black'"
             class="cursor-pointer w-4 h-4 stroke-icon-width"
             width="18"
             height="18"
             viewBox="0 0 18 18"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M15.2222 1H2.77778C1.79594 1 1 1.79594 1 2.77778V15.2222C1 16.2041 1.79594 17 2.77778 17H15.2222C16.2041 17 17 16.2041 17 15.2222V2.77778C17 1.79594 16.2041 1 15.2222 1Z"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
            <path :class="isChecked ? 'stroke-gray-text-light' : 'stroke-none'"
                  d="M6 8.77778L7.77778 10.5556L11.3333 7"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
        </svg>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    check: {
        type: Boolean,
    },
});

const isChecked = ref(props.check);

watch(() => props.check, (val) => {
    isChecked.value = val;
});

</script>
