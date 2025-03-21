<template>
    <form @submit.prevent="$emit('done', taskLocal); setDefault()"
          class="flex flex-col min-h-80 max-w-[36rem] min-w-[34rem] my-8 mx-auto p-6 pt-12 gap-4 relative bg-white shadow-md border border-line-color rounded-card-rounded before:w-[calc(100%+2px)] before:h-6 before:absolute before:z-20 before:top-[-1px] before:left-[-1px] before:rounded-t-card-rounded"
          :class="taskLocal.tag == null ? 'before:bg-gray-dark' : 'before:bg-' + tagsStore.getProperty(taskLocal.tag, 'color')">
        <div
             class="flex flex-row gap-4 text-base font-semibold placeholder:text-gray-text-light focus:outline focus:outline-0 focus-within:border-black border-b border-line-color">
            <input required
                   v-model="taskLocal.title"
                   id="title"
                   type="text"
                   placeholder="Title"
                   maxlength="64"
                   @keydown.enter="''"
                   class="w-full bg-transparent focus:outline focus:outline-0 pb-3">
            <label for="title"
                   class="sr-only"
                   :value="taskLocal.title !== null ? taskLocal.title : 'Title'"></label>
            <Checkbox v-if="needCheckbox"
                      class="flex items-center h-5"
                      :check="taskLocal.done"
                      @check="taskLocal.done = $event" />
        </div>

        <div class="flex flex-col grow border-b pb-1"
             :class="taskLocal.description.length >= descriptionCountMax ? 'border-error focus-within:border-error' : 'border-line-color focus-within:border-black'">
            <label for="description"
                   class="sr-only">Description</label>
            <textarea v-model="taskLocal.description"
                      id="description"
                      placeholder="Write task descripthion here..."
                      :maxlength="descriptionCountMax"
                      class="grow w-full bg-transparent resize-none placeholder:text-gray-text-light focus:outline focus:outline-0"></textarea>
            <div class="text-end pt-1"
                 :class="taskLocal.description.length >= descriptionCountMax ? 'text-error font-medium' : 'text-gray-text-light'">
                {{ taskLocal.description.length || 0 }}/{{ descriptionCountMax }}
            </div>
        </div>

        <div class="flex justify-between gap-8">
            <div class="flex gap-2">
                <Label @click.stop="isShowTag = !isShowTag"
                       :colorButton="taskLocal.tag == null ? null : tagsStore.getProperty(taskLocal.tag, 'color')"
                       :text="taskLocal.tag == null ? 'Tag' : tagsStore.getProperty(taskLocal.tag, 'name')">
                    <template v-slot:iconAfter>
                        <TagIcon />
                    </template>
                    <ListboxOptions v-click-outside="() => isShowTag = !isShowTag"
                                    :isShow="isShowTag"
                                    :attach="'top'"
                                    class="min-w-40">
                        <List :items="tagsStore.tags"
                              :need-icon="true"
                              @select-item="taskLocal.tag = $event.id">
                        </List>
                    </ListboxOptions>
                </Label>

                <Label @click.stop="isShowCalendar = !isShowCalendar"
                       :colorButton="taskLocal.date == null ? null : 'gray-dark'"
                       :text="taskLocal.date == null ? 'Date' : taskLocal.date">
                    <template v-slot:iconAfter>
                        <CalendarIcon />
                    </template>
                    <ListboxOptions v-click-outside="() => isShowCalendar = !isShowCalendar"
                                    :isShow="isShowCalendar"
                                    :attach="'top'">
                        <Calendar :selDay="taskLocal.date"
                                  @selected-day="taskLocal.date = dateMethods.getDayFromDate($event)" />
                    </ListboxOptions>
                </Label>

                <Label :colorButton="taskLocal.pin ? 'gray-dark' : ''"
                       :colorPin="'dark'">
                    <template v-slot:iconBefore>
                        <Pin :colorPin="'dark'"
                             :class="'h-5'"
                             :isPinned="taskLocal.pin"
                             @pinned="taskLocal.pin = $event"></Pin>
                    </template>
                </Label>

            </div>

            <div class="flex gap-4">
                <Button text="Cancel"
                        :style="taskLocal.title != '' || taskLocal.description != '' || taskLocal.date != null || taskLocal.tag != null || taskLocal.pin != false ? 'white' : 'white-unactive'"
                        type="button"
                        @click="action == 'Confirm' ? $emit('cancel') : setDefault()"></Button>
                <Button type="submit"
                        :text="action"
                        :style="'black'"></Button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue';
import Button from '@/components/Button.vue';
import Label from '@/components/Label.vue';
import TagIcon from '@/components/icons/TagIcon.vue';
import List from '@/components/List.vue';
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import ListboxOptions from '@/components/ListboxOptions.vue';
import Pin from './Pin.vue';
import Checkbox from './Checkbox.vue';
import dateMethods from '@/helpers/date';

const Calendar = defineAsyncComponent(() => import('@/components/Calendar.vue'));

defineEmits(['cancel', 'done']);
const props = defineProps({
    task: {
        type: Object,
        default: {
            title: '',
            description: '',
            id: Date.now(),
            done: false,
            tag: null,
            date: null,
            pin: false,
        }
    },
    tagsStore: {
        type: Object,
    },
    needCheckbox: {
        type: Boolean,
        default: false,
    },
    action: {
        type: String,
        default: 'Confirm',
    },
});

const taskLink = Object.assign({}, props.task);
const taskLocal = ref(taskLink);
const isShowTag = ref(false);
const isShowCalendar = ref(false);
const descriptionCountMax = 256;

function setDefault() {
    taskLocal.value = Object.assign({}, props.task);
};

</script>
