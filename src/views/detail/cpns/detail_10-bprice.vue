<template>
  <div class="bottom-price">
    <div class="bp-show">
      <div class="left">
        <div class="box">
          <div class="image">
            <img src="@/assets/img/detail/icon_chat.png" alt="" />
          </div>
          <div class="text">聊天</div>
        </div>
      </div>
      <div class="right">
        <div class="main">
          <div class="top">
            <span class="price">￥{{ bpriceData.finalPrice }}</span>
            /晚
            <del>￥{{ bpriceData.productPrice }}</del>
          </div>
          <div class="bottom">
            <div class="discount">已减{{ discount }}元</div>
            <div class="detail" @click="detailPopup">
              明细<van-icon name="arrow-down" color="#ff9854" size="10" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bp-button">
      <div class="text">
        <img src="@/assets/img/detail/icon_order.png" alt="" />
        预订当前房源
      </div>
    </div>
    <van-popup
      v-model:show="showPopup"
      position="bottom"
      closeable
      close-icon-position="bottom-right"
      :style="{ height: '100%' }"
    >
      <div class="detail-price">
        <div class="title">价格明细</div>
        <van-divider />
        <div class="details-content">
          <template v-for="(item, index) in bpriceData.priceDetails" :key="index">
            <div class="item">
              <div class="item-label">{{ item.title }}</div>
              <div class="item-price">{{ item.introduction }}</div>
            </div>
          </template>
          <div class="item-bottom">
            平均每晚
            <span>{{ bpriceData.priceDetails[0].introduction }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  bpriceData: {
    type: Object,
    default: () => ({}),
  },
});
const discount = computed(() => {
  return Number(props.bpriceData.productPrice) - Number(props.bpriceData.finalPrice);
});

const showPopup = ref(false);
const detailPopup = () => {
  showPopup.value = true;
};
</script>

<style lang="less" scoped>
.bottom-price {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100vw;
  height: 60px;
  background: #fff;
  display: flex;
  .bp-show {
    flex: 1;
    display: flex;
    .left {
      height: 42px;
      border-right: 1px solid #e9e9e9;
      margin: auto 0;
      font-size: 10px;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      .box {
        width: 50px;
        .image {
          text-align: center;
          margin-bottom: 4px;
          img {
            height: 17px;
            height: 17px;
          }
        }

        .text {
          text-align: center;
        }
      }
    }
    .right {
      flex: 1;
      color: #666;
      padding-left: 12px;
      display: flex;
      align-items: center;
      .main {
        .top {
          font-size: 13px;
          .price {
            color: var(--primary-color);
            font-weight: 600;
            font-size: 16px;
            padding: 1;
          }
        }
        .bottom {
          margin-top: 4px;
          display: flex;
          align-items: center;
          .discount {
            height: 15px;
            border-radius: 2px;
            padding: 0 2px;
            font-size: 10px;
            color: #ff9645;
            margin-left: 4px;
            background: rgba(255, 150, 69, 0.1);
          }
          .detail {
            // width: 28px;
            font-size: 11px;
            color: var(--primary-color);
            margin-left: 10px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  .bp-button {
    width: 150px;
    background-image: var(--theme-linear-gradient);
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      color: #fff;
      font-size: 18px;
      img {
        width: 14px;
        height: 18px;
        margin-top: 2px;
      }
    }
  }
  .bp-popup {
  }
}
.detail-price {
  margin-top: 10px;
  background: #fff;
  .title {
    font-size: 20px;
    color: #333;
    line-height: 1;
    font-weight: 600;
    padding: 14px 16px;
  }
  :deep(.van-divider) {
    --van-divider-margin: 0;
  }
  .details-content {
    padding: 0 16px 16px;
    .item {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .item-label {
        color: #666;
        line-height: 1;
      }
      .item-price {
        color: #333;
        line-height: 1;
      }
    }
    .item-bottom {
      padding-top: 16px;
      margin-top: 16px;
      text-align: right;
      font-size: 11px;
      color: #666;
      line-height: 1;
      border-top: 0.5px solid #e9e9e988;
      span {
        font-size: 13px;
        color: var(--primary-color);
        font-weight: 700;
      }
    }
  }
}
:deep(.van-popup__close-icon--bottom-right) {
  right: 50%;
  transform: translateX(50%);
}
</style>
