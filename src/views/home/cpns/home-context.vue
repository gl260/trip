<template>
  <div class="home-content">
    <div class="title">热门精选</div>
    <div class="house-list">
      <template v-for="(item, index) in houseList" :key="item.data.houseId">
        <house-item-v3
          v-if="item.discoveryContentType === 3"
          :house-item="item.data"
          @click="itemClick(item.data)"
        />
        <house-item-v9
          v-else-if="item.discoveryContentType === 9"
          :house-item="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import houseItemV3 from "@/components/house-item-v3/house-item-v3.vue";
import houseItemV9 from "@/components/house-item-v9/house-item-v9.vue";

import { storeToRefs } from "pinia";
import useHomeStore from "@/stores/modules/home";
import { useRouter } from "vue-router";

const homeStore = useHomeStore();
const { houseList } = storeToRefs(homeStore);

const router = useRouter();
const itemClick = (item) => {
  router.push("/detail/" + item.houseId);
};
</script>

<style lang="less" scoped>
.home-content {
  .title {
    height: 48px;
    font-size: 18px;
    color: #333;
    line-height: 48px;
    padding-left: 20px;
  }
  .house-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
