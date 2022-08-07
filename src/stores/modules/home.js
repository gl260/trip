import { defineStore } from "pinia";
import { getHotSuggest, getHomecategories, getHomeHouseList } from "@/service";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggest: {},
    categories: [],
    currentPage: 1, //获取下一页数据方式二
    houseList: [],
  }),
  actions: {
    async fetchHotSugger() {
      const res = await getHotSuggest();
      this.hotSuggest = res.data;
    },
    async fetchCategories() {
      const res = await getHomecategories();
      this.categories = res.data;
    },
    async fetchHouseList() {
      const res = await getHomeHouseList(this.currentPage);
      this.houseList.push(...res.data);
      this.currentPage++;
    },
  },
});

export default useHomeStore;
