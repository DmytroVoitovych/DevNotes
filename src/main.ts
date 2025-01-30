import './assets/main.css';
import 'element-plus/es/components/notification/style/css';
import { initializeApp } from 'firebase/app';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { firebaseConfig } from './firebase/firebaseConfig';

initializeApp(firebaseConfig);
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
