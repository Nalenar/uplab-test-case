import { acceptHMRUpdate, defineStore } from "pinia";

import type User from "@/types/interfaces/User";

const useUsersStore = function () {
  const store = defineStore({
    id: "users",
    state: () => ({
      users: [] as User[],
    }),
    getters: {
      getUser(state) {
        return (userId: number) => state.users.find((user) => user.id === userId);
      },
    },
    actions: {
      async fetchUsers() {
        const query = await fetch(import.meta.env.VITE_API_URL + "/users");
        const res: User[] = await query.json();
        this.users = res;
      },
    },
  });

  const s = store();

  if (s.users.length === 0) {
    s.fetchUsers();
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot));
  }

  return s;
};

export default useUsersStore;
