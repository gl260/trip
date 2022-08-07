<template>
  <div class="tar-bar">
    <div class="tar-bar-item">
      <img src="@/assets/img/tabbar/tab_home.png" alt="" />
      <div class="text">首页</div>
    </div>
    <div class="tar-bar-item">
      <img src="@/assets/img/tabbar/tab_favor.png" alt="" />
      <div class="text">收藏</div>
    </div>
    <div class="tar-bar-item">
      <img src="@/assets/img/tabbar/tab_order.png" alt="" />
      <div class="text">订单</div>
    </div>
    <div class="tar-bar-item">
      <img src="@/assets/img/tabbar/tab_message.png" alt="" />
      <div class="text">消息</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.tar-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  .tar-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column; //设置主轴方向
    justify-content: center;
    align-items: center;
    img {
      width: 34px;
    }
  }
}
</style>
