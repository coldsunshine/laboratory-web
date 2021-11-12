<template>
  <div>
    <el-row>
      <el-col :sm="6">&zwj;</el-col>
      <el-col :xs="24" :sm="12">
        <el-row>
          <el-col class="my-2 p-2 text-center">
            <TextScroll
              scroll-type="scroll-up"
              :play-time="2000"
              :data-list="brushStepLatest"
            />
          </el-col>
        </el-row>

        <el-row>
          <el-col class="p-2">
            <el-form label-width="60px">
              <el-form-item label="手机号">
                <el-input v-model="phone"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="步数">
                <el-input v-model="step" placeholder="默认: 18888"></el-input>
              </el-form-item>
              <el-form-item label="自动">
                <el-switch v-model="auto" active-color="#13ce66"></el-switch>
                <el-tooltip
                  class="mx-2 absolute top-1.5"
                  effect="dark"
                  content="将用户名密码保存到服务端，每小时自动刷新步数"
                  placement="top"
                >
                  <span class="text-lg"><i class="el-icon-question"></i></span>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="text-center m-2">
            <el-button type="primary" size="small" @click="miBrushStep()">
              刷步
            </el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="">
            <div
              class="my-4 mx-2 p-4 bg-gray-50 rounded-sm border-l-4 border-yellow-500 "
            >
              <div class="text-current text-sm">
                <p class="my-2 font-bold">食用方法</p>
                <ul class=" list-disc ml-4 text-gray-400">
                  <li>前提：安卓/IOS通用</li>
                  <li>
                    下载： 应用商店或App Store下载<span class="font-bold"
                      >小米运动</span
                    >APP
                  </li>
                  <li>
                    登录： 登录APP（这里<span class="text-red-500 font-bold"
                      >不要用第三方账号授权登录</span
                    >，直接<span class="text-green-500 font-bold"
                      >用手机号注册登录</span
                    >）
                  </li>
                  <li>绑定：第三方接入，绑定微信/支付宝即可</li>
                  <li>刷新：最后在本页面输入信息刷新步数</li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { miBrushStep, miBrushStepTopN } from "@/api/mi/step";
import TextScroll from "@/components/TextScroll";

export default {
  components: { TextScroll },
  data() {
    return {
      phone: "",
      password: "",
      step: "",
      auto: false,
      brushStepLatest: []
    };
  },
  watch: {},
  created() {
    this.phone = localStorage.getItem("lab.mi.step.phone");
    this.password = localStorage.getItem("lab.mi.step.password");
    this.step = localStorage.getItem("lab.mi.step.step");
    this.auto = "true" == localStorage.getItem("lab.mi.step.auto");

    this.miBrushStepTopN();
    setInterval(() => {
      this.miBrushStepTopN();
    }, 3000);
  },
  methods: {
    miBrushStep() {
      let params = {
        phone: this.phone,
        password: this.password,
        step: this.step,
        auto: this.auto
      };
      console.log(params);
      miBrushStep(params)
        .then(resp => {
          this.$message.success(resp.msg);
          localStorage.setItem("lab.mi.step.phone", this.phone);
          localStorage.setItem("lab.mi.step.password", this.password);
          localStorage.setItem("lab.mi.step.step", this.step);
          localStorage.setItem("lab.mi.step.auto", this.auto);
        })
        .catch(err => {
          console.log(err);
        });
    },
    miBrushStepTopN() {
      miBrushStepTopN().then(resp => {
        this.brushStepLatest = resp.data;
        this.brushStepLatest.forEach(function(item) {
          item.content =
            item.startTime + " " + item.content + "(" + item.location + ")";
        });
      });
    }
  }
};
</script>

<style scoped></style>
