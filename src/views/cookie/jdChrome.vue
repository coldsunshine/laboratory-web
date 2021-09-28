<template>
  <div>
    <el-row>
      <el-col>
        <div class="warning">
          <el-steps direction="vertical">
            <el-step
              title="输入手机号获取验证码"
              description="这个步骤很长, 需要利用自动化测试工具模拟打开浏览器并输入手机号等模拟人的操作来获取, 耐心等待获取验证码接口按钮加载即可, 可能10s左右"
            ></el-step>
            <el-step
              title="输入验证码并登录"
              description="这里务必输入正确的验证码, 因为并没有测试所有的异常情况。"
            ></el-step>
            <el-step title="获取CK" description="点击复制ck按钮即可"></el-step>
          </el-steps>

          <div class="mt-2 text-yellow-500 subpixel-antialiased text-sm">
            <span>注意</span>
            <ul class="list-disc ml-4">
              <li>
                为了减少后台session的个数, 整个流程必须要在120s(2分钟)内完成.
              </li>
              <li>
                中途如果出现任何你认为奇奇怪怪的问题, 请清除session缓存,
                重新来过.
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="4" :xs="0">&zwj;</el-col>
      <el-col :md="16" :xs="24">
        <el-input
          v-model="phone"
          class="my-2"
          placeholder="请输入手机号"
        ></el-input>
        <el-input
          v-model="smsCode"
          class="my-2"
          placeholder="验证码"
        ></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div class="my-2 text-center">
          <el-button
            type="primary"
            size="small"
            :loading="btnLoading.sendSms"
            :disabled="!phone || !new RegExp('\\d{11}').test(phone)"
            @click="chromeSendSmsCode()"
            >获取验证码
          </el-button>
          <el-button
            type="primary"
            size="small"
            :loading="btnLoading.login"
            :disabled="
              !(
                phone &&
                new RegExp('\\d{11}').test(phone) &&
                new RegExp('\\d{4,6}').test(smsCode)
              )
            "
            @click="chromeLogin()"
            >登录
          </el-button>
          <el-button type="warning" size="small" @click="clearSession()"
            >清除session
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col class="text-center">
        <el-input v-if="ck" v-model="ck" type="textarea" rows="3" />
        <el-button
          v-if="ck"
          class="mt-2"
          type="success"
          size="small"
          @click="copy(ck)"
          >复制ck
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { chromeSendSmsCode, chromeLogin } from "@/api/jd/jd.js";
import { handleClipboard } from "@/utils/clipboard";

export default {
  data() {
    return {
      phone: "",
      smsCode: "",
      ck: "",
      jdChromeSid: "",
      btnLoading: { sendSms: false, login: false, clearSession: false }
    };
  },
  methods: {
    chromeSendSmsCode() {
      let sid = localStorage.getItem("jd-chrome-sid");
      let param = { sid: sid, phone: this.phone };
      this.btnLoading.sendSms = true;
      chromeSendSmsCode(param)
        .then(resp => {
          let data = resp.data;
          let sid = data.sessionId;
          localStorage.setItem("jd-chrome-sid", sid);
        })
        .finally(() => {
          {
            this.btnLoading.sendSms = false;
          }
        });
    },

    chromeLogin() {
      let sid = localStorage.getItem("jd-chrome-sid");
      let param = { code: this.smsCode, mock: false };
      chromeLogin(sid, param).then(resp => {
        this.ck = resp.data.ck;
      });
    },

    clearSession() {
      localStorage.removeItem("jd-chrome-sid");
    },

    copy(value) {
      if (!value) {
        return;
      }
      handleClipboard(
        value,
        event,
        () => {
          this.$message.success("复制成功");
        },
        () => {
          this.$message.error(this.$t("复制失败"));
        }
      );
    }
  }
};
</script>

<style>
.warning {
  padding: 8px 16px;
  background-color: #fff6f7;
  border-radius: 4px;
  border-left: 5px solid #e6a23c;
  margin: 20px 0;
}
</style>
