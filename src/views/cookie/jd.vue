<template>
  <div class="more-container">
    <el-row class="row-space">
      <el-col>
        <el-form label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-form>
        <div class="text-center"></div>
        <div class="text-center row-space">
          <el-button type="primary" size="small" @click="sendSms()">
            发送验证码
          </el-button>
          <el-button type="primary" size="small" @click="login()">
            登陆
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-space">
      <el-col>
        <el-input
          v-if="jdInfo.cookie"
          v-model="jdInfo.cookie"
          type="textarea"
          rows="5"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sendSms, login } from "@/api/jd/jd.js";

export default {
  data() {
    return {
      form: {
        mobile: "",
        code: ""
      },
      jdInfo: {
        cookie: ""
      },
      cookieVisible: false
    };
  },
  methods: {
    sendSms() {
      this.cookieVisible = false;
      sendSms(this.form.mobile)
        .then(resp => {
          this.$message.success(resp.msg);
        })
        .catch(() => {});
    },
    login() {
      login(this.form).then(resp => {
        this.jdInfo.cookie = resp.data.cookie;
      });
    }
  }
};
</script>

<style>
.row-space {
  margin: 10px 0;
}
</style>
