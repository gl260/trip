<template>
  <div class="detail-content">
    <div class="header">{{ title }}</div>
    <div class="split-line"></div>
    <div class="content">
      <slot>默认内容</slot>
    </div>
    <div class="footer" v-if="showMore.length">
      <span class="show-more">{{ showMore }}</span>
      <van-icon name="arrow" color="#ff9854" size="12" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "默认标题",
  },
  showMore: {
    type: String,
    default: "查看更多",
  },
});
</script>

<style lang="less" scoped>
.detail-content {
  border-top: 5px solid #f2f3f4;
  .header {
    padding: 14px 16px;
    font-size: 20px;
    color: #333;
    line-height: 22px;
    font-weight: 600;
    // border-bottom: 0.5px solid #eee;
  }
  .split-line {
    height: 0.5px;
    background: #eee;
    margin: 0 16px;
  }
  .content {
    padding: 0 16px;
  }
  .footer {
    padding: 15px 16px;
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color);
    text-align: right;
    .show-more {
      margin-right: 2px;
    }
  }
}
</style>
