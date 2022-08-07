<template>
  <div class="tar-bar">
    <van-tabbar v-model="currentIndex" route>
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img
              :src="
                currentIndex === index
                  ? getAssetURL(item.imageActive)
                  : getAssetURL(item.image)
              "
            />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tabbarData from "@/assets/data/tabbarData.js";
import { getAssetURL } from "@/utils/load_assets.js";

const currentIndex = ref(0);
</script>

<style lang="less" scoped>
.tar-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 50px;
  border-top: 1px solid #f3f3f3;

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
