import { createRouter, createWebHistory } from "vue-router";

import Home from "@views/Home";
import Test from "@views/Test";
import Articles from "@views/Articles";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "blog" },
    { path: "/articles", component: Articles, name: "articles" },

    { path: "/test", component: Test, name: "test" },
  ],
});

export default router;
