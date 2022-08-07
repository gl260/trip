<template>
  <div class="detail top-page">
    <nav-bar>
      <template #title>房屋详情</template>
    </nav-bar>

    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <van-tabs v-model:active="active" scrollspy sticky>
        <van-tab title="描述">
          <detail-info :info-data="mainPart.topModule" />
        </van-tab>
        <van-tab title="设置">
          <detail-facility :facility-data="mainPart.dynamicModule.facilityModule.houseFacility" />
        </van-tab>
        <van-tab title="房东">
          <detail-landlord name="房东" :landlord-data="mainPart.dynamicModule.landlordModule" />
        </van-tab>
        <van-tab title="评论">
          <detail-comment name="评论" :comment-data="mainPart.dynamicModule.commentModule" />
        </van-tab>
        <van-tab title="须知">
          <detail-notice name="" :notice-data="mainPart.dynamicModule.rulesModule" />
        </van-tab>
        <van-tab title="周边">
          <detail-map name="周边" :map-data="mainPart.dynamicModule.positionModule" />
        </van-tab>
      </van-tabs>
      <detail-pricedesc :pricedesc-data="mainPart.introductionModule" />
      <detail-footer :guarantee-data="mainPart.ensureModule" />
    </div>
  </div>
</template>

<script setup>
import useDetailStore from "@/stores/modules/detail";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

import NavBar from "@/components/nav-bar/index.vue";

import detailSwipe from "./cpns/detail_01-swipe.vue";
import detailInfo from "./cpns/detail_02-info.vue";
import detailFacility from "./cpns/detail_03-facility.vue";
import detailLandlord from "./cpns/detail_04-landlord.vue";
import detailComment from "./cpns/detail_05-comment.vue";
import detailNotice from "./cpns/detail_06-notice.vue";
import detailMap from "./cpns/detail_07-map.vue";
import detailPricedesc from "./cpns/detail_08-pricedesc.vue";
import detailFooter from "./cpns/detail_09-footer.vue";
import TabBar from "@/components/tab-bar/tab-bar.vue";

/**
 * route: 路线      useRoute: 返回当前路由地址 相当于在模板中使用 $route
 * router: 路由器   useRouter: 返回 router 实例。
 */

const route = useRoute();
const houseId = route.params.id;
// console.log(houseId);
// 发送网络请求请求数据
const DetailStore = useDetailStore();
DetailStore.fetchdetailData(houseId);

const { detailInfos } = storeToRefs(DetailStore);
const mainPart = computed(() => detailInfos.value.mainPart);

const active = ref(0);
</script>

<style lang="less" scoped>
.detail {
  --van-tab-active-text-color: var(--primary-color);
  --van-tabs-bottom-bar-color: var(--primary-color);
}
</style>
