import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home";
import Test from "@/views/Test";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/test", component: Test },
  ],
});

export default router;
