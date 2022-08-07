<template>
  <div class="house-item-v3">
    <div class="item-inner">
      <div class="cover">
        <img :src="houseItem?.image?.url" alt="" />
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span class="position">111{{ houseItem.location }}</span>
        </div>
        <div class="desc ellipsis-2">{{ houseItem.houseName }}</div>
        <div class="summary">{{ houseItem.summaryText }}</div>

        <div class="price">
          <span class="pri"> ¥{{ houseItem.finalPrice }}</span>
          <span class="del">¥{{ houseItem.productPrice }}</span>
          <!-- 这里可能会没有值,获取不到,-->
          <!-- 1 ?. -->
          <!-- 2 v-if="houseItem.priceTipBadge" 没有值就不显示-->
          <div class="tip">
            {{ houseItem?.priceTipBadge?.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  houseItem: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.house-item-v3 {
  width: 50%;

  // background-color: pink;
  .item-inner {
    // height: 200px;
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    .cover {
      img {
        width: 100%;
      }
    }
    .info {
      padding: 8px 10px;
      font-size: 12px;
      .location {
        img {
          width: 12px;
          height: 12px;
        }
        .position {
          margin-left: 2px;
          font-size: 12px;
          color: #666;
        }
      }
      .desc {
        margin: 5px 0;
        font-size: 14px;
        color: #333;
      }
      .summary {
        font-size: 12px;
        color: #666;
      }

      .price {
        margin: 8px 0;
        display: flex;
        align-items: center;
        .pri {
          font-size: 14px;
          text-align: right;
          color: var(--primary-color);
        }
        .del {
          font-size: 12px;
          color: #999;
          margin: 0 5px;
        }
        .tip {
          color: #fff;
          background-image: linear-gradient(270deg, #ff6666, #ff9f9f);
          padding: 0 6px;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
