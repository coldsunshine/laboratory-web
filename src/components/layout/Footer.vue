<template>
  <div>
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
