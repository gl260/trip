<template>
  <div class="dropdown-menu">
    <van-dropdown-menu active-color="#ff9854">
      <template v-for="(item, index) in searchData.allConditions" :key="index">
        <van-dropdown-item v-if="item.gType === 2" title="位置">
          <!-- <div class="dropdown-location">
            <van-tree-select
              v-model:active-id="activeId"
              v-model:main-active-index="activeIndex"
              :items="items"
            />
          </div> -->
          <template v-for="(iten, indey) in arr[0].subGroups" :key="iten">
            {{ iten.itemTypeLabel }}
          </template>
          <!-- {{}} -->
        </van-dropdown-item>
        <van-dropdown-item
          v-if="item.gType === 4"
          v-model="value"
          :options="option2"
        ></van-dropdown-item>
        <van-dropdown-item v-if="item.gType === 1" title="筛选"></van-dropdown-item>
      </template>
    </van-dropdown-menu>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  searchData: {
    type: Object,
    default: () => ({}),
  },
});

const value = ref(0);
// const activeId = ref(1);
// const activeIndex = ref(0);

const option2 = [
  { text: "欢迎度排序", value: 0 },
  { text: "好评优先", value: 1 },
  { text: "点评数多-少", value: 2 },
  { text: "低价优先", value: 3 },
  { text: "高价优先", value: 4 },
];

const items = [
  {
    text: "热门推荐",
    children: [
      { text: "天河区" },
      { text: "天河区" },
      { text: "天河区" },
      { text: "天河区" },
      { text: "天河区" },
      { text: "天河区" },
    ],
  },
];
const arr = computed(() => props.searchData.allConditions);
// console.log(arr.value);

// console.log(arr);
// for (const item of arr.value) {
//   console.log(item);
// }
</script>

<style lang="less" scoped></style>
