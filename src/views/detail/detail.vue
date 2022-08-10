<template>
  <div class="detail top-page" ref="detailRef">
    <nav-bar>
      <template #title>房屋详情</template>
    </nav-bar>

    <transition name="control">
      <tab-Control
        class="tab-control"
        :tab="names"
        v-if="showtabControl()"
        @clickTabBtn="tabClick"
        ref="conteolRef"
      ></tab-Control>
    </transition>

    <!-- 当scrollTop在变化时,showtabControl有可能会发生变化,会导致这里的组件会发生刷新 -->
    <!-- v-memo="[mainPart]" 当mainPart发生变化时,内部才会发生刷新 -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <!-- 
        当我们传递给一个组件某个属性,但是该属性并没有定义对应的props或者emits时,就称之为非Prop的Attribute
        这里的name属性: -> 非Prop的Attribute :当组件有跟节点时,非Prop的Attribute将自动添加到根节点的Attribute中
        然后通过getSectionRef.value.$el获取到组件的根元素
        :ref="" 动态绑定时可以将 ref 定义为回调函数，显式地传递元素或组件实例
       -->
      <detail-info name="描述" :ref="getSectionRef" :info-data="mainPart.topModule" />
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :facility-data="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord-data="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment-data="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :notice-data="mainPart.dynamicModule.rulesModule"
      />
      <detail-map
        name="周边"
        :ref="getSectionRef"
        :map-data="mainPart.dynamicModule.positionModule"
      />

      <detail-pricedesc :pricedesc-data="mainPart.introductionModule" />
      <detail-footer :guarantee-data="mainPart.ensureModule" />
      <detail-bprice :bprice-data="detailInfos.pricePart.priceModule.product" />
    </div>
  </div>
</template>

<script setup>
import useDetailStore from "@/stores/modules/detail";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import useScroll from "@/hooks/useScroll";

import NavBar from "@/components/nav-bar/index.vue";
import tabControl from "@/components/tab-control/tab-control.vue";

import detailSwipe from "./cpns/detail_01-swipe.vue";
import detailInfo from "./cpns/detail_02-info.vue";
import detailFacility from "./cpns/detail_03-facility.vue";
import detailLandlord from "./cpns/detail_04-landlord.vue";
import detailComment from "./cpns/detail_05-comment.vue";
import detailNotice from "./cpns/detail_06-notice.vue";
import detailMap from "./cpns/detail_07-map.vue";
import detailPricedesc from "./cpns/detail_08-pricedesc.vue";
import detailFooter from "./cpns/detail_09-footer.vue";
import detailBprice from "./cpns/detail_10-bprice.vue";

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

// tab-control 下拉300px显示出来
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const showtabControl = () => {
  return scrollTop.value >= 300;
};

// 在组件中 动态的 :ref引入元素:用法

// { "描述": el, "设施": el, .. } -- 或者const sectionEls = [],这种方式简单些
const sectionEls = ref({});
const names = computed(() => {
  return Object.keys(sectionEls.value); //获取sectionEls.value这个对象的key
});
const getSectionRef = (value) => {
  if (!value) return; //当离开页面时,这个detail组件会被卸载掉,value就没有值了,导致下面代码报错,所以没有值时,直接return掉
  // getAttribute() 返回元素上一个指定的属性值
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el; // name作为key,元素作为值
};

let isClick = false;
let currentDistance = null;
const tabClick = (index) => {
  // console.log(index); // index是tab-control组件传过来的值
  const key = Object.keys(sectionEls.value)[index]; //获取对应的key
  const el = sectionEls.value[key]; // 通过key获取值,也就是对应的DOM对象
  let distance = el.offsetTop - 44; // offsetTop : 返回当前元素相对于其 offsetParent 元素的顶部内边距的距离。
  if (index === 0) {
    distance = 0;
  }

  isClick = true;
  currentDistance = distance;

  // Element.scrollTop:获取或设置一个元素的内容垂直滚动的像素数
  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth", //让滚动有平滑的效果
  });
};

// 滚动页面时,匹配对应的tabControl的index
// 1.监听滚动的位置scrollTop
// 2.利用scrollTop匹配正确的位置
// [描述300,设施400,房东600,评论900,须知1100,周边1400]
// [300,400,600,900,1100,1400]
// 滚动到500时,在400和600之间,显示到设施400处
const conteolRef = ref();

watch(scrollTop, (newValue) => {
  // console.log(Math.round(newValue), currentDistance);
  if (Math.round(newValue) === currentDistance) {
    isClick = false;
  }
  // console.log(isClick);
  if (isClick) return;
  // 1.获取到每个元素对应的offsetTop
  const els = Object.values(sectionEls.value);
  const elOffsetTop = els.map((el) => el.offsetTop); // console.log(elOffsetTop); //[296, 536, 857, 1177, 1550, 1969]
  // 2.根据newValue匹配对应的索引
  let index = elOffsetTop.length - 1;
  for (let i = 0; i < elOffsetTop.length; i++) {
    if (Math.round(newValue) + 44 < elOffsetTop[i]) {
      index = i - 1;
      break;
    }
  }
  // console.log(index);
  conteolRef.value?.setCurrentIndex(index); //待优化:当currentIndex===index时不用变化
});

// scrollTop --> 显示小数太坑了 ,可以使用Math.round(scrollTop),四舍五入
</script>

<style lang="less" scoped>
.detail {
  margin-bottom: 60px;
  .tab-control {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
}

.control-enter-active {
  animation: control-h 0.3s ease;
}
@keyframes control-h {
  0% {
    height: 0;
  }
  100% {
    height: 44px;
  }
}
</style>
