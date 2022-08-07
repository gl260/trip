<template>
  <div class="info">
    <div class="title">{{ infoData.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in infoData.houseTags" :key="index">
        <div
          class="item"
          v-if="item.tagText"
          :style="{
            color: item?.tagText?.color,
            background: item?.tagText?.background?.color,
          }"
        >
          {{ item?.tagText?.text }}
        </div>
      </template>
    </div>
    <div class="comment">
      <div class="left">
        <span class="score">{{ infoData?.commentBrief?.overall }}</span>
        <span class="desc">{{ infoData?.commentBrief?.scoreTitle }}</span>
        <span class="context ellipsis-1">
          "{{ infoData?.commentBrief?.commentBrief }}"
        </span>
      </div>
      <div class="right">
        <span class="commentNums">
          {{ infoData?.commentBrief?.totalCount }}条评论
        </span>
        <van-icon name="arrow" color="#ff9854" size="12" />
      </div>
    </div>
    <div class="location">
      <div class="left">
        <div class="location-top ellipsis-1">
          {{ infoData?.nearByPosition?.address }}
        </div>
        <div class="location-buttom ellipsis-1">
          <img src="@/assets/img/detail/position_train.png" alt="" />
          {{ infoData?.nearByPosition?.tradeArea }}
        </div>
      </div>
      <div class="right">
        <span class="location-periphery">地图·周边</span>
        <van-icon name="arrow" color="#ff9854" size="12" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  infoData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.info {
  padding: 16px;
  background-color: #fff;
  .title {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    margin-bottom: 12px;
    .item {
      padding: 2px 4px;
      border-radius: 2px;
      margin: 4px 4px 0 0;
    }
  }
  .comment {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    background: #f5f7fa;
    padding: 0 12px;
    border-radius: 4px;
    .left {
      display: flex;
      align-items: center;
      font-size: 10px;
      color: #333;
      .score {
        font-weight: 700;
        font-size: 18px;
        margin-right: 2px;
      }
      .desc {
        margin-right: 4px;
        font-size: 12px;
        color: #333;
        font-weight: 700;
      }
      .context {
        max-width: 160px;
        color: #666;
        font-size: 12px;
        line-height: 14px;
      }
    }
    .right {
      .commentNums {
        font-size: 10px;
        color: var(--primary-color);
      }
    }
  }
  .location {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 4px;
    .left {
      .location-top {
        max-width: 234px;
        font-weight: 700;
        font-size: 14px;
        color: #333;
        line-height: 16px;
      }
      .location-buttom {
        max-width: 234px;
        font-size: 12px;
        color: #666;
        line-height: 14px;
        margin-top: 4px;
        img {
          width: 10px;
          height: 10px;
          margin-top: 2px;
        }
      }
    }
    .right {
      .location-periphery {
        padding-right: 3px;
        font-size: 10px;
        color: var(--primary-color);
      }
    }
  }
}
</style>
