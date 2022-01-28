import { createApp } from 'vue';
import App from './App.vue';
import outline from './index';

const app = createApp(App);
app.use(outline);
app.mount('#app');
