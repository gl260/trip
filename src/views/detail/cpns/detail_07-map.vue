<template>
  <div class="map">
    <detail-content title="位置周边" show-more="查看更多周边位置">
      <div class="map-container" ref="mapRef"></div>
    </detail-content>
  </div>
</template>

<script setup>
import detailContent from "@/components/detail-content/detail-content.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  mapData: {
    type: Object,
    default: () => ({}),
  },
});

const mapRef = ref();

onMounted(() => {
  const map = new BMapGL.Map(mapRef.value); // 创建地图实例
  const point = new BMapGL.Point(props.mapData.longitude, props.mapData.latitude); // 创建点坐标
  map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMapGL.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
});
</script>

<style lang="less" scoped>
.map {
  .map-container {
    height: 137px;
  }
}
</style>
