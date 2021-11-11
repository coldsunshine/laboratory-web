<template>
  <el-container>
    <el-header class="text-center">
      <h1 class="text-2xl mt-4">视频解析</h1>
    </el-header>
    <el-main>
      <el-row>
        <el-col :md="4" :xs="0">&zwj;</el-col>
        <el-col :md="16" :xs="24">
          <el-row class="my-2">
            <el-col :xs="24" :sm="24">
              <!-- 视频地址 -->
              <el-input
                v-model="link"
                placeholder="请输入视频地址"
                :autosize="{ minRows: 3, maxRows: 5 }"
              >
                <!-- input左侧 选择视频源下拉框 -->
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
              <div>
                <iframe
                  v-if="frameSrc"
                  :src="frameSrc"
                  width="100%"
                  height="400px"
                  allowtransparency="true"
                  allowfullscreen="true"
                />
              </div>
              <div class="mt-4 text-center text-xs text-gray-400">
                接口及内容来自互联网，仅供学习使用，与本站无关
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
    <div>
      <el-tooltip content="赞助解析源">
        <el-button
          type="primary"
          icon="el-icon-ice-cream-round"
          circle
          class="absolute right-4 bottom-8"
          @click="sponsorDrawer = true"
        />
      </el-tooltip>
      <el-drawer
        title="赞助解析源"
        :visible.sync="sponsorDrawer"
        direction="rtl"
        :size="sponsorDrawerWidth"
      >
        <div class="p-4">
          <el-form
            ref="sponsorApiForm"
            :rules="sponsorApiFormRule"
            :model="sponsorApiForm"
            label-width="80px"
          >
            <el-form-item label="接口地址" prop="value">
              <el-input
                v-model="sponsorApiForm.value"
                placeholder="https://xxx.xxx?url="
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input
                v-model="sponsorApiForm.desc"
                placeholder="一句话描述一下"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            size="mini"
            class="float-right"
            @click="sponsorApi()"
            >确定
          </el-button>
        </div>
      </el-drawer>
    </div>
  </el-container>
</template>

<script>
import { getList, save } from "@/api/free/dict";

export default {
  name: "VideoParse",
  components: {},
  data() {
    return {
      link: "",
      apiList: [],
      selectedApi: "",
      frameSrc: "",
      sponsorDrawer: false,
      sponsorDrawerWidth: "80%",
      sponsorApiForm: { type: "VIDEO_PARSE", value: "", desc: "" },
      sponsorApiFormRule: {
        value: [
          {
            required: true,
            message: "请输入接口地址",
            trigger: "blur"
          },
          {
            pattern:
              "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]",
            message: "接口地址格式不正确"
          }
        ],
        desc: { required: true, message: "请输入描述", trigger: "blur" }
      }
    };
  },
  watch: {},
  mounted() {
    // 监听窗口变化
    window.onresize = () => {
      return (() => {
        this.setSponsorDrawerWidth();
      })();
    };
  },
  created() {
    // 初始化api
    this.initApi();
    // 设置drawer宽度
    this.setSponsorDrawerWidth();
  },
  methods: {
    initApi() {
      getList("VIDEO_PARSE").then(resp => {
        this.apiList = resp.data;
        // 默认选中第一个
        if (this.apiList.length > 0) {
          this.selectedApi = this.apiList[0].value;
          this.handleRouteParam();
        }
      });
    },
    /**
     * 处理path的url参数，自动填充表单
     */
    handleRouteParam() {
      const params = this.$route.query;
      let url = params.url;
      if (!this.validator.isEmpty(url)) {
        this.link = url;
        this.frameSrc = this.selectedApi + url;
      }
    },
    /**
     * 解析
     */
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
    },
    /**
     * 设置drawer宽度
     */
    setSponsorDrawerWidth() {
      let val = document.body.clientWidth;
      const def = 800; // 默认宽度
      if (val < def) {
        this.sponsorDrawerWidth = "80%";
      } else {
        this.sponsorDrawerWidth = "40%";
      }
    },
    /**
     * 捐赠解析源api
     */
    sponsorApi() {
      this.$refs["sponsorApiForm"].validate(valid => {
        if (valid) {
          save(this.sponsorApiForm).then(() => {
            this.$message.success("添加成功，等待管理员审核");
          });
        } else {
          return false;
        }
      });
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
