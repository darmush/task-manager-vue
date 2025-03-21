import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value(event);
            };
        };
        document.addEventListener('mouseup', el.clickOutsideEvent);
    },
    unmounted: el => {
        document.removeEventListener('mouseup', el.clickOutsideEvent);
    },
};

app.directive('click-outside', clickOutside);
app.use(createPinia());
app.use(router);

app.mount('#app');
