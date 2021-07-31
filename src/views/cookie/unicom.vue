<template>
  <div class="more-container">
    <el-row class="row-space">
      <el-col>
        <el-form label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="mobile"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="smsCode">
              <el-button v-if="timeCounter > 0" slot="append">{{
                timeCounter
              }}</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="text-center"></div>
        <div class="text-center row-space">
          <el-button
            :disabled="!btnEnabled.sendRandomNum"
            type="primary"
            size="small"
            @click="sendRandomNum"
          >
            发送验证码
          </el-button>
          <el-button
            :disabled="!btnEnabled.randomLogin"
            type="primary"
            size="small"
            :loading="btnLoading.randomLogin"
            @click="randomLogin"
          >
            登陆
          </el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="row-space">
      <el-col>
        <el-input
          v-if="cookieStr"
          v-model="cookieStr"
          type="textarea"
          rows="5"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sendRandomNum, randomLogin } from "@/api/unicom/unicom.js";

export default {
  data() {
    return {
      mobile: "",
      smsCode: "",
      imgId: "",
      imgCode: "",
      timeCounter: 0,
      cookieStr: "",
      btnEnabled: {
        sendRandomNum: true,
        randomLogin: true
      },
      btnLoading: {
        randomLogin: false
      },
      dynamicWith: "500px"
    };
  },
  created() {
    this.setDynamicWith();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDynamicWith();
      })();
    };
  },
  methods: {
    sendRandomNum() {
      let params = {};
      params.bizCode = "ChinaUnicomHandler";
      params.mobile = this.mobile;
      this.cookieStr = "";
      sendRandomNum(params)
        .then(resp => {
          if (resp == undefined) {
            return;
          }
          this.timeCounter = 60;
          this.btnEnabled.sendRandomNum = false;
          let counter = setInterval(() => {
            this.timeCounter--;
            if (this.timeCounter <= 0) {
              this.btnEnabled.sendRandomNum = true;
              clearInterval(counter);
            }
          }, 1000);
        })
        .catch(err => {
          this.btnEnabled.sendRandomNum = true;
          this.timeCounter = 0;
          console.log(err);
        });
    },
    randomLogin() {
      let params = {};
      params.bizCode = "ChinaUnicomHandler";
      params.mobile = this.mobile;
      params.password = this.smsCode;
      this.btnLoading.randomLogin = true;
      randomLogin(params)
        .then(resp => {
          this.btnLoading.randomLogin = false;
          this.timeCounter = 0;
          this.btnEnabled.sendRandomNum = true;
          this.cookieStr = resp.data.cookieStr;
        })
        .catch(err => {
          this.cookieStr = "";
          this.btnEnabled.sendRandomNum = true;
          this.btnLoading.randomLogin = false;
          this.timeCounter = 0;
          console.log(err);
        });
    },
    setDynamicWith() {
      let val = document.body.clientWidth;
      const def = 600; // 默认宽度
      if (val < def) {
        this.dynamicWith = "90%";
      } else {
        this.dynamicWith = def + "px";
      }
    }
  }
};
</script>

<style>
.row-space {
  margin: 10px 0;
}

.text-center {
  text-align: center;
}
</style>
