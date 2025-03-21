<template>
    <Overlay @cancel="$emit('cancel')">
        <div
             class="max-w-96 z-30 flex flex-col items-center justify-centers p-6 gap-5 bg-white shadow-md border border-line-color rounded-card-rounded ">
            <div class="flex flex-col gap-2">
                <h3 class="text-base font-semibold">
                    <slot name="title"></slot>
                </h3>
                <div class="text-gray-text">
                    <slot name="text"></slot>
                </div>
            </div>
            <div class="flex flex-row self-end gap-2">
                <Button text="Cancel"
                        :style="'white'"
                        type="button"
                        @click="$emit('cancel')"></Button>
                <slot name="buttonAction"></slot>
            </div>
        </div>
    </Overlay>
</template>

<script setup>
import Overlay from './Overlay.vue';
import Button from './Button.vue';
defineEmits(['cancel']);
</script>
