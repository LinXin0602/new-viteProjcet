import { createApp } from 'vue';
import { createPinia } from 'pinia';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';
import './style/index.css';
// Import component
import Loading from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';

// 匯入 vee-validate 相關規則

import { required, email, min } from '@vee-validate/rules';

// 匯入多國語系的功能

import { localize, setLocale } from '@vee-validate/i18n';

// 匯入繁體中文語系檔案

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
defineRule('required', required);

defineRule('email', email);

defineRule('min', min);

// 設定 vee-validate 全域規則

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系

  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系

setLocale('zh_TW');

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faCopy, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faCopy, faMagnifyingGlass);

// import 'font-awesome/css/font-awesome.min.css';
const app = createApp(App);

app.use(createPinia());
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
app.component('Form', Form);

// eslint-disable-next-line vue/multi-word-component-names
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(router);
app.use(Toast, { timeout: 2500 });
AOS.init();
app.component('loading-overlay', Loading);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
