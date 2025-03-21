<template>
    <li class="relative py-5 pl-8 pr-4 before:h-full before:w-3.5 before:absolute before:top-0 before:left-0 first:rounded-t-card-rounded first:before:rounded-tl-card-rounded last:rounded-b-card-rounded last:before:rounded-bl-card-rounded hover:bg-gray-light"
        @click.self="showDescription(task.description)"
        :class="('before:bg-' + tagsStore.getProperty(task.tag, 'color')) + ' ' + (task.pin ? 'border-gray-text-light' : 'border-line-color') + ' ' + (task.done ? 'bg-gray-ligh text-gray-text-light line-through' : '')">
        <div @click.self="showDescription(task.description)"
             class="flex flex-row items-start justify-between gap-3">
            <Checkbox class="flex items-center h-5"
                      :check="task.done"
                      @check="task.done = $event" />
            <div @click="showDescription(task.description)"
                 class="mr-auto cursor-pointer"
                 :class="isShowDescription ? '' : 'truncate'">
                {{ task.title }}
            </div>
            <ArrowIcon @click="showDescription(task.description)"
                       v-if="task.description !== ''"
                       class="flex items-center h-5 cursor-pointer"
                       :class="isShowDescription ? 'rotate-180' : ''" />
            <div class="text-gray-text-light">
                {{ task.date }}
            </div>
            <Pin @pinned="taskStore.editTask(task.id, 'pin', $event)"
                 class="flex items-center h-5"
                 :isPinned="task.pin" />
            <Edit @edit="isShowEditTaskCard = true"
                  class="flex items-center h-5" />
            <Teleport to="body">
                <Overlay v-if="isShowEditTaskCard"
                         @cancel="isShowEditTaskCard = false">
                    <EditTaskCard v-if="isShowEditTaskCard"
                                  @cancel="isShowEditTaskCard = false"
                                  :task="task"
                                  :taskStore="taskStore"
                                  :tagsStore="tagsStore"
                                  :needCheckbox="true"
                                  :action="'Confirm'"
                                  @done="applyChanges($event); isShowEditTaskCard = false">
                    </EditTaskCard>
                </Overlay>
            </Teleport>
            <Delete @delete="taskStore.deleteTask(task.id)"
                    class="flex items-center h-5"
                    :task="task" />
        </div>
        <div v-if="isShowDescription"
             class="text-gray-text-light ml-7 mt-1">
            {{ task.description }}
        </div>
    </li>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import Pin from '@/components/Pin.vue';
import Edit from './Edit.vue';
import Overlay from './Overlay.vue';
import Delete from './Delete.vue';
import ArrowIcon from './icons/ArrowIcon.vue';

const EditTaskCard = defineAsyncComponent(() => import('./EditTaskCard.vue'));

const props = defineProps({
    task: {
        type: Object,
    },
    tagsStore: {
        type: Object,
    },
    taskStore: {
        type: Object,
    },
});

const taskStore = props.taskStore;
const isShowDescription = ref(false);

function showDescription(description) {
    if (description !== '') {
        this.isShowDescription = !this.isShowDescription
    };
};

const isShowEditTaskCard = ref(false);

function applyChanges(task) {
    for (const [key, value] of Object.entries(task)) {
        taskStore.editTask(task.id, key, value);
    };
};

</script>
