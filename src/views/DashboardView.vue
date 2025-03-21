<template>
    <div class="flex flex-col mx-auto my-6 gap-4 max-w-xl">
        <div v-if="taskStore.tasksCount"
             class="flex flex-row gap-2">

            <Label @click.stop="isShowSort = !isShowSort"
                   :colorButton="'white'"
                   :text="labelText">
                <template v-slot:iconAfter>
                    <ArrowIcon class="stroke-gray-text" />
                </template>
                <ListboxOptions v-click-outside="() => isShowSort = !isShowSort"
                                :isShow="isShowSort"
                                :attach="'bottom'"
                                class="min-w-40">
                    <List :items="options"
                          @select-item="labelText = $event['name']; $event.action(); numOfPage = 1"></List>
                    <List :items="tags"
                          :need-icon="true"
                          @select-item="labelText = tags[$event.id]['name']; sortedTasks = taskStore.filterTasks('tag', tags[$event.id]['id']); numOfPage = 1">
                    </List>
                </ListboxOptions>
            </Label>
            <Label @click.stop="isShowExpand = !isShowExpand"
                   :colorButton="'white'"
                   :text="expandCountText">
                <template v-slot:iconAfter>
                    <ArrowIcon class="stroke-gray-text" />
                </template>
                <ListboxOptions v-click-outside="() => isShowExpand = !isShowExpand"
                                :isShow="isShowExpand"
                                :attach="'bottom'">
                    <List :items="optionsExpandCount"
                          @select-item="expandCountText = $event['name']; $event.action()"></List>
                </ListboxOptions>
            </Label>
            <input @input="sortedTasks = taskStore.searchedTasks(searchQuery)"
                   v-model="searchQuery"
                   :id="searchQuery"
                   type="text"
                   :placeholder="'Search...'"
                   maxlength="30"
                   @keydown.enter="''"
                   class="basis-1/2 ml-auto self-end px-button-x py-button-y rounded-button-rounded w-full border border-line-color hover:bg-gray-light focus:outline focus:outline-0 text-nowrap cursor-text bg-white text-black">
        </div>
        <div v-if="sortedTasks.length > 0"
             class="bg-white shadow-md border border-line-color rounded-card-rounded">
            <ul class="flex flex-col mx-auto">
                <TaskCard v-for="task in tasksSlice"
                          :key="task"
                          :task="task"
                          :tagsStore="tagsStore"
                          :taskStore="taskStore">
                </TaskCard>
            </ul>
        </div>
        <div v-if="sortedTasks.length > 0"
             class="flex flex-row justify-between items-center">
            <div class="basis-1/3 justify-start">
                <Button @click="showModal = true"
                        text="Clear all"
                        :style="'black'"
                        class="">
                </Button>
                <Teleport to="body">
                    <Modal v-if="showModal"
                           @cancel="showModal = false">
                        <template v-slot:title>
                            Delete all tasks
                        </template>
                        <template v-slot:text>
                            Are you sure you want to delete all your tasks? All tasks will be permanently deleted. This
                            action cannot be undone.
                        </template>
                        <template v-slot:buttonAction>
                            <Button @click="taskStore.deleteAll(); showModal = false; sortedTasks = []"
                                    :style="'black'"
                                    text="Clear all"
                                    class="">
                            </Button>
                        </template>
                    </Modal>
                </Teleport>
            </div>
            <p v-if="countPages >= 1"
               class="text-center text-gray-text-light text-nowrap basis-1/3">{{ numOfPage > 0 ?
                numOfPage : 1 }} /
                {{ countPages }}
            </p>
            <div class="flex gap-2 basis-1/3 justify-end">
                <Button :style="numOfPage == 1 ? 'white-unactive' : 'white'"
                        type="button"
                        text="Previous"
                        @click="numOfPage > 1 ? --numOfPage : 1" />
                <Button :style="numOfPage == countPages ? 'white-unactive' : 'white'"
                        type="button"
                        text="Next"
                        @click="numOfPage < countPages ? ++numOfPage : countPages" />
            </div>
        </div>
        <p v-else
           class="text-center mt-6">No tasks</p>
    </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import Label from '@/components/Label.vue';
import ListboxOptions from '@/components/ListboxOptions.vue';
import Button from '@/components/Button.vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import TaskCard from '@/components/TaskCard.vue';
import Modal from '@/components/Modal.vue';
import { useTasksStore } from '@/stores/tasks.js';
import { useTagsStore } from '@/stores/tags.js';
import { storeToRefs } from 'pinia';
import List from '@/components/List.vue';
import dateMethods from '@/helpers/date.js';


const isShowSort = ref(false);
const isShowExpand = ref(false);

const taskStore = useTasksStore();
const { tasks } = storeToRefs(taskStore);
const sortedTasks = ref(taskStore.sortedTasks);
const tagsStore = useTagsStore();
const tags = tagsStore.tags;

const searchQuery = ref('');
const numOfPage = ref(1);
const countExpand = ref(5);
const countPages = computed(() => Math.ceil(sortedTasks.value.length / countExpand.value));
const searchedTasks = computed(() => sortedTasks.value.filter(task => task.title.toLowerCase().includes(searchQuery.value.toLowerCase())));
const tasksSlice = computed(() => sortedTasks.value.slice((numOfPage.value - 1) * countExpand.value, numOfPage.value * countExpand.value));

const showModal = ref(false);

const labelText = ref('All');
const options = [
    {
        name: 'All',
        action: function () {
            sortedTasks.value = taskStore.sortedTasks;
        },
    },
    {
        name: 'Today',
        action: function () {
            const today = dateMethods.getToday()
            sortedTasks.value = taskStore.filterTasks('date', today);
        },
    },
    {
        name: 'Overdue',
        action: function () {
            sortedTasks.value = taskStore.filterTasksByOverdue(true);
        },
    },
    {
        name: 'Future',
        action: function () {
            sortedTasks.value = taskStore.filterTasksByOverdue(false);
        },
    },
    {
        name: 'Done',
        action: function () {
            sortedTasks.value = taskStore.filterTasks('done', true);
        },
    },
    {
        name: 'Not Done',
        action: function () {
            sortedTasks.value = taskStore.filterTasks('done', false);
        },
    },
];

const expandCountText = ref('5');
const optionsExpandCount = [
    {
        name: '5',
        action: function () {
            countExpand.value = 5;
        },
    },
    {
        name: '10',
        action: function () {
            countExpand.value = 10;
        },
    },
    {
        name: 'Show All',
        action: function () {
            countExpand.value = taskStore.tasksCount;
        },
    },
];

watch(
    tasks,
    () => { sortedTasks.value = taskStore.sortedTasks },
    { deep: true },
);
</script>
