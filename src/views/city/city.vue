<template>
  <div class="city">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        show-action
        shape="round"
        @cancel="onCancel"
      />

      <!-- 2.tab切换 -->
      <van-tabs v-model:active="currentTabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCites" :key="index">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- 3.tab切换内容,显示城市 -->
    <div class="content">
      <template v-for="(value, key, index) in allCites" :key="index">
        <CityGroup v-show="currentTabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, isRef, ref } from "vue";
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city.js";
import { storeToRefs } from "pinia";

import CityGroup from "./cpns/city-group.vue";

const router = useRouter();

// 1.搜索框功能
const searchValue = ref("");
const onCancel = () => {
  router.push("/home");
};

// 2.tab切换
const currentTabActive = ref();

const cityStore = useCityStore();
cityStore.fetchAllCityData();
const { allCites } = storeToRefs(cityStore);

// 3.tab切换内容,显示城市 --> 需要根据tab的切换来显示正确的内容,点击一个tab获取对应的数据
// 目的: 获取选中标签后的数据
//      .获取正确的key: 将tabs中绑定的currentTabActive正确绑定
//      .根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
// const currentGroup = computed(() => allCites.value[currentTabActive.value]);
// console.log(isRef(allCites.currentTabActive)); //false //要是不知道变量是否是响应式的,可以使用isRef()
// console.log(isRef(currentGroup)); // true
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
