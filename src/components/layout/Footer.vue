<template>
  <div>
    <div class="mt-4 mb-2 text-center text-xs text-gray-400">
      部分内容来自互联网，仅供学习使用，与本站无关，
      <el-link
        type="info"
        class="text-xs absolute"
        href="mailto:3087233411@qq.com?subject=标题&body=内容"
        >侵删 <i class="el-icon-message"></i
      ></el-link>
    </div>
    <div class="text-center text-xs text-gray-400">
      ©2021 <a href="https://blog.yiidii.cn">YiiDii</a>. All rights reserved.
    </div>
    <AccessOverview />
  </div>
</template>

<script>
import AccessOverview from "@/components/system/accessrRecord/AccessOverview";
import { addOne } from "@/api/system/accessRecord";
export default {
  name: "Footer",
  components: {
    AccessOverview
  },
  watch: {
    $route: {
      handler: function() {
        this.addAAccessRecord();
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.addAAccessRecord();
  },
  methods: {
    addAAccessRecord() {
      let fullPath = this.$route.fullPath;
      let param = {
        path: this.$route.path,
        queryString: fullPath.substr(fullPath.indexOf("?") + 1)
      };
      addOne(param);
    }
  }
};
</script>

<style>
.footer {
  text-align: center;
  color: #909399;
  font-size: 10px;
}
</style>
