import "./assets/index.scss";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Aura from "@primeuix/themes/aura";

import App from "./App.vue";
import { PrimeVue } from "@primevue/core";

const app = createApp(App);

app.use(createPinia());

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});


app.mount("#app");
