import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

// 封装方式一:回调函数方式
// export default function useScroll(scrollListenerCB) {
//   const scrollListener = () => {
//     const clientHeight = document.documentElement.clientHeight; // 屏幕可视区高度
//     const scrollTop = document.documentElement.scrollTop; // 向上滚动的距离 ,因为这里有小数,可能取不到对应的值,所以需要+1
//     const scrollHeight = document.documentElement.scrollHeight; // 当前页面可以滚动的高度
//     if (scrollHeight <= clientHeight + scrollTop + 1) {
//       console.log("移动到最底部了"); // 移动到最底部时,开始加载下一页的数据
//       // homeStore.fetchHouseList();
//       if (scrollListenerCB) scrollListenerCB();
//     }
//   };
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListener);
//   });
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListener);
//   });
// }

// 封装方式二:侦听器方式
export default function useScroll(elRef) {
  let el = window;

  const isScrollButtom = ref(false); // watch要监听这个值,当到达底部时,变为true watch就可以侦听到值的改变,从而发送网络请求

  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  // 节流
  const scrollListener = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight; // 屏幕可视区高度
      scrollTop.value = document.documentElement.scrollTop; // 向上滚动的距离 ,因为这里有小数,可能取不到对应的值,所以需要+1
      scrollHeight.value = document.documentElement.scrollHeight; // 当前页面可以滚动的高度
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    // console.log("移动了", scrollTop.value);
    if (scrollHeight.value <= clientHeight.value + scrollTop.value + 1) {
      // console.log("移动到最底部了"); // 移动到最底部时,开始加载下一页的数据
      isScrollButtom.value = true;
    }
  }, 200);
  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListener);
  });
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListener);
  });
  return { isScrollButtom, clientHeight, scrollTop, scrollHeight };
}
