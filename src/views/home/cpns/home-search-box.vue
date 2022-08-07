<template>
  <div class="home-search-box">
    <!-- 1.地址 -->
    <div class="item lacation">
      <div class="city" @click="getlocation">
        {{ cityStore.currentCity.cityName }}
      </div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 2.入住,离店 -->
    <div class="item date-range" @click="showCalendar = true">
      <div class="start">
        <div class="data">
          <div class="tip">入住</div>
          <div class="time">{{ startDateStr }}</div>
        </div>
        <div class="stay">共{{ timeDiff }}晚</div>
      </div>
      <div class="end">
        <div class="data">
          <div class="tip">离店</div>
          <div class="time">{{ endDateStr }}</div>
        </div>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      :round="false"
      color="#ff9854"
      @confirm="onConfirm"
    />

    <!-- 3.价格,人数 -->
    <div class="item price-prople">
      <div class="price">价格不限</div>
      <div class="prople">人数不限</div>
    </div>

    <!-- 4.关键字 -->
    <div class="item keyword">关键字/位置/民宿名</div>

    <!-- 5.热门建议 -->
    <div class="hot-suggest">
      <template v-for="(item, index) in hotSuggest" :key="index">
        <div
          class="tag"
          :style="{
            color: item.tagText.color,
            backgroundColor: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 6.开始搜索 -->
    <div class="search-btn">
      <van-button color="linear-gradient(90deg, #fa8c1d, #fcaf3f)" round block @click="searchBtn">
        开始搜索
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useCityStore from "@/stores/modules/city";
import useHomeStore from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";
import { formatMonthDay, getDiffDay } from "@/utils/format-date";
import { computed, isRef, ref } from "vue";
import { storeToRefs } from "pinia";

// 1.位置逻辑
const router = useRouter();
const getlocation = () => {
  router.push("/city");
  // router.back();
};
const cityStore = useCityStore();
const mainStore = useMainStore();

// 2.入住,离店时间返回逻辑
// const nowDate = new Date();
// // const secondDate = new Date(nowDate.setDate(nowDate.getDate() + 1)); //会将nowDate的时间也改掉
// // 时间+1天 或者-1天 --> 设置时间(获取当前时间 +1)
// const secondDate = new Date();
// secondDate.setDate(secondDate.getDate() + 1);

const { startDate, endDate } = storeToRefs(mainStore);

const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));

const timeDiff = ref(getDiffDay(startDate.value, endDate.value));

const showCalendar = ref(false);
const onConfirm = (values) => {
  // console.log(formatMonthDay(values[0]), formatMonthDay(values[1]));
  // 设置时间
  // startDateStr.value = formatMonthDay(values[0]);
  // endDateStr.value = formatMonthDay(values[1]);
  mainStore.startDate = values[0];
  mainStore.endDate = values[1];
  timeDiff.value = getDiffDay(values[0], values[1]);
  // 隐藏日历
  showCalendar.value = false;
};

// 3.价格,人数
// 4.关键字
// 5.热门建议
const homeStore = useHomeStore();
const { hotSuggest } = storeToRefs(homeStore);

// 6.搜索按钮
const searchBtn = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: cityStore.currentCity.cityName,
    },
  });
};
</script>

<style lang="less" scoped>
.home-search-box {
  margin-bottom: 20px;
}
.item {
  height: 45px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.lacation {
  .city {
    flex: 1;
  }
  .position {
    width: 74px;
    .text {
      position: relative;
      top: 1px;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }
}
.date-range {
  .satrt {
    display: flex;
  }
  .start {
    flex: 1;
    display: flex;

    .stay {
      flex: 1;
      text-align: center;
      line-height: 45px;
      font-size: 12px;
      color: #666;
    }
  }
  .data {
    display: flex;
    flex-direction: column;
    .tip {
      font-size: 12px;
      color: #999;
    }
    .time {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      margin-top: 3px;
    }
  }
  .end {
    min-width: 30%;
    padding-left: 20px;
  }
}
.price-prople {
  color: #999;
  .price {
    flex: 1;
  }
  .prople {
    min-width: 30%;
    padding-left: 20px;
  }
}
.keyword {
  color: #999;
}
.hot-suggest {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  margin: 10px 0;
  .tag {
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
  }
}

.search-btn {
  display: flex;
  justify-content: center;
  :deep(.van-button--block) {
    width: 90%;
  }
  :deep(.van-button) {
    height: 38px;
  }
  :deep(.van-button--normal) {
    font-size: 18px;
  }
}
</style>
