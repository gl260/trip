<template>
  <div class="pricedesc">
    <div class="title">{{ pricedescData.title }}</div>
    <div class="desc">
      {{ pricedescData.introduction }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  pricedescData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.pricedesc {
  border-top: 5px solid #f2f3f4;
  background: #fff;
  padding: 16px 12px;
  margin-top: 10px;
  .title {
    font-size: 14px;
    color: #333;
    line-height: 17px;
    font-weight: 600;
  }
  .desc {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    line-height: 15px;
  }
}
</style>
