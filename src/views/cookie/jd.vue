<template>
  <div class="more-container">
    <el-row class="row-space">
      <el-col>
        <el-button type="primary" size="small" @click="generateQrCode()"
          >生成二维码
        </el-button>
      </el-col>
    </el-row>

    <el-row class="row-space">
      <el-col>
        <el-image
          v-if="jdInfo.qrCodeBase64"
          style="width: 300px; height: 300px"
          :src="'data:image/png;base64,' + jdInfo.qrCodeBase64"
          fit="fit"
        />
      </el-col>
    </el-row>

    <el-row class="row-space">
      <el-col>
        <el-input
          v-if="cookieVisible"
          v-model="jdInfo.cookie"
          type="textarea"
          rows="3"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { qrCode, check } from "@/api/jd/jd.js";

export default {
  data() {
    return {
      jdInfo: {},
      cookieVisible: false,
      checkInterval: ""
    };
  },
  methods: {
    generateQrCode() {
      clearInterval(this.checkInterval);
      this.cookieVisible = false;
      qrCode()
        .then(resp => {
          this.jdInfo = resp.data;
          this.$message.success(resp.msg);
          this.check();
        })
        .catch(() => {
          clearInterval(this.checkInterval);
        });
    },
    check() {
      this.checkInterval = setInterval(() => {
        check(this.jdInfo).then(resp => {
          let code = resp.code;
          if (code == 0) {
            clearInterval(this.checkInterval);
            this.jdInfo = resp.data;
            this.cookieVisible = true;
          }
        });
      }, 3000);
    }
  }
};
</script>

<style>
.row-space {
  margin: 10px 0;
}
</style>
