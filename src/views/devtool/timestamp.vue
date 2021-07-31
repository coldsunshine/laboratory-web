<template>
  <div>
    <el-row :gutter="20" class="row-space">
      <el-col :xs="6" :sm="2">
        <span><b>模式</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-radio-group v-model="model" @change="modelChange()">
          <el-radio v-model="model" label="MS">毫秒</el-radio>
          <el-radio v-model="model" label="SEC">秒</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row-space">
      <el-col :xs="6" :sm="2">
        <span><b>现在</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-link :underline="false" @click="ts_timestamp = now_timestamp">{{
          now_timestamp
        }}</el-link>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row-space">
      <el-col :xs="6" :sm="2">
        <span><b>时间戳</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="ts_timestamp" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              class="el-icon-arrow-right"
              @click="trans2DateTime()"
            ></el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="ts_datetime" size="mini" disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="copy(ts_datetime)"
              >复制</el-button
            >
          </el-form-item>
        </el-form>
        <div style="clear:both"></div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="row-space">
      <el-col :xs="6" :sm="2">
        <span><b>时间</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="date_datetime" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              class="el-icon-arrow-right"
              @click="trans2Timestamp()"
            ></el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="date_timestamp" size="mini" disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="copy(date_timestamp)"
              >复制</el-button
            >
          </el-form-item>
        </el-form>
        <div style="clear:both"></div>
      </el-col>
    </el-row>

    <el-divider />

    <el-row style="margin-bottom: 20px">
      <el-col :xs="24" :sm="12">
        <el-alert
          title="提示"
          type="info"
          description="此处时间以【时间戳】处的时间为基准, 点击复制"
          show-icon
          :closable="false"
        >
        </el-alert>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="6" :sm="2">
        <span><b>当前起止</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.today.start_fmt)"
          >{{ ext.today.start_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.today.start)"
          >{{ ext.today.start }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.today.end_fmt)"
          >{{ ext.today.end_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.today.end)"
          >{{ ext.today.end }}</el-link
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="6" :sm="2">
        <span><b>昨天起止</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.yesterday.start_fmt)"
          >{{ ext.yesterday.start_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.yesterday.start)"
          >{{ ext.yesterday.start }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.yesterday.end_fmt)"
          >{{ ext.yesterday.end_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.yesterday.end)"
          >{{ ext.yesterday.end }}</el-link
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="6" :sm="2">
        <span><b>本周起止</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.week.start_fmt)"
          >{{ ext.week.start_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.week.start)"
          >{{ ext.week.start }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.week.end_fmt)"
          >{{ ext.week.end_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.week.end)"
          >{{ ext.week.end }}</el-link
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="6" :sm="2">
        <span><b>本月起止</b></span>
      </el-col>
      <el-col :xs="18" :sm="22">
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.month.start_fmt)"
          >{{ ext.month.start_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.month.start)"
          >{{ ext.month.start }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.month.end_fmt)"
          >{{ ext.month.end_fmt }}</el-link
        >
        <el-link
          style="margin-right: 12px"
          :underline="false"
          @click="copy(ext.month.end)"
          >{{ ext.month.end }}</el-link
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from "moment";
import { handleClipboard } from "@/utils/clipboard.js";

export default {
  name: "Timestamp",
  data() {
    return {
      model: "SEC",
      timer: null,

      now_timestamp: null,

      ts_timestamp: null,
      ts_datetime: null,

      date_datetime: null,
      date_timestamp: null,

      ext: {
        today: {
          start: null,
          start_fmt: null,
          end: null,
          end_fmt: null
        },
        yesterday: {
          start: null,
          start_fmt: null,
          end: null,
          end_fmt: null
        },
        week: {
          start: null,
          start_fmt: null,
          end: null,
          end_fmt: null
        },
        month: {
          start: null,
          start_fmt: null,
          end: null,
          end_fmt: null
        }
      }
    };
  },
  watch: {
    ts_timestamp: function() {
      let ts = Number(this.ts_timestamp);
      if (this.model == "SEC") {
        ts *= 1000;
      }

      let fmt = "YYYY-MM-DD HH:mm:ss";

      this.ext.today.start_fmt = Moment(ts)
        .startOf("day")
        .format(fmt);
      this.ext.today.end_fmt = Moment(ts)
        .endOf("day")
        .format(fmt);
      this.ext.yesterday.start_fmt = Moment(ts)
        .subtract(1, "day")
        .startOf("day")
        .format(fmt);
      this.ext.yesterday.end_fmt = Moment(ts)
        .subtract(1, "day")
        .endOf("day")
        .format(fmt);
      this.ext.week.start_fmt = Moment(ts)
        .startOf("week")
        .format(fmt);
      this.ext.week.end_fmt = Moment(ts)
        .endOf("week")
        .format(fmt);
      this.ext.month.start_fmt = Moment(ts)
        .startOf("month")
        .format(fmt);
      this.ext.month.end_fmt = Moment(ts)
        .endOf("month")
        .format(fmt);

      if (this.model == "SEC") {
        this.ext.today.start = Moment(ts)
          .startOf("day")
          .unix();
        this.ext.today.end = Moment(ts)
          .endOf("day")
          .unix();

        this.ext.yesterday.start = Moment(ts)
          .subtract(1, "day")
          .startOf("day")
          .unix();
        this.ext.yesterday.end = Moment(ts)
          .subtract(1, "day")
          .endOf("day")
          .unix();

        this.ext.week.start = Moment(ts)
          .startOf("week")
          .unix();
        this.ext.week.end = Moment(ts)
          .endOf("week")
          .unix();

        this.ext.month.start = Moment(ts)
          .startOf("month")
          .unix();
        this.ext.month.end = Moment(ts)
          .endOf("month")
          .unix();
      } else if (this.model == "MS") {
        this.ext.today.start = Moment(ts).valueOf();
        this.ext.today.end = Moment(ts).valueOf();

        this.ext.yesterday.start = Moment(ts)
          .subtract(1, "day")
          .startOf("day")
          .valueOf();
        this.ext.yesterday.end = Moment(ts)
          .subtract(1, "day")
          .endOf("day")
          .valueOf();

        this.ext.week.start = Moment(ts)
          .startOf("week")
          .valueOf();
        this.ext.week.end = Moment(ts)
          .endOf("week")
          .valueOf();

        this.ext.month.start = Moment(ts)
          .startOf("month")
          .valueOf();
        this.ext.month.end = Moment(ts)
          .endOf("month")
          .valueOf();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let model = localStorage.getItem("timestamp_model");
      if (model) {
        this.model = model;
      }

      this.initTimer();

      setTimeout(() => {
        this.ts_timestamp = this.now_timestamp;
      }, 1001);
    },
    initTimer() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      let _this = this;
      this.timer = setInterval(() => {
        if (this.model == "SEC") {
          _this.now_timestamp = Moment().unix();
        } else if (this.model == "MS") {
          _this.now_timestamp = Moment().valueOf();
        }
      }, 1000);
    },
    modelChange() {
      localStorage.setItem("timestamp_model", this.model);
      if (this.model == "SEC") {
        this.now_timestamp = Moment().unix();
      } else if (this.model == "MS") {
        this.now_timestamp = Moment().valueOf();
      }
      this.initTimer();
    },
    trans2DateTime() {
      let ts = Number(this.ts_timestamp);
      if (this.model == "SEC") {
        ts *= 1000;
      }
      this.ts_datetime = Moment(ts).format("YYYY-MM-DD HH:mm:ss");
    },
    trans2Timestamp() {
      let ts = Moment(this.date_datetime).valueOf();
      if (this.model == "SEC") {
        ts /= 1000;
      }
      this.date_timestamp = ts;
    },
    copy(val) {
      handleClipboard(
        val,
        event,
        () => {
          this.$message.success("复制成功");
        },
        () => {
          this.$message.error(this.$t("复制失败"));
        }
      );
    }
  }
};
</script>

<style scoped></style>
