import { createApp } from 'vue';
import App from './App.vue';
import { useOutline } from './index';

const app = createApp(App);
useOutline(app);
app.mount('#app');
