<template>
    <EditTaskCard @done="submitHandler($event)"
                  :tagsStore="tagsStore"
                  :taskStore="taskStore"
                  :action="'Create'"></EditTaskCard>
</template>

<script setup>
import { useTasksStore } from '@/stores/tasks.js';
import { useTagsStore } from '@/stores/tags.js';
import dateMethods from '@/helpers/date.js';
import EditTaskCard from '@/components/EditTaskCard.vue';

const taskStore = useTasksStore();
const tagsStore = useTagsStore();

function submitHandler(task) {
    const createdTask = {
        title: task.title,
        description: task.description,
        id: Date.now(),
        done: false,
        tag: task.tag != null ? task.tag : 0,
        date: task.date !== null ? task.date : dateMethods.getToday(),
        pin: task.pin || false,
    };
    taskStore.createTask(createdTask);
}

</script>
