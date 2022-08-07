<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component" />
      </keep-alive>
    </router-view>
    <!-- name属性 -->
    <!-- <keep-alive include="home">
      <router-view></router-view>
    </keep-alive> -->
    <tar-bar v-if="!route.meta.currentShow" />
    <loading />
    <!-- <tar-bar /> -->
  </div>
</template>

<script setup>
import tarBar from "./components/tab-bar/tab-bar.vue";
import loading from "./components/loading/loading.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="less" scoped></style>
