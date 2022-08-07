<template>
  <div class="home-categories">
    <van-tabs v-model:active="currentActive" color="#ff9854">
      <template v-for="(item, key, index) in categories" :key="item.id">
        <van-tab :title="item.title">
          <template #title>
            <div class="pic"><img :src="item.subPictureUrl" alt="" /></div>
            <div class="title">{{ item.title }}</div>
          </template>
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const currentActive = ref();

const homeStore = useHomeStore();
const { categories } = storeToRefs(homeStore);
// console.log(categories);
</script>

<style lang="less" scoped>
.home-categories {
  --van-tabs-line-height: 72px;
  --van-tabs-bottom-bar-height: 3px;
  .pic {
    text-align: center;
    img {
      width: 32px;
      height: 32px;
    }
  }

  .title {
    font-size: 12px;
  }
}
</style>
