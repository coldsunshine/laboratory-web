<template>
  <div>
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
        <div class="my-2">
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

    <el-row class="row-space">
      <el-col>
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

<style></style>
