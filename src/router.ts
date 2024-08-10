import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Test from "@/views/Test.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/test", component: Test },
  ],
});

export default router;
