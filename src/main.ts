import { createApp } from 'vue';
import App from './App.vue';
import { useOutline } from '@/components/toc/index';

const app = createApp(App);
useOutline(app);
app.mount('#app');
