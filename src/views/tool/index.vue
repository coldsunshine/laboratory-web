<template>
  <el-container>
    <el-header class="text-center"><h1>工具</h1></el-header>
    <el-main>
      <el-row>
        <el-col :md="2" :xs="0">&zwj;</el-col>
        <el-col :md="20" :xs="24">
          <el-tabs :value="activeName" lazy @tab-click="handleClick">
            <el-tab-pane label="md转ubb" name="tab_md2ubb">
              <Md2Ubb />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>

    <el-backtop></el-backtop>
  </el-container>
</template>

<script>
import Md2Ubb from "./md2ubb/index";

export default {
  name: "Index",
  components: {
    Md2Ubb
  },
  data() {
    return {
      activeName: "tab_md2ubb"
    };
  },
  methods: {
    handleClick(tab) {
      localStorage.setItem("activeName", tab.name);
    }
  }
};
</script>

<style scoped>
.row-space {
  margin: 8px 4px;
}
</style>
