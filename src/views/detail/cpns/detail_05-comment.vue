<template>
  <div class="comment">
    <detail-content title="房客点评" :show-more="allCommentFn()">
      <div class="comment-content">
        <div class="content-top">
          <div class="left">
            <div class="score">
              <span class="score-text">{{ commentData.overall }}</span>
              <div class="score-bottom"></div>
            </div>
            <div class="desc">
              <div class="text">{{ commentData.scoreTitle }}</div>
              <div class="count">{{ commentData.totalCountStr }}条评论</div>
              <div class="star">
                <van-rate v-model="customerScore" size="8px" color="#ff9854" readonly allow-half />
              </div>
            </div>
          </div>
          <div class="right">
            <template v-for="(item, index) in commentData.subScores">
              <div class="item">{{ item }}</div>
            </template>
          </div>
        </div>
        <div class="content-tags">
          <template v-for="(item, index) in commentData.commentTagVo" :key="index">
            <div class="tag">{{ item.text }}</div>
          </template>
        </div>
        <div class="content-body">
          <div class="body-top">
            <div class="left">
              <img :src="commentData?.comment?.userAvatars" alt="" />
              <div class="username">
                <div class="name">{{ commentData?.comment?.userName }}</div>
                <div class="date">{{ commentData?.comment?.checkInDate }}入住</div>
              </div>
            </div>
            <div class="right">
              <div class="score">{{ commentData?.comment?.overall }}</div>
              <van-rate v-model="usernameScore" size="7px" color="#ff9854" readonly allow-half />
            </div>
          </div>
          <div class="body-text .ellipsis-3">{{ commentData?.comment?.commentDetail }}</div>
        </div>
      </div>
    </detail-content>
  </div>
</template>

<script setup>
import detailContent from "@/components/detail-content/detail-content.vue";
import { ref } from "vue";
const props = defineProps({
  commentData: {
    type: Object,
    default: () => ({}),
  },
});

const allComment = ref(props.commentData.totalCountStr);
const allCommentFn = () => {
  return `查看全部${allComment.value}条评论`;
};

const customerScore = Number(props.commentData?.overall);
const usernameScore = Number(props.commentData?.comment?.overall);
</script>

<style lang="less" scoped>
.comment {
  .comment-content {
    .content-top {
      display: flex;
      justify-content: space-between;
      padding: 16px 0 13px;
      .left {
        display: flex;
        margin-top: 5px;
        .score {
          font-size: 50px;
          color: #333;
          font-weight: 600;
          position: relative;
          height: 100%;
          width: 65px;
          .score-text {
            width: 72px;
            // font-weight: 700;
            position: absolute;
            bottom: -6px;
            z-index: 10;
          }
          .score-bottom {
            width: 66px;
            height: 6px;
            background-image: var(--theme-linear-gradient);
            border-radius: 3px;
            position: absolute;
            bottom: 4px;
            z-index: 5;
          }
        }
        .desc {
          margin-left: 10px;
          font-size: 10px;
          color: #999;
          .text {
            font-size: 12px;
            font-weight: 500;
            color: #333;
            margin-bottom: 1px;
          }
        }
      }
      .right {
        max-width: 150px;
        max-height: 46px;
        display: flex;
        flex-wrap: wrap;
        .item {
          font-size: 12px;
          color: #999;
          margin-bottom: 4px;
        }
      }
    }
    .content-tags {
      max-height: 62px;
      margin: 3px 0 0;
      display: flex;
      flex-wrap: wrap;
      .tag {
        color: rgb(102, 102, 102);
        background: rgb(245, 245, 245);
        border-radius: 12px;
        font-size: 11px;
        padding: 0 8px;
        margin: 0 4px 4px 0;
        height: 18px;
        line-height: 19px;
      }
    }
    .content-body {
      background: #f7f9fb;
      border-radius: 6px;
      padding: 12px;
      margin-top: 8px;
      .body-top {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          font-size: 12px;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
          .username {
            margin: 3px 0 0 5px;

            .name {
              color: #333;
              font-weight: 600;
              margin-bottom: 3px;
            }
            .date {
              color: #999;
            }
          }
        }
        .right {
          position: relative;
          bottom: 3px;
          height: 32px;
          .score {
            position: relative;
            top: 6px;
            font-size: 18px;
            color: #333;
            font-weight: 600;
            text-align: right;
          }
        }
      }
      .body-text {
        font-size: 12px;
        color: #333;
        line-height: 16px;
        margin-top: 16px;
      }
    }
  }
}
</style>
