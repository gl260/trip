<template>
  <div class="house-item-v9">
    <div class="item-inner">
      <div class="cover">
        <img :src="houseItem.image.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ houseItem.summaryText }}</div>
        <div class="desc ellipsis-2">{{ houseItem.houseName }}</div>
        <div class="price">
          <van-rate
            :model-value="houseScore"
            size="12px"
            color="#fff"
            readonly
            allow-half
          />
          <span class="pri"> ¥ {{ houseItem.finalPrice }}</span>
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

const houseScore = Number(props.houseItem.commentScore);
</script>

<style lang="less" scoped>
.house-item-v9 {
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
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;
      .summary {
        font-size: 12px;
      }
      .desc {
        margin: 5px 0;
      }
      .price {
        display: flex;
        justify-content: space-between;
        .pri {
          text-align: right;
        }
      }
    }
  }
}
</style>
