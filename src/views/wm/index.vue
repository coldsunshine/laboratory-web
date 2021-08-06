<template>
  <el-container>
    <el-header class="text-center">
      <h1 class="text-2xl mt-4">在线去水印</h1>
      <el-row class="my-2">
        <el-col>
          <div class="text-center">
            <span class="text-gray-300 text-xs">
              点击头像复制视频播放地址 | 点击图片预览其他图片
            </span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :md="2" :xs="0">&zwj;</el-col>
        <el-col :md="20" :xs="24">
          <!-- radio -->
          <el-row class="my-8">
            <el-radio-group
              v-for="p in supportPlatform"
              :key="p.bizCode"
              v-model="bizCode"
            >
              <el-radio
                class="inline-block mx-2"
                :label="p.bizCode"
                :disabled="!p.enable"
                >{{ p.label }}
              </el-radio>
            </el-radio-group>
          </el-row>
          <!-- input -->
          <el-row class="my-2">
            <el-col :xs="24" :sm="24">
              <el-input
                v-model="value"
                type="textarea"
                placeholder="粘贴分享链接到这里, 支持多个获取..."
                :autosize="{ minRows: 3, maxRows: 5 }"
                resize="none"
              ></el-input>
            </el-col>
          </el-row>
          <!--按钮-->
          <el-row class="my-2">
            <el-col>
              <div class="text-center my-4">
                <el-button
                  class="mx-auto"
                  type="primary"
                  size="mini"
                  @click="rmDouYinWaterMark()"
                  >确定
                </el-button>
              </div>
            </el-col>
          </el-row>

          <!-- view -->
          <el-row>
            <el-col>
              <DouYinRmWaterMarkView
                :data="transResult"
                :visible="douYinVisible"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>

    <el-footer></el-footer>
    <el-backtop></el-backtop>
  </el-container>
</template>

<script>
import { rmDouYinWaterMark } from "@/api/wm/watermark";
import DouYinRmWaterMarkView from "./vmView";

export default {
  name: "WaterMarkIndex",
  components: { DouYinRmWaterMarkView },
  data() {
    return {
      value: "",
      // value: "https://v.douyin.com/eT5ng2Y/\nhttps://v.douyin.com/eTfo1dV/ ",
      // value: "https://v.douyin.com/eTfo1dV/\nhttps://v.douyin.com/eTgrFLB/",
      bizCode: "douYinRmWaterMark",
      supportPlatform: [
        { label: "抖音", bizCode: "douYinRmWaterMark", enable: true },
        { label: "快手", bizCode: "kuaiShouRmWaterMark", enable: true }
      ],
      transResult: [],
      douYinVisible: false
    };
  },
  watch: {
    transResult: function() {
      this.douYinVisible = this.transResult.length > 0;
    }
  },
  created() {},
  methods: {
    rmDouYinWaterMark() {
      if (!this.value) {
        return;
      }

      let regx = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

      let links = this.value.match(regx);
      // let fmtLinks = [];
      // let isBreak = false;
      // links.forEach(l => {
      //   l = l.trim();
      //   let count = l.split("http").length - 1;
      //   if (count > 1) {
      //     isBreak = true;
      //     return;
      //   }
      //   if (l) {
      //     fmtLinks.push(l);
      //   }
      // });
      // if (isBreak) {
      //   this.$message.warning("输入格式错误");
      //   return;
      // }
      this.transResult = [];
      let param = { bizCode: this.bizCode, links: links };
      rmDouYinWaterMark(param)
        .then(resp => {
          this.transResult = resp.data;
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped></style>
