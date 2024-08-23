import { createRouter, createWebHistory } from "vue-router";

import Home from "@views/Home";
import Test from "@views/Test";
import Articles from "@views/Articles";
import Article from "@/views/Article";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, name: "blog" },
    { path: "/articles", component: Articles, name: "articles" },
    { path: "/articles/:id", component: Article },

    { path: "/test", component: Test, name: "test" },
  ],
});

export const navbarRoutes: (string | symbol)[] = ["blog", "articles"];

export default router;
