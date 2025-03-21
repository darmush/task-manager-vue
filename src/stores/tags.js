import { defineStore } from 'pinia';
import { ref, watch } from "vue";

export const useTagsStore = defineStore('tagsStore', () => {
    const maxCount = 6;
    const colors = [ 'gray-dark', 'accent-1', 'accent-2', 'accent-3', 'accent-4', 'accent-5'];
    const initialTags = [
        {
            id: 0,
            name: 'Other',
            value: null,
            color: colors[0],
        },
        {
            id: 1,
            name: 'Work',
            value: 'Work',
            color: colors[1],
        },
        {
            id: 2,
            name: 'Personal',
            value: 'Personal',
            color: colors[4],
        },
    ];

    const tags = ref([]);

    const tagsInLocalStorage = localStorage.getItem('tags') || ''
    if (tagsInLocalStorage) {
        tags.value = JSON.parse(tagsInLocalStorage);
    } else {
        tags.value = initialTags;
    };

    const createTag = (tag) => {
            tags.value.push(tag);
    };

    const getProperty = (id, property) => {
        const index = tags.value.findIndex((el) => el.id == id);
        return tags.value[index][property];
    };

    const deleteTag = (id) => {
        tags.value = tags.value.filter((el) => el.id !== id);
    };

    const editTag = (id, property, newValue) => {
        const index = tags.value.findIndex((el) => el.id === id);
        tags.value[index][property] = newValue;
    };

    watch(
        tags,
        (state) => {
          localStorage.setItem('tags', JSON.stringify(state));
        },
        { deep: true },
    );

    return {
        maxCount,
        colors,
        tags,
        createTag,
        getProperty,
        deleteTag,
        editTag
    };
});
