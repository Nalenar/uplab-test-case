import { defineStore } from "pinia";

import type { Article } from "@/types/interfaces/Article";

const useArticlesStore = function () {
  const store = defineStore({
    id: "articles",
    state: () => ({
      articles: [] as Article[],
    }),
    getters: {
      getArticleFromStore(state) {
        return (articleId: number) => state.articles.find((article) => articleId === article.id);
      },
    },
    actions: {
      $reset() {
        this.articles = [];
      },

      async fetchArticlesByPage(page: number) {
        const query = await fetch(import.meta.env.VITE_API_URL + `/posts?_page=${page}&_limit=20`);
        const res: Article[] = await query.json();
        const temp: Article[] = [...this.articles];
        this.articles = [...temp, ...res];
        return this.articles;
      },

      async fetchArticlesByUserId(userId: number) {
        const query = await fetch(import.meta.env.VITE_API_URL + `/posts?userId=${userId}`);
        const res: Article[] = await query.json();

        this.articles = [...res];
      },

      async fetchNewestArticles() {
        const query = await fetch(import.meta.env.VITE_API_URL + "/posts?_limit=8");
        const res: Article[] = await query.json();

        return res;
      },

      async fetchArticle(articleId: number) {
        const query = await fetch(import.meta.env.VITE_API_URL + `/posts/${articleId}`);
        const res: Article = await query.json();

        return res;
      },
    },
  });

  const s = store();
  if (s.articles.length === 0) {
    s.fetchNewestArticles();
  }

  return s;
};

export default useArticlesStore;
