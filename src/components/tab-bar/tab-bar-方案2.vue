<template>
  <div class="tar-bar">
    <template v-for="(item, index) in tabbarData">
      <div
        class="tar-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
        <img v-else :src="getAssetURL(item.imageActive)" alt="" />
        <div class="text">{{ item.text }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tabbarData from "@/assets/data/tabbarData.js";
import { getAssetURL } from "@/utils/load_assets.js";
import { useRouter } from "vue-router";

const router = useRouter();

const currentIndex = ref(0);
const itemClick = (index, item) => {
  currentIndex.value = index;
  // console.log(item.path);
  router.push(item.path);
};
</script>

<style lang="less" scoped>
.tar-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;

  .tar-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column; //设置主轴方向
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }
    img {
      width: 34px;
    }
  }
}
</style>
