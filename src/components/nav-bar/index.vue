<template>
  <div class="nav-bar">
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #left>
        <slot name="left">
          <div class="left" @click="leftClick">
            <img src="@/assets/img/common/icon_nav_back.png" alt="" />
          </div>
        </slot>
      </template>
      <template #title>
        <slot name="title">
          <div class="title">默认内容</div>
        </slot>
      </template>
      <template #right>
        <slot name="right">
          <div class="right" @click="popupShow = true">
            <img src="@/assets/img/home/icon-right-menu.png" alt="" />
          </div>
        </slot>
      </template>
    </van-nav-bar>

    <van-popup
      v-model:show="popupShow"
      position="right"
      closeable
      :style="{ width: '55%', height: '100%' }"
    >
      <div class="popup-content">
        <div class="item homePage">
          <img src="@/assets/img/popup/homePage.png" alt="" />
          <span>首页</span>
        </div>
        <van-divider />
        <div class="item login-registration">
          <img src="@/assets/img/popup/login-registration.png" alt="" />
          <span>登录/注册</span>
        </div>
        <van-divider />
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const onClickLeft = () => {
  router.back();
};

const popupShow = ref(false);
</script>

<style lang="less" scoped>
.nav-bar {
  .left {
    display: flex;
    justify-content: center;
    img {
      width: 8px;
      height: 15px;
    }
  }
  .right {
    display: flex;
    justify-content: center;
    img {
      width: 20px;
      height: 15px;
    }
  }
}
:deep(.van-nav-bar__title) {
  max-width: 73%;
}
.popup-content {
  padding: 45px 20px 45px 45px;
  img {
    width: 16px;
    height: 16px;
    margin-top: 9px;
  }
  span {
    margin-left: 20px;
    color: #333;
  }
  .item {
    width: 130px;
    height: 36px;
    margin-bottom: 10px;
    line-height: 36px;
  }
}
</style>
