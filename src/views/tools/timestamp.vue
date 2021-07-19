<template>
  <div>
    <el-row :gutter="20" class="row-space">
      <el-col :xs="12" :sm="2">
        <span><b>模式</b></span>
      </el-col>
      <el-col :xs="12" :sm="6">
        <el-radio v-model="model" label="SEC">秒</el-radio>
        <el-radio v-model="model" label="MS">毫秒</el-radio>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row-space">
      <el-col :xs="12" :sm="2">
        <span><b>现在</b></span>
      </el-col>
      <el-col :xs="12" :sm="6">
        <el-link :underline="false" @click="ts_timestamp = now_timestamp">{{ now_timestamp }}</el-link>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row-space">
      <el-col :xs="12" :sm="2">
        <span><b>时间戳</b></span>
      </el-col>
      <el-col :xs="12" :sm="18">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="ts_timestamp" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" class="el-icon-arrow-right" @click="trans2DateTime()"></el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ts_datetime" size="mini" disabled/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="copy(ts_datetime)">复制</el-button>
          </el-form-item>
        </el-form>
        <div style="clear:both"></div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row-space">
      <el-col :xs="12" :sm="2">
        <span><b>时间</b></span>
      </el-col>
      <el-col :xs="12" :sm="18">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="date_datetime" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" class="el-icon-arrow-right" @click="trans2Timestamp()"></el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="date_timestamp" size="mini" disabled/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="copy(date_timestamp)">复制</el-button>
          </el-form-item>
        </el-form>
        <div style="clear:both"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Moment from "moment";
import {handleClipboard} from '@/utils/clipboard.js';

export default {
  name: "timestamp",
  data() {
    return {
      model: "SEC",
      timer: null,

      now_timestamp: null,

      ts_timestamp: null,
      ts_datetime: null,

      date_datetime: null,
      date_timestamp: null,
    };
  },
  mounted() {
    this.init()
  },
  watch: {
    model: function () {
      if (this.model == "SEC") {

      } else if (this.model == "MS") {

      } else {
        console.log("undefined model: " + this.model)
      }
    }
  },
  methods: {
    init() {
      let _this = this;
      this.timer = setInterval(() => {
        if (this.model == "SEC") {
          _this.now_timestamp = Moment().unix()
        } else if (this.model == "MS") {
          _this.now_timestamp = Moment().valueOf()
        }
      }, 1000);
    },
    trans2DateTime() {
      let ts = Number(this.ts_timestamp)
      if (this.model == "SEC") {
        ts *= 1000
      }
      this.ts_datetime = Moment(ts).format('YYYY-MM-DD HH:mm:ss');
    },
    trans2Timestamp() {
      let ts = Moment(this.date_datetime).valueOf();
      if (this.model == "SEC") {
        ts /= 1000
      }
      this.date_timestamp = ts
    },
    copy(val) {
      handleClipboard(
          val,
          event,
          () => {
            this.$message.success('复制成功');
          },
          () => {
            this.$message.error(this.$t('复制失败'));
          }
      );
    },
  }
}
</script>

<style scoped>

</style>