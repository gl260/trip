<template>
  <div class="landlord">
    <!-- landlord:房东 -->
    <detail-content title="房东介绍" show-more="查看房东主页">
      <div class="intro">
        <div class="top">
          <img :src="landlordData.topScroll" alt="" />
        </div>
        <div class="contact">
          <div class="landlord-img">
            <img :src="landlordData.hotelLogo" alt="" />
          </div>
          <div class="landlord-info">
            <div class="name">{{ landlordData.hotelName }}</div>
            <div class="tags ellipsis-1">
              <template v-for="(item, index) in landlordData.hotelTags" :key="index">
                <div class="tag-item">{{ item?.tagText?.text }}</div>
              </template>
            </div>
          </div>
          <div class="btn">联系房东</div>
        </div>
        <div class="comment">
          <template v-for="(iten, indey) in landlordData.hotelSummary" :key="indey">
            <div class="item">
              <div class="rate">{{ iten.title }}</div>
              <div class="percentage">{{ iten.introduction }}</div>
              <div class="desc">{{ iten.tip }}</div>
            </div>
          </template>
        </div>
      </div>
    </detail-content>
  </div>
</template>

<script setup>
import detailContent from "@/components/detail-content/detail-content.vue";
defineProps({
  landlordData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="less" scoped>
.landlord {
  .intro {
    .top {
      margin-top: 12px;
      img {
        width: 100%;
        border-radius: 4px;
      }
    }
    .contact {
      padding: 16px 0;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .landlord-img {
        border: 1px solid #eee;
        background: #f3f3f3;
        border-radius: 50%;
        width: 54px;
        height: 54px;
        img {
          width: 54px;
          height: 54px;
          border-radius: 50%;
        }
      }
      .landlord-info {
        flex: 1;
        margin-left: 8px;
        .name {
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
        .tags {
          display: flex;
          font-size: 10px;
          color: rgb(155, 155, 155);
          .tag-item {
            &:nth-child(n + 2)::before {
              content: "|";
              margin: 0 3px;
            }
          }
        }
      }
      .btn {
        width: 48px;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        background-image: var(--theme-linear-gradient);
        border-radius: 4px;
        color: #fff;
        text-align: center;
        font-size: 12px;
      }
    }
    .comment {
      display: flex;
      justify-content: space-around;
      padding: 22px 0 12px 0;
      border-bottom: 0.5px solid #eee;
      .item {
        .rate {
          font-size: 10px;
          color: #999;
        }
        .percentage {
          font-size: 18px;
          color: #333;
          font-weight: 600;
          margin: 4px 0 2px;
        }
        .desc {
          font-size: 11px;
          color: #666;
        }
      }
    }
  }
}
</style>
