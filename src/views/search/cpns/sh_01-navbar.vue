<template>
  <div class="sh-navbar">
    <nav-bar>
      <template #title>
        <div class="seach-bar">
          <div class="left">
            <span>长沙</span>
          </div>

          <div class="select-time" @click="showCalendar = true">
            <div class="item start">
              <div class="name">住</div>
              <div class="date">{{ startDateStr }}</div>
            </div>
            <div class="item end">
              <div class="name">离</div>
              <div class="date">{{ endDateStr }}</div>
            </div>
          </div>

          <div class="content" @click="searchforBtn">
            <div class="keyword ellipsis-1">搜索博尔塔拉的景点、地标、房源</div>
          </div>
        </div>
      </template>
    </nav-bar>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      :round="false"
      color="#ff9854"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/index.vue";
import { computed, ref } from "vue";
import { formatMonthDay } from "@/utils/format-date";

import useMainStore from "@/stores/modules/main.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore);
const startDateStr = computed(() => formatMonthDay(startDate.value, "MM.DD"));
const endDateStr = computed(() => formatMonthDay(endDate.value, "MM.DD"));
const showCalendar = ref(false);
const onConfirm = (values) => {
  mainStore.startDate = values[0];
  mainStore.endDate = values[1];
  // 隐藏日历
  showCalendar.value = false;
};

const router = useRouter();
const searchforBtn = () => {
  router.push("/searchfor");
};
</script>

<style lang="less" scoped>
.sh-navbar {
  .seach-bar {
    display: flex;
    // flex-wrap: wrap;
    height: 35px;
    background-color: #f2f4f6;
    border-radius: 6px;
    padding: 0 10px;
    .left {
      min-width: 30px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #fff;
      padding-right: 6px;
      margin-right: 5px;
    }
    .select-time {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #999;
      // border-right: 1px solid #fff;
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: normal;
        font-size: 10px;
      }
      .name {
        font-size: 10px;
      }
      .date {
        position: relative;
        color: #333;
        margin: 0 10px 0 3px;
        font-weight: 500;
      }
      .end {
        .date::after {
          content: " ";
          width: 0;
          height: 0;
          border: 4px solid #666;
          border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
          border-radius: 3px;
          transform: rotate(45deg);
          position: absolute;
          bottom: -1px;
          right: -12px;
        }
      }
    }
    .content {
      position: relative;
      flex: 1;
      padding: 0 6px;
      text-align: left;
      border-left: 1px solid #fff;
      line-height: 35px;
      .keyword {
        max-width: 155px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
