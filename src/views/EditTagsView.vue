<template>
     <div class="flex flex-col gap-2 mx-auto max-w-sm my-6">
          <h2 class="text-center font-semibold text-lg">Edit Tags</h2>
          <div v-for="tag in tags"
               :key="tag"
               class="flex flex-row gap-2">
               <Button @click.stop="showList(tag.id);"
                       :style="tag.id == 0 ? 'white-unactive' : showListboxArr[tag.id] ? 'white-unactive' : 'white'"
                       class="relative shrink-0 basis-1/6 before:absolute before:z-20 before:left-[50%] before:top-[50%] before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:w-4 before:h-4"
                       :class="['before:bg-' + tag.color, tag.id != 0 ? '' : 'bg-gray-light cursor-not-allowed pointer-events-none']">
                    <ListboxOptions v-click-outside="() => showList(tag.id)"
                                    :isShow="showListboxArr[tag.id]"
                                    :attach="'right'"
                                    class="rounded-t-button-rounded rounded-b-button-rounded min-h-[38px]">
                         <li class="flex flex-row justify-between items-center gap-3 px-2 py-2 text-nowrap cursor-pointer hover:bg-gray-light first:rounded-l-button-rounded last:rounded-r-button-rounded"
                             v-for="color in colors"
                             :key="color"
                             @click.stop="showList(tag.id); tag.color = color;">
                              <div class="inline-block rounded-full w-4 h-4"
                                   :class="'bg-' + color"></div>
                         </li>
                    </ListboxOptions>
               </Button>
               <div class="flex flex-row w-full">
                    <input v-model="tag.name"
                           required
                           :id="tag.name"
                           type="text"
                           :placeholder="tag.name"
                           maxlength="16"
                           @keydown.enter="''"
                           class="px-button-x py-button-y rounded-button-rounded w-full border border-line-color hover:bg-gray-light focus:outline focus:outline-0 text-nowrap cursor-text"
                           :class="tag.id != 0 ? 'bg-white text-black rounded-r-none' : 'bg-gray-light text-gray-text-light cursor-not-allowed pointer-events-none'">
                    <Button v-if="tag.id != 0"
                            @click="showModal = true"
                            :style="'white'"
                            class="basis-1/6"
                            :class="tag.id != 0 ? 'rounded-l-none border-l-0' : ''">
                         <DeleteIcon></DeleteIcon>
                         <Teleport to="body">
                              <Modal v-if="showModal"
                                     @cancel="showModal = false">
                                   <template v-slot:title>
                                        Delete this tag?
                                   </template>
                                   <template v-slot:text>
                                        Are you sure you want to delete this tag? AIn all tasks this tag will be
                                        replaced with "Other". This action cannot be undone.
                                   </template>
                                   <template v-slot:buttonAction>
                                        <Button @click="deleteTag(tag.id)"
                                                :style="'black'"
                                                text="Delete tag"
                                                class="">
                                        </Button>
                                   </template>
                              </Modal>
                         </Teleport>
                    </Button>
               </div>
          </div>
          <div v-if="tags.length < tagsStore.maxCount"
               class="flex flex-row gap-2">
               <Button @click="showListboxNewTag = !showListboxNewTag"
                       :style="showListboxNewTag ? 'white-unactive' : 'white'"
                       class="relative shrink-0 basis-1/6 before:absolute before:z-20 before:left-[50%] before:top-[50%] before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full"
                       :class="newTag.color ? 'before:bg-' + newTag.color + ' before:rounded-full before:w-4 before:h-4' : ''">
                    <PaletteIcon v-if="!newTag.color"></PaletteIcon>
                    <ListboxOptions v-click-outside="() => showListboxNewTag = false"
                                    :isShow="showListboxNewTag"
                                    :attach="'right'"
                                    class="rounded-t-button-rounded rounded-b-button-rounded min-h-[38px]">
                         <li class="flex flex-row justify-between items-center gap-3 px-3 py-2 text-nowrap cursor-pointer hover:bg-gray-light first:rounded-t-button-rounded last:rounded-b-button-rounded"
                             v-for="color in colors"
                             :key="color"
                             @click.stop="showListboxNewTag = false; newTag.color = color">
                              <div class="inline-block rounded-full w-4 h-4"
                                   :class="'bg-' + color"></div>
                         </li>
                    </ListboxOptions>
               </Button>
               <div class="flex flex-row w-full">
                    <input required
                           v-model="newTag.name"
                           :id="newTag"
                           type="text"
                           :placeholder="'Create New Tag'"
                           maxlength="16"
                           class="px-button-x py-button-y rounded-button-rounded w-full bg-white text-black border
                    border-line-color
                    hover:bg-gray-light focus:outline focus:outline-0 text-nowrap cursor-text rounded-r-none">
                    <Button @click="addTag()"
                            :style="'white'"
                            class="rounded-l-none border-l-0 basis-1/6">
                         <AddIcon></AddIcon>
                    </Button>
               </div>
          </div>
          <div v-else
               class="text-center mt-3">The available number of tags has been reached</div>
     </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTagsStore } from '@/stores/tags.js';
import { useTasksStore } from '@/stores/tasks';
import Button from '@/components/Button.vue';
import PaletteIcon from '@/components/icons/PaletteIcon.vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import Modal from '@/components/Modal.vue';
import ListboxOptions from '@/components/ListboxOptions.vue';
import AddIcon from '@/components/icons/AddIcon.vue';

const taskStore = useTasksStore();
const tagsStore = useTagsStore();
const { tags } = storeToRefs(tagsStore);
const colors = tagsStore.colors;
const newTag = ref({
     id: null,
     name: '',
     value: null,
     color: null,
});

const showModal = ref(false);
const arr = Array.from({ length: tags.value.length }, (x) => x = false);
const showListboxArr = reactive(arr);
const showListboxNewTag = ref(false);

function showList(id) {
     showListboxArr[id] = showListboxArr[id] == true ? false : true;
};

function deleteTag(tagId) {
     showModal.value = false;
     tagsStore.deleteTag(tagId);
     taskStore.editTaskByDeletedTag(tagId);
     showListboxArr.pop();
     setInitial();
};

function addTag() {
     if (newTag.value.name) {
          newTag.value.color = newTag.value.color ? newTag.value.color : colors[0];
          newTag.value.value = newTag.value.name;
          newTag.value.id = tags.value.length;

          const tag = Object.assign({}, newTag.value);
          tagsStore.createTag(tag);

          showListboxArr.push(false);

          setInitial();
     };
};

function setInitial() {
     newTag.value.id = null;
     newTag.value.name = '';
     newTag.value.value = '';
     newTag.value.color = null;
};
</script>
