<template>
  <div class="login">
    <div class="login-tel">
      <h2 class="title">登录旅途</h2>
      <p class="desc">新用户登录即自动注册途家账号</p>
      <!-- 手机号 -->
      <div class="input-tel">
        <div class="tel-prefix">
          <div class="plus">+</div>
          <div class="code">86</div>
        </div>
        <div class="tel-number">
          <input type="tel" placeholder="输入手机号" maxlength="11" v-model="tel" />
          <i class="cancel" @click="cancelTelBtn" v-show="showCancelBtn"></i>
        </div>
      </div>
      <!-- 验证码 -->
      <div class="input-verify">
        <div class="verify-number">
          <input type="tel" placeholder="请输入验证码" maxlength="4" v-model="verify" />
          <i class="cancel" @click="cancelVerifyBtn" v-show="showCancelVerifyBtn"></i>
        </div>
        <div class="verify-btn">
          <div ref="verifyBtnRef" class="box" style="background: #dadada">获取验证码</div>
        </div>
      </div>
      <!-- 登录按钮 -->
      <button ref="loginBtnRef" class="login-register" style="background: #dadada">
        登录/注册
      </button>
    </div>
    <div class="login-agreement">
      <van-checkbox v-model="agree" icon-size="16px" checked-color="#ff9854">
        已阅读并同意《旅途网服务协议》和《隐私政策》
      </van-checkbox>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

// 1.cancel按钮逻辑
const showCancelBtn = ref(false);
const showCancelVerifyBtn = ref(false);

const tel = ref(""); // 手机号
const verify = ref(""); //验证码
const verifyBtnRef = ref(); // 获取验证码按钮(DOM)
const loginBtnRef = ref(); //获取登录按钮(DOM)

const agree = ref(false);

watch(tel, () => {
  showCancel(tel, showCancelBtn);
  if (tel.value.length === 11) {
    verifyBtnRef.value.style.background = "linear-gradient(90deg,#fa8c1d,#fcaf3f)";
  } else {
    verifyBtnRef.value.style.background = "#dadada";
  }
});
const cancelTelBtn = () => {
  tel.value = "";
};
watch(verify, () => {
  showCancel(verify, showCancelVerifyBtn);
  if (tel.value.length === 11 && verify.value.length === 4) {
    loginBtnRef.value.style.background = "linear-gradient(90deg,#fa8c1d,#fcaf3f)";
  } else {
    loginBtnRef.value.style.background = "#dadada";
  }
});
const cancelVerifyBtn = () => {
  verify.value = "";
};

const showCancel = (bo, showBtn) => {
  if (bo.value.length >= 1) {
    showBtn.value = true;
  } else if (bo.value === "") {
    showBtn.value = false;
  }
};

// 2.获取验证码逻辑 - 默认灰色 输入完手机号变为彩色
</script>

<style lang="less" scoped>
.login {
  position: relative;
  padding: 40px 20px 0;
  background: #fff;
  min-height: 480px;
  height: 100vh;
  .login-tel {
    .title {
      position: relative;
      font-size: 32px;
      color: #333;
      font-weight: 400;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: -20px;
        width: 4px;
        height: 32px;
        background: #fd8238;
        box-shadow: 0 2px 18px 0 #fd8238;
      }
    }
    .desc {
      margin-top: 10px;
      color: #999;
      letter-spacing: 0;
      line-height: 14px;
    }
    .input-tel {
      // position: relative;
      border-bottom: 3 solid #e9e9e988;
      margin-top: 30px;
      height: 44px;
      display: flex;
      border-bottom: 0.5px solid #e9e9e988;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   left: 0;
      //   bottom: 0;
      //   border-bottom: 3px solid #e9e9e988;
      // }
      .tel-prefix {
        position: relative;
        margin-right: 20px;
        height: 44px;
        font-size: 20px;
        display: flex;
        &::after {
          content: "";
          position: absolute;
          bottom: 11px;
          right: -7px;
          border: 4px solid rgba(0, 0, 0, 0);
          border-bottom: 4px solid #666;
          width: 0;
          height: 0;
          transform: rotate(135deg);
        }
        .plus {
          line-height: 42px;
          margin-right: 2px;
        }
        .code {
          line-height: 44px;
          margin-right: 7px;
        }
      }
      .tel-number {
        position: relative;
        flex: 1;
      }
    }
    input {
      background: #fff;
      caret-color: #fd8238;
      color: #333;
      border: 0;
      font-size: 20px;
      width: 214px;
      height: 42px;
    }
    .cancel {
      display: inline-block;
      background: url(@/assets/img/login/login_cancel.png);
      background-size: 50px 42.5px;
      background-position: -18.5px -26px;
      width: 16px;
      height: 16px;
    }
    .input-verify {
      margin-top: 10px;
      height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid #e9e9e988;
      .verify-number {
        flex: 1;
        height: 44px;
        input {
          width: 198px;
        }
      }
      .verify-btn {
        .box {
          height: 30px;
          width: 100px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
          font-size: 14px;
          // background: #dadada;
          // background: var(--theme-linear-gradient);
          color: #fff;
        }
      }
    }
    .login-register {
      margin: 40px 0 0 0;
      width: 100%;
      border: 0;
      border-radius: 5px;
      font-size: 18px;
      height: 48px;
      color: #fff;
    }
  }

  .login-agreement {
    display: flex;
    justify-content: center;
    align-items: center;
    .van-checkbox {
      position: absolute;
      bottom: 160px;
    }
  }
}

// 修改按钮样式
:deep(.van-button--small) {
  height: 30px;
  width: 100px;
  font-size: 14px;
}

:deep(.van-checkbox__label) {
  color: #999;
  font-size: 12px;
}
</style>
