<template>
  <div>
    <el-row>
      <el-col :md="8" :xs="24" class="col-space">
        <!-- 按钮 -->
        <el-row :gutter="2">
          <el-col style="margin: 0px 4px 10px 0px; font-size: 0px">
            <el-button-group>
              <el-button
                style="margin-top: 10px"
                class="row-space"
                type="primary"
                size="mini"
                :disabled="!srcJson"
                @click="compress()"
                >压缩</el-button
              >
              <el-button
                style="margin-top: 10px"
                class="row-space"
                type="primary"
                size="mini"
                :disabled="!srcJson"
                @click="escape()"
                >转义</el-button
              >
              <el-button
                style="margin-top: 10px"
                class="row-space"
                type="primary"
                size="mini"
                :disabled="!srcJson"
                @click="compressAndEscape()"
                >压缩并转义</el-button
              >
              <el-button
                style="margin-top: 10px"
                class="row-space"
                type="primary"
                size="mini"
                :disabled="!srcJson"
                @click="unEscape()"
                >去转义</el-button
              >
              <el-button
                style="margin-top: 10px"
                class="row-space"
                type="primary"
                size="mini"
                :disabled="!srcJson"
                @click="unicode2Ch()"
                >unicode转中文</el-button
              >
            </el-button-group>
          </el-col>
        </el-row>

        <!-- 源json-->
        <el-row>
          <el-input
            v-model="srcJson"
            type="textarea"
            size="small"
            placeholder="粘贴json到此处..."
            :autosize="{ minRows: 14, maxRows: 14 }"
            resize="none"
          />
        </el-row>
      </el-col>

      <el-col :md="16" :xs="24" class="col-space">
        <!-- setting -->
        <el-row :gutter="10" style="margin-bottom: 10px">
          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="主题" placement="top">
              <el-select v-model="theme" placeholder="主题" size="mini">
                <el-option
                  v-for="item in options.themes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="折叠全部" placement="top">
              <el-select v-model="fold" placeholder="折叠全部" size="mini">
                <el-option
                  v-for="item in options.fold"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="展开深度" placement="top">
              <el-select v-model="deep" placeholder="展开深度" size="mini">
                <el-option
                  v-for="item in 10"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="图标风格" placement="top">
              <el-select v-model="iconStyle" placeholder="图标风格" size="mini">
                <el-option
                  v-for="item in options.iconStyle"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="字体大小" placement="top">
              <el-select v-model="fontSize" placeholder="字体大小" size="mini">
                <el-option
                  v-for="item in 8"
                  :key="(item + 4) * 2"
                  :label="(item + 4) * 2"
                  :value="(item + 4) * 2"
                ></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="行间距" placement="top">
              <el-select v-model="lineHeight" placeholder="行间距" size="mini">
                <el-option
                  v-for="item in 16"
                  :key="(item + 8) * 2"
                  :label="(item + 8) * 2"
                  :value="(item + 8) * 2"
                ></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="2" class="row-space">
            <el-tooltip content="展开颜色" placement="top">
              <el-color-picker v-model="color1" size="mini"></el-color-picker>
            </el-tooltip>
          </el-col>

          <el-col :xs="8" :sm="2" class="row-space">
            <el-tooltip content="关闭颜色" placement="top">
              <el-color-picker v-model="color2" size="mini"></el-color-picker>
            </el-tooltip>
          </el-col>
        </el-row>

        <!-- json 预览 -->
        <el-row>
          <Json-view
            :data="json"
            :theme="theme"
            :deep="deep"
            :icon-style="iconStyle"
            :font-size="fontSize"
            :line-height="lineHeight"
            :closed="fold"
            :icon-color="iconColor"
          />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import JsonView from "@/components/json-view/index.vue";

export default {
  components: {
    JsonView
  },
  data() {
    return {
      srcJson: "",

      json: {},
      theme: "default",
      fontSize: 14,
      lineHeight: 18,
      deep: 10,
      fold: false,
      iconStyle: "square",
      color1: "#409EFF",
      color2: "#000",

      options: {
        themes: [
          { label: "默认主题", value: "default" },
          { label: "one-dark", value: "one-dark" },
          { label: "vs-code", value: "vs-code" }
        ],
        fold: [
          { label: "折叠", value: true },
          { label: "不折叠", value: false }
        ],
        iconStyle: [
          { label: "方形", value: "square" },
          { label: "圆形", value: "circle" },
          { label: "三角形", value: "triangle" }
        ]
      }
    };
  },
  computed: {
    iconColor() {
      const { color1, color2 } = this;

      if (color1 && color2) {
        return [color1, color2];
      } else {
        return [];
      }
    }
  },
  watch: {
    srcJson: function(value, oldValue) {
      this.renderJson(value, oldValue);
    }
  },
  mounted() {
    this.renderJson(this.srcJson, "");
  },
  methods: {
    renderJson(value, oldValue) {
      if (!value || value == oldValue) {
        return;
      }
      let json = {};
      try {
        json = JSON.parse(this.srcJson);
      } catch (e) {
        this.json = {};
        return null;
      }
      this.json = json;
    },
    compress() {
      this.srcJson = this.srcJson.replace(/[\r\n]/g, "");
    },
    escape() {
      this.srcJson = this.srcJson.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    },
    compressAndEscape() {
      this.srcJson = this.srcJson
        .replace(/[\r\n]/g, "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');
    },
    unEscape() {
      this.srcJson = this.srcJson.replace(/\\\\/g, "\\").replace(/"/g, '"');
    },
    unicode2Ch() {
      let e = this.srcJson;
      if (!e) {
        return;
      }
      let n = "";
      for (let t = 1, o = 0; o < e.length; o += t) {
        t = 1;
        let i = e.charAt(o);
        if ("\\" == i) {
          if ("u" == e.charAt(o + 1)) {
            let r = e.substr(o + 2, 4);
            (n += String.fromCharCode(parseInt(r, 16).toString(10))), (t = 6);
          } else {
            n += i;
          }
        } else {
          n += i;
        }
      }
      this.srcJson = n;
    }
  }
};
</script>
<style>
.row-space {
  margin: 5px 0;
}
</style>
