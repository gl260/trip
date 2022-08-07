<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <!-- 热门 -->
      <van-index-anchor index="热门" />
      <div class="hot-city">
        <template v-for="(group, index) in groupData.hotCities" :key="index">
          <div class="city" @click="cityClick(group)">{{ group.cityName }}</div>
        </template>
      </div>

      <!-- A-Z 的城市 -->
      <template v-for="(group, index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed, isRef } from "vue";
import useCityStore from "@/stores/modules/city";
import { useRouter } from "vue-router";

// 定义props数据
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({}),
  },
});

console.log(props.groupData.cities);

// 获取城市索引列表
const indexList = computed(() => {
  const list = props.groupData.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});
// console.log(isRef(indexList));

// 点击城市,返回上一层并显示
const cityStore = useCityStore();
const router = useRouter();
const cityClick = (city) => {
  cityStore.currentCity.cityName = city.cityName;
  // console.log(cityStore.currentCity.cityName);
  router.back();
};
</script>

<style lang="less" scoped>
.city-group {
  .hot-city {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 10px;
    padding-right: 20px;
    .city {
      width: 70px;
      height: 28px;
      margin: 6px;
      border-radius: 14px;
      font-size: 12px;
      text-align: center;
      line-height: 28px;
      background-color: #fff4ec;
    }
  }
}
</style>
