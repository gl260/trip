<template>
  <div class="notice">
    <detail-content title="预定须知">
      <div class="notice-info">
        <template v-for="(item, index) in noticeData.orderRules" :key="index">
          <div class="notice-item">
            <div class="title">{{ item.title }}</div>
            <div class="content">{{ item.introduction }}</div>
          </div>
        </template>
        <div class="notice-item check-notice">
          <div class="title">{{ noticeData?.checkInRules[0]?.title }}</div>
          <div class="check-notice-box">
            <template v-for="(iten, indey) in noticeData?.checkInRules[0]?.items" :key="indey">
              <div class="line">
                <span class="line-img" v-if="iten.isDeleted">
                  <img src="@/assets/img/detail/icon_check.png" alt="" />
                </span>
                <span class="line-img" v-else>
                  <img src="@/assets/img/detail/icon_error.png" alt="" />
                </span>
                {{ iten.introduction }}
              </div>
            </template>
          </div>
        </div>
        <div class="notice-item other-notice">
          <div class="title">{{ noticeData?.checkinOtherInfo[0]?.title }}</div>
          <div class="content">{{ noticeData?.checkinOtherInfo[0]?.items[0]?.introduction }}</div>
        </div>
      </div>
    </detail-content>
  </div>
</template>

<script setup>
import detailContent from "@/components/detail-content/detail-content.vue";

defineProps({
  noticeData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.notice {
  .notice-info {
    padding: 16px 0;
    .notice-item {
      display: flex;
      margin-bottom: 20px;
      font-size: 12px;
      color: #666;
      line-height: 15px;
      .title {
        width: 64px;
      }
      .content {
        flex: 1;
        color: #333;
      }
    }
    .check-notice {
      // display: flex;
      // justify-content: space-between;
      margin-bottom: 0;
      .check-notice-box {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        .line {
          width: 50%;
          align-items: center;
          margin-bottom: 8px;
          color: #333;
          padding-top: 1px;
          .line-img {
            img {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
    .other-notice {
      margin-bottom: 0;
    }
  }
}
</style>
