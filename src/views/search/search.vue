<template>
  <div class="search">
    <sh-navbar />
    <sh-dropdown :search-data="shTopData" />

    <h2>开始时间: {{ $route.query.startDate }}</h2>
    <h2>结束时间: {{ $route.query.endDate }}</h2>
    <h2>当前城市: {{ $route.query.currentCity }}</h2>
  </div>
</template>

<script setup>
import useSearchStore from "@/stores/modules/search";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import shNavbar from "./cpns/sh_01-navbar.vue";
import shDropdown from "./cpns/sh_02-dropdown.vue";

const searchStore = useSearchStore();
searchStore.fetchSearchData();
const { searchTop } = storeToRefs(searchStore);
const shTopData = computed(() => searchTop.value.data);
</script>

<style lang="less" scoped>
.search {
}
</style>
