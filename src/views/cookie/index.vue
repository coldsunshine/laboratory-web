<template>
  <el-container>
    <el-header class="text-center"><h2>Cookie获取</h2></el-header>
    <el-main>
      <el-row>
        <el-col :md="8">&zwj;</el-col>
        <el-col :md="8">
          <el-tabs v-model="activeName" stretch @tab-click="handleClick">
            <el-tab-pane class="text-center" label="京东" name="tab_jd">
              <jd />
            </el-tab-pane>
            <el-tab-pane label="联通" name="tab_chinaUnicom"
              ><unicom />
            </el-tab-pane>
          </el-tabs>
        </el-col> </el-row
    ></el-main>

    <el-footer></el-footer>
    <el-backtop></el-backtop>
  </el-container>
</template>

<script>
import jd from "./jd";
import unicom from "./unicom";

export default {
  components: {
    jd,
    unicom
  },
  data() {
    return {
      activeName: "tab_jd"
    };
  },
  methods: {
    handleClick(tab) {
      // if (tab.name === "tab_jd") {
      //   console.log()
      // } else {
      //   this.$message.warning("暂未支持，敬请期待")
      //   setTimeout(() => {
      //     this.activeName = this.lastActiveName
      //   }, 1)
      //   return
      // }
      this.lastActiveName = tab.name;
    }
  }
};
</script>
<style>
.row-space {
  margin: 10px 0;
}

.text-center {
  text-align: center;
}
</style>
