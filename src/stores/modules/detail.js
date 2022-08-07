import { defineStore } from "pinia";
import { getDetailInfos } from "@/service";

const useDetailStore = defineStore("detail", {
  state: () => ({
    detailInfos: {},
  }),
  actions: {
    async fetchdetailData(houseId) {
      const res = await getDetailInfos(houseId);
      this.detailInfos = res.data;
    },
  },
});

export default useDetailStore;
