<template>
  <div>
    <el-row>
      <!-- OS -->
      <el-col :xs="24" :sm="8">
        <div
          id="platformStatisticsChart"
          :style="{ width: '100%', height: '360px' }"
        />
      </el-col>

      <!-- 浏览器 -->
      <el-col :xs="24" :sm="8">
        <div
          id="browserStatisticsChart"
          :style="{ width: '100%', height: '360px' }"
        />
      </el-col>

      <!-- 机型 -->
      <el-col :xs="24" :sm="8">
        <div
          id="deviceStatisticsChart"
          :style="{ width: '100%', height: '360px' }"
        />
      </el-col>
    </el-row>

    <!-- 访问趋势 -->
    <el-row>
      <el-col :xs="24" :sm="24">
        <div
          id="accessTrendChart"
          ref="accessTrend"
          :style="{ width: '100%', height: '360px' }"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { statistics, accessTrend } from "@/api/system/accessRecord";

export default {
  name: "Index",
  data() {
    return {};
  },
  created() {
    let _this = this;
    setTimeout(() => {
      _this.renderPie();
      _this.renderTrend();
    }, 200);
  },
  methods: {
    renderPie() {
      let option = {
        title: {
          text: "访问统计",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {d}%" //a 系列名称，b 数据项名称，c 数值，d 百分比
        },
        legend: {
          orient: "vertical",
          left: "right",
          top: "15%"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "75%",
            data: [],
            top: "30%"
          }
        ]
      };
      // 按照platform
      let params = { group: "platform", topN: 5 };
      statistics(params)
        .then(resp => {
          let dataJa = resp.data;
          // 响应数据转换成echarts的
          let seriesDataJa = [];
          dataJa.forEach(e => {
            let seriesData = {};
            seriesData.name = e.platform;
            seriesData.value = e.rate;
            seriesDataJa.push(seriesData);
          });

          let platformStatisticsChart = this.$echarts.init(
            document.getElementById("platformStatisticsChart")
          );
          // 数据
          option.series[0].data = seriesDataJa;
          option.series[0].name = "访问设备";
          option.title.text = "OS 统计";
          // 设置option
          platformStatisticsChart.setOption(option);
        })
        .catch(err => {
          console.log(err);
        });

      // 按照platform
      params = { group: "browser", topN: 5 };
      statistics(params)
        .then(resp => {
          let dataJa = resp.data;
          // 响应数据转换成echarts的
          let seriesDataJa = [];
          dataJa.forEach(e => {
            let seriesData = {};
            seriesData.name = e.browser;
            seriesData.value = e.rate;
            seriesDataJa.push(seriesData);
          });

          let platformStatisticsChart = this.$echarts.init(
            document.getElementById("browserStatisticsChart")
          );
          // 数据
          option.series[0].data = seriesDataJa;
          option.series[0].name = "浏览器";
          option.title.text = "浏览器统计";
          platformStatisticsChart.setOption(option);
        })
        .catch(err => {
          console.log(err);
        });

      // 按照device
      params = { group: "deviceName", topN: 5 };
      statistics(params)
        .then(resp => {
          let dataJa = resp.data;
          // 响应数据转换成echarts的
          let seriesDataJa = [];
          dataJa.forEach(e => {
            let seriesData = {};
            seriesData.name = e.deviceName;
            seriesData.value = e.rate;
            seriesDataJa.push(seriesData);
          });

          let platformStatisticsChart = this.$echarts.init(
            document.getElementById("deviceStatisticsChart")
          );
          // 数据
          option.series[0].data = seriesDataJa;
          option.series[0].name = "设备";
          option.title.text = "设备统计";
          platformStatisticsChart.setOption(option);
        })
        .catch(err => {
          console.log(err);
        });
    },
    renderTrend() {
      accessTrend()
        .then(resp => {
          let data = resp.data;
          let option = {
            visualMap: {
              show: false,
              type: "continuous",
              seriesIndex: 0,
              min: 0,
              max: 400
            },

            title: {
              left: "center",
              text: "访问趋势图"
            },
            tooltip: {
              trigger: "axis"
            },
            xAxis: {
              data: data.x,
              name: "时间/h"
            },
            yAxis: { name: "次数/次" },
            grid: {
              bottom: "60%"
            },
            series: {
              type: "line",
              showSymbol: false,
              data: data.y
            }
          };
          let accessTrend = this.$echarts.init(
            document.getElementById("accessTrendChart")
          );
          accessTrend.setOption(option);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
