import { defineStore } from "pinia";
import { getAllCityData } from "@/service";

const useCityStore = defineStore("city", {
  state: () => ({
    allCites: [],
    currentCity: {
      cityName: "长沙",
    },
  }),
  actions: {
    async fetchAllCityData() {
      const res = await getAllCityData();
      this.allCites = res.data;
    },
  },
});

export default useCityStore;
