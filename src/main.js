import { createApp } from "vue";
import router from "./router";
import pinia from "./stores";
import App from "./App.vue";

// 样式重置
import "normalize.css";
import "./assets/css/index.css";

createApp(App).use(router).use(pinia).mount("#app");
