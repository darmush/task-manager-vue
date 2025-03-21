<template>
    <div class="w-max text-center px-3 py-4 text-black">
        <div class="flex items-center">
            <button @click.stop="prevMonth()"
                    type="button"
                    class="block -m-1.5 items-center justify-center p-1.5 rotate-90 ">
                <ArrowIcon />
            </button>
            <div class="flex-auto text-sm font-semibold">{{ months[currentMonth] }} {{ currentYear }}</div>
            <button @click.stop="nextMonth()"
                    type="button"
                    class="block -m-1.5 items-center justify-center p-1.5 rotate-[270deg]">
                <ArrowIcon />
            </button>
        </div>
        <div class="mt-4 grid grid-cols-7 text-xs">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
        </div>
        <div class="isolate mt-3 grid grid-cols-7  overflow-hidden text-sm">
            <button v-for="day in setDays()"
                    :key="day"
                    type="button"
                    @click="selectDay(day); $emit('selectedDay', selectedDay)"
                    class="px-1.5 py-1 bg-white hover:bg-gray-light"
                    :class="[day.setHours(0, 0, 0, 0) == selectedDay.setHours(0, 0, 0, 0) ? 'relative before:absolute before:z-10 before:-translate-y-2/4 before:-translate-x-2/4 before:top-[50%] before:left-[50%] before:w-6 before:h-6 before:bg-black before:rounded-full' : '', day.getMonth() == currentMonth ? 'text-black' : 'text-gray-text-light', day.setHours(0, 0, 0, 0) == selectedDay.setHours(0, 0, 0, 0) ? 'font-bold text-white' : '']">
                <span class="relative z-30"
                      :class="[day.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0) ? 'font-bold text-accent-2' : '']">
                    {{ day.getDate() }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ArrowIcon from './icons/ArrowIcon.vue';
import dateMethods from '@/helpers/date';

defineEmits(['selectedDay']);
const props = defineProps({
    selDay: {
        type: String,
    },
});
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const selDay = props.selDay ? dateMethods.parseDate(props.selDay) : null;
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDay = ref(selDay || today);

function nextMonth() {
    if (currentMonth.value == 11) {
        currentMonth.value = 0;
        currentYear.value = currentYear.value + 1;
    } else {
        currentMonth.value = currentMonth.value + 1;
    };
};

function prevMonth() {
    if (currentMonth.value == 0) {
        currentMonth.value = 11;
        currentYear.value = currentYear.value - 1;
    } else {
        currentMonth.value = currentMonth.value - 1;
    };
};

const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 0).getDay() + 1);
const lastDateOfMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate());
const lastDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDay());
const lastDayOfLastMonth = computed(() => currentMonth.value == 0 ? new Date(currentYear.value - 1, 11, 0).getDate() : new Date(currentYear.value, currentMonth.value, 0).getDate());

function setDays() {
    const days = [];
    let day, month, year;

    // start not on monday
    if (firstDayOfMonth.value != 1) {
        for (let i = 0; i < (firstDayOfMonth.value - 1); i++) {
            day = lastDayOfLastMonth.value - (firstDayOfMonth.value - 1) + 1 + i;
            month = currentMonth.value - 1;
            year = currentYear.value;
            days.push(new Date(year, month, day));
        };
    };

    for (let i = 0; i < lastDateOfMonth.value; i++) {
        day = 1 + i;
        month = currentMonth.value;
        year = currentYear.value;
        days.push(new Date(year, month, day));
    }

    // end not on sunday
    if (lastDayOfMonth.value != 0) {
        for (let i = 0; i <= (6 - lastDayOfMonth.value); i++) {
            day = 1 + i;
            month = currentMonth.value + 1;
            year = currentYear.value;
            days.push(new Date(year, month, day));
        };
    };
    return days;
};

function selectDay(day) {
    if (day.getMonth() > currentMonth.value) {
        nextMonth();
    };

    if (day.getMonth() < currentMonth.value) {
        prevMonth();
    };

    selectedDay.value = day;
};

</script>
