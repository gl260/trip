<template>
  <div class="facility">
    <!-- facility:设施 -->
    <detail-content title="房屋设施" show-more="查看全部设施">
      <div class="house-facility">
        <template v-for="(item, index) in facilityData.houseFacilitys" :key="index">
          <!-- 需要根据接口中facilityData.facilitySort中来显示需要展示的数据 -->
          <!--  -->
          <div class="item" v-if="facilityData.facilitySort.includes(index)">
            <div class="head">
              <img :src="item.icon" alt="" />
              <div class="head-title">{{ item.groupName }}</div>
            </div>
            <div class="list">
              <template v-for="(iten, indey) in item.facilitys.slice(0, 4)" :key="indey">
                <div class="iten">
                  <img src="@/assets/img/detail/icon_check.png" alt="" />
                  <div class="text">{{ iten.name }}</div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </detail-content>
  </div>
</template>

<script setup>
import detailContent from "@/components/detail-content/detail-content.vue";
const props = defineProps({
  facilityData: {
    type: Object,
    default: () => ({}),
  },
});
// console.log(props.facilityData.houseFacilitys);
// console.log(props.facilityData.facilitySort);
</script>

<style lang="less" scoped>
.facility {
  .house-facility {
    margin-top: 9px;
    padding: 2px 0;
    background: #f7f9fb;
    border-radius: 6px;
    .item {
      display: flex;
      align-items: center;
      height: 42px;
      margin: 20px 0;
      .head {
        width: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
        }
        .head-title {
          font-size: 11px;
          color: #333;
          font-weight: 600;
          margin-top: 3px;
        }
      }
      .list {
        flex: 1;
        height: 42px;
        display: flex;
        flex-wrap: wrap;

        .iten {
          width: 50%;
          display: flex;
          align-items: center;
          img {
            width: 12px;
            height: 12px;
          }
          .text {
            margin-left: 4px;
            font-size: 11px;
            color: #333;
            line-height: 14px;
          }
        }
      }
    }
  }
}
</style>
