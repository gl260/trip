<template>
  <div class="home" ref="homeRef">
    <div class="nav-bar">
      <div class="title">旅途民宿</div>
    </div>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
    <div class="search-bar" v-if="isShowSearchBar"><search-bar /></div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<script setup>
import useHomeStore from "@/stores/modules/home";

import homeSearchBox from "./cpns/home-search-box.vue";
import homeCategories from "./cpns/home-categories.vue";
import homeContent from "./cpns/home-context.vue";
import searchBar from "@/components/search-bar/search-bar.vue";
import { computed, onActivated, onMounted, onUnmounted, ref, watch } from "vue";

import useScroll from "@/hooks/useScroll";

// 发送网络请求
const homeStore = useHomeStore();
homeStore.fetchHotSugger();
homeStore.fetchCategories();
// const currentPage = ref(1); //获取下一页数据方式一: 不推荐,最好是写在store中
// homeStore.fetchHouseList(currentPage.value);
homeStore.fetchHouseList();

// house列表加载更多
// const next = () => {
//   // homeStore.fetchHouseList(currentPage.value);
//   homeStore.fetchHouseList();
// };

// 监听window窗口滚动
// 1.当离开页面时, 我们移除监听 2.最好封装到hooks中
// const scrollListener = () => {
//   const clientHeight = document.documentElement.clientHeight; // 屏幕可视区高度
//   const scrollTop = document.documentElement.scrollTop; // 向上滚动的距离 ,因为这里有小数,可能取不到对应的值,所以需要+1
//   const scrollHeight = document.documentElement.scrollHeight; // 当前页面可以滚动的高度
//   console.log(clientHeight, scrollTop, scrollHeight);
//   if (scrollHeight <= clientHeight + scrollTop + 1) {
//     console.log("移动到最底部了"); // 移动到最底部时,开始加载下一页的数据
//     homeStore.fetchHouseList();
//   }
// };
// onMounted(() => {
//   window.addEventListener("scroll", scrollListener);
// });
// onUnmounted(() => {
//   window.removeEventListener("scroll", scrollListener);
// });
// 封装方式一:回调函数方式
// useScroll(() => {
//   homeStore.fetchHouseList();
// });

// 封装方式二:侦听器方式
const homeRef = ref();
const { isScrollButtom, scrollTop } = useScroll(homeRef);
watch(isScrollButtom, (newValue) => {
  if (newValue) {
    // homeStore.fetchHouseList();
    // isScrollButtom.value = false; //也可以
    homeStore.fetchHouseList().then(() => {
      isScrollButtom.value = false; // 这里是等数据加载玩之后 再设置为false,更加严谨
    });
  }
});

// 所搜框显示控制: 下拉到一定位置之后显示搜索框
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 500;
});

// 跳转回home页面时,保留scrollTop的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value,
  });
});
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
  background-color: #f5f7f9;
}
.nav-bar {
  border-bottom: 1px solid #f3f3f3;
  .title {
    height: 46px;
    color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
