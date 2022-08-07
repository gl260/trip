<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item>
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total }">
        <div class="swipe-indicator">
          <!-- {{ active + 1 }}/{{ total }}-{{ swipeData.length }} -->
          <template v-for="(value, key, index) in swipeGroup" :key="index">
            <!-- swipeData.enumPictureCategory与key的值相等时,就表示活跃状态 -->
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getTitle(value[0].title) }}</span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
              >
                {{ getCurrentIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => [],
  },
});

const swipeGroup = {};
for (const item of props.swipeData) {
  // 第一次循环
  let groupArray = swipeGroup[item.enumPictureCategory]; //swipeGroup刚开始没有值,比如swipeGroup[2]是取不到的
  // groupArray没有值时,给groupArray赋值一个空数组
  if (!groupArray) {
    groupArray = [];
    swipeGroup[item.enumPictureCategory] = groupArray;
  }
  groupArray.push(item); // 吧第一次循环的item push给groupArray
}

const getTitle = (title) => {
  return title.replace("：", "").replace("】", "").replace("【", "");
};

// 思路:  swipeData[0]
//       在{ [], [], [], []... }找到enumPictureCategory - (2,4,9)
//       然后通过 { 2: [], 4:[], 9:[] }
const getCurrentIndex = (item) => {
  const group = swipeGroup[item.enumPictureCategory]; //swipeGroip[2]
  return group.findIndex((index) => index === item) + 1;
};

// 数据转换一:  { [], [], [], []... } --> { 2: [], 4:[], 9:[] }
// for (const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory] = [];
//   // { 2: [], 4:[], 9:[] } ,是key为2,4,9  value在下一个循环中获取
// }
// for (const item of props.swipeData) {
//   const groupArray = swipeGroup[item.enumPictureCategory];
//   groupArray.push(item);
// }

// const arr1 = {};
// arr1[2] = [];
// arr1[2] = [];
// arr1[4] = [];
// arr1[9] = [];
// console.log(arr1); // {2: [], 4: [], 9: []}
</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    img {
      width: 100%;
    }
  }
  .swipe-indicator {
    position: absolute;
    right: 16px;
    bottom: 16px;
    padding: 2px 8px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    .item {
      color: #fff;
      padding: 0 4px;
      border-radius: 9px;
      &.active {
        background: #fff;
        color: #333;
      }
    }
  }
}
</style>
