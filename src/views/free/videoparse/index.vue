<template>
  <el-container>
    <el-header class="text-center">
      <h1 class="text-2xl mt-4">视频解析</h1>
    </el-header>
    <el-main>
      <el-row>
        <el-col :md="4" :xs="0">&zwj;</el-col>
        <el-col :md="16" :xs="24">
          <!-- 视频地址 -->
          <el-row class="my-2">
            <el-col :xs="24" :sm="24">
              <el-input
                v-model="link"
                placeholder="请输入视频地址"
                :autosize="{ minRows: 3, maxRows: 5 }"
              >
                <!-- input左侧选择视频源 下拉框 -->
                <el-select
                  slot="prepend"
                  v-model="selectedApi"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in apiList"
                    v-show="item.status === 'ENABLED'"
                    :key="item.code"
                    :label="item.desc"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <!-- input右侧 按钮 -->
                <el-button
                  slot="append"
                  class="mx-auto"
                  type="primary"
                  size="mini"
                  @click="parse()"
                  >确定
                </el-button>
              </el-input>
            </el-col>
          </el-row>

          <!-- 播放区域iframe -->
          <el-row class="my-2">
            <el-col :xs="24" :sm="24">
              <iframe
                v-if="frameSrc"
                :src="frameSrc"
                style="width: 100%; height: 400px"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { videoParse } from "@/api/free/videoparse";

export default {
  name: "VideoParse",
  components: {},
  data() {
    return {
      link: "",
      apiList: [],
      selectedApi: "",
      frameSrc: ""
    };
  },
  watch: {},
  created() {
    this.videoParse();
  },
  methods: {
    videoParse() {
      videoParse().then(resp => {
        this.apiList = resp.data;
      });
    },
    parse() {
      this.frameSrc = "";
      if (!this.selectedApi) {
        this.$message.warning("请选择解析源");
        return;
      }
      if (!this.link) {
        this.$message.warning("请输入视频地址");
        return;
      }
      this.frameSrc = this.selectedApi + this.link;
    }
  }
};
</script>

<style>
.el-select .el-input {
  width: 96px;
}

.el-input-group__prepend {
  background-color: #fff !important;
}

.el-input-group__append {
  background-color: #67c23a !important;
  color: #fff !important;
}
</style>
