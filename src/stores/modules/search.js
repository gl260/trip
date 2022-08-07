import { defineStore } from "pinia";
import { getSearchTop } from "@/service";

const useSearchStore = defineStore("search", {
  state: () => ({
    searchTop: {},
  }),
  actions: {
    async fetchSearchData() {
      const res = await getSearchTop();
      this.searchTop = res.data;
    },
  },
});

export default useSearchStore;
