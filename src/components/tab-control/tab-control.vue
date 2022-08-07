<template>
  <div id="content">
    <template v-for="(item, index) in tab" :key="item">
      <div class="tab-item">
        <span :class="{ active: index === currentIndex }" @click="activeBtn(index)">{{
          item
        }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    activeBtn(index) {
      // console.log(index);
      this.currentIndex = index;
      this.$emit("clickTabBtn", index);
    },
    setCurrentIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
#content {
  display: flex;
  height: 44px;
  line-height: 44px;
  background: #fff;
}
#content .tab-item {
  flex: 1;
  text-align: center;
  overflow: hidden;
}
#content .tab-item span.active {
  padding: 5px;
  color: var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
}
</style>
