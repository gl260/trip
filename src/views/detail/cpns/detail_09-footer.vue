<template>
  <div class="footer">
    <div class="footer-top" @click="showpopup">
      <img :src="guaranteeData.icon" alt="" />
      <i><img src="@/assets/img/detail/icon-bf-i.png" alt="" /></i>
    </div>
    <div class="footer-bottom">
      <div class="business-license">查看证照信息</div>
      <div class="info">民宿预订由旅途在线提供技术支持</div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '80%' }" round closeable>
      <div class="popup">
        <div class="popup-head">
          <img :src="guaranteeData.icon" alt="" />
        </div>
        <div class="popup-content">
          <template v-for="(item, index) in guaranteeData.titleTips" :key="item">
            <div class="item">
              <div class="title">{{ item.title }}</div>
              <div class="cont">{{ item.introduction }}</div>
            </div>
          </template>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  guaranteeData: {
    type: Object,
    default: () => ({}),
  },
});

const show = ref(false);
const showpopup = () => {
  show.value = true;
};
</script>

<style lang="less" scoped>
.footer {
  border-top: 5px solid #f2f3f4;
  background-color: #f2f3f4;
  .footer-top {
    padding: 20px 0;
    text-align: center;
    img {
      width: 123px;
      height: 17px;
    }
    i {
      img {
        width: 14px;
        height: 14px;
        margin: 1px 0 0 3px;
      }
    }
  }
  .footer-bottom {
    text-align: center;
    font-size: 12px;
    color: #7688a7;
    padding-bottom: 18px;
    .business-license {
      margin-top: 4px;
      font-weight: 500;
      margin-bottom: 9px;
    }
    .info {
      font-weight: 400;
    }
  }
  .popup {
    position: relative;
    .popup-head {
      padding: 15px 20px 14px 20px;
      img {
        width: 123px;
        height: 17px;
      }
    }
    .popup-content {
      .item {
        padding: 16px 20px;
        .title {
          font-size: 18px;
          color: #333;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .cont {
          font-size: 13px;
          color: #333;
          line-height: 21px;
          margin-top: 6px;
          white-space: pre-line; //连续的空白符会被保留。在遇到换行符或者<br>元素时才会换行
        }
      }
    }
  }
}
</style>
