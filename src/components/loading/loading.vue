<template>
  <div class="loading" v-if="mainStore.isLoading">
    <div class="cover">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";

const mainStore = useMainStore();
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .cover {
    background: url("@/assets/img/home/loading-bg.png") 0 0 / 100% 100%;
    width: 104px;
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 11px;
    }
  }
}
</style>
