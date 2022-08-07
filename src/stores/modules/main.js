import { defineStore } from "pinia";

const nowDate = new Date();
const secondDate = new Date();
secondDate.setDate(secondDate.getDate() + 1);

const useMainStore = defineStore("main", {
  state: () => ({
    startDate: nowDate,
    endDate: secondDate,

    isLoading: false,
  }),
  actions: {},
});

export default useMainStore;
