<template>
  <div>
    <el-row>
      <el-col :md="12" :xs="24" class="col-space">

        <el-row>
          <el-input
              v-model="srcText"
              type="textarea"
              size="small"
              :autosize="{ minRows: 14,maxRows:14 }"
              resize="none"/>
          <div class="row-space" style="float: right">
            <el-button type="primary" size="mini" :disabled="!srcText" @click="convert()">转换</el-button>
          </div>

        </el-row>

      </el-col>

      <el-col :md="12" :xs="24" class="col-space">
        <el-row>
          <el-input
              v-model="ubb"
              type="textarea"
              size="small"
              :autosize="{ minRows: 14,maxRows:14 }"
              resize="none"/>
        </el-row>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import {convert} from '@/utils/mdUbbConvert'

export default {
  components: {},
  data() {
    return {
      srcText: "",
      ubb: "",
    }
  },
  methods: {
    convert() {
      this.ubb = convert(this.srcText)
    },
  },
  mounted() {
  },
}
</script>
<style>
</style>
