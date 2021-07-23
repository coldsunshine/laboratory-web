<template>
  <div>
    <el-row>
      <el-col :md="8" :xs="24" class="col-space">
        <!-- 按钮 -->
        <el-row :gutter="2">
          <el-col style="margin: 0px 4px 10px 0px; font-size: 0px">
            <el-button-group>
              <el-button style="margin-top: 10px" class="row-space" type="primary" size="mini" :disabled="!srcJson" @click="compress()">压缩</el-button>
              <el-button style="margin-top: 10px" class="row-space" type="primary" size="mini" :disabled="!srcJson" @click="escape()">转义</el-button>
              <el-button style="margin-top: 10px" class="row-space" type="primary" size="mini" :disabled="!srcJson" @click="compressAndEscape()">压缩并转义</el-button>
              <el-button style="margin-top: 10px" class="row-space" type="primary" size="mini" :disabled="!srcJson" @click="unEscape()">去转义</el-button>
              <el-button style="margin-top: 10px" class="row-space" type="primary" size="mini" :disabled="!srcJson" @click="unicode2Ch()">unicode转中文</el-button>
            </el-button-group>
          </el-col>

          <!-- 源json -->
          <el-col>
            <el-input
                v-model="srcJson"
                type="textarea"
                size="small"
                placeholder="粘贴json到此处..."
                :autosize="{ minRows: 14, maxRows: 14}"
                resize="none"/>
          </el-col>

        </el-row>
      </el-col>

      <!-- 右 -->
      <el-col :md="16" :xs="24" class="col-space">
        <!-- setting -->
        <el-row :gutter="10" style="margin-bottom: 10px">
          <el-col :xs="8" :sm="6" class="row-space">
            <el-tooltip content="主题" placement="top">
              <el-select v-model="theme" placeholder="主题" size="mini">
                <el-option v-for="item in options.themes"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-tooltip>
          </el-col>

        </el-row>

        <!-- json 预览   -->
        <el-col style="width: 100%">
          <json-viewer :value="json" :expand-depth="deep" :copyable="copyable" :expanded="!fold" :previewMode="previewMode"/>
        </el-col>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'jsonNew',
  components: {JsonViewer,},
  data() {
    return {
      srcJson: "",

      json: {},
      deep: 20,
      theme: 'jv-light',
      fold: false,

      sort: false,
      boxed: false,
      copyable: true,
      previewMode: false,

      options: {
        themes: [{"label": "默认主题", "value": "jv-light"}],
      }
    }
  },
  methods: {
    renderJson(value, oldValue) {
      if (!value || value == oldValue) {
        return
      }
      let json = {}
      try {
        json = JSON.parse(this.srcJson)
      } catch (e) {
        this.json = {}
        return null;
      }
      this.json = json
    },
    compress() {
      this.srcJson = this.srcJson.replace(/[\r\n]/g, "")
    },
    escape() {
      this.srcJson = this.srcJson.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')
    },
    compressAndEscape() {
      this.srcJson = this.srcJson.replace(/[\r\n]/g, "").replace(/\\/g, "\\\\").replace(/\"/g, '\\"')
    },
    unEscape() {
      this.srcJson = this.srcJson.replace(/\\\\/g, "\\").replace(/\\\"/g, '"')
    },
    unicode2Ch() {
      let e = this.srcJson
      if (!e) {
        return
      }
      let n = ""
      for (let t = 1, o = 0; o < e.length; o += t) {
        t = 1;
        let i = e.charAt(o);
        if ("\\" == i) {
          if ("u" == e.charAt(o + 1)) {
            let r = e.substr(o + 2, 4);
            n += String.fromCharCode(parseInt(r, 16).toString(10)), t = 6
          } else {
            n += i;
          }
        } else {
          n += i
        }
      }
      this.srcJson = n
    }
  },
  mounted() {
    this.renderJson(this.srcJson, "")
  },
  watch: {
    srcJson: function (value, oldValue) {
      this.renderJson(value, oldValue)
    },
  },
  computed: {}
}
</script>
<style>
.row-space {
  margin: 5px 0;
}
</style>