import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import dateMethods from '@/helpers/date';

export const useTasksStore = defineStore('tasksStore', () => {
    const initialTasks = [
        {
            title: 'Create layout in Figma',
            description: 'For CV project',
            id: 1,
            done: false,
            tag: 1,
            date: '11/01/25',
            pin: true,
        },
        {
            title: 'Create filles for implement',
            description: 'For Snake project',
            id: 2,
            done: false,
            tag: 1,
            date: '17/01/25',
            pin: false,
        },
        {
            title: 'Call mom',
            description: '21:00',
            id: 3,
            done: false,
            tag: 2,
            date: '21/01/25',
            pin: true,
        },
        {
            title: 'Buy Pasta Ingredients',
            description: 'Pasta, Tomatoes, Minced meat, Basil',
            id: 4,
            done: false,
            tag: 0,
            date: '11/01/25',
            pin: false,
        },
        {
            title: 'Book a hotel for the weekend',
            description: '',
            id: 5,
            done: true,
            tag: 0,
            date: '01/02/25',
            pin: true,
        },
        {
            title: 'Test the app',
            description: '',
            id: 6,
            done: true,
            tag: 1,
            date: '25/12/24',
            pin: false,
        },
        {
            title: 'Reply to birthday greetings',
            description: '',
            id: 7,
            done: true,
            tag: 2,
            date: '11/03/25',
            pin: false,
        },
    ];

    const tasks = ref([]);

    const tasksInLocalStorage = localStorage.getItem('tasks') || '';
    if (tasksInLocalStorage) {
        tasks.value = JSON.parse(tasksInLocalStorage);
    } else {
        tasks.value = initialTasks;
    };

    const sortedTasks = computed(() =>
        tasks.value.sort((a, b) => {
            return b.pin - a.pin || a.done - b.done || dateMethods.compareDates(a.date, b.date);
        })
    );

    const tasksCount = computed(() =>
        tasks.value.length
    );

    const searchedTasks = (searchQuery) => {
        const searchedTasks = tasks.value.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return searchedTasks;
    };

    const filterTasks = (property, value) => {
        const filterTasks = tasks.value.filter((el) => el[property] === value);
        return filterTasks;
    };

    const filterTasksByOverdue = (is) => {
        const today = dateMethods.getToday();
        const filterTasks = tasks.value.filter((el) => (dateMethods.parseDate(el.date) - dateMethods.parseDate(today) < 0) == is);
        return filterTasks;
    };

    const createTask = (task) => {
        tasks.value.push(task);
    };

    const deleteTask = (id) => {
        tasks.value = tasks.value.filter((el) => el.id !== id);
    };

    const deleteAll = () => {
        tasks.value = [];
    };

    const editTask = (id, property, newValue) => {
        const index = tasks.value.findIndex((el) => el.id === id);
        tasks.value[index][property] = newValue;
    };

    const editTaskByDeletedTag = (tagId) => {
        tasks.value.forEach((el) => {
            if(el.tag == tagId) {
                editTask(el.id, 'tag', 0);
            };
        });
    };

    const setInitial = () => {
        tasks.value = this.initialTasks
    };

    watch(
        tasks,
        (state) => {
          localStorage.setItem('tasks', JSON.stringify(state));
        },
        { deep: true },
    );

    return {
        tasks,
        sortedTasks,
        tasksCount,
        searchedTasks,
        filterTasks,
        filterTasksByOverdue,
        createTask,
        deleteTask,
        deleteAll,
        editTask,
        editTaskByDeletedTag,
        setInitial
    };
  });
