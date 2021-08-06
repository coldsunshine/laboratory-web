<template>
  <div class="footer">
    <el-footer
      >©2021 <a href="https://blog.yiidii.cn">YiiDii</a>. All rights reserved.
    </el-footer>
    <AccessOverview />
  </div>
</template>

<script>
import AccessOverview from "@/components/accessRecord/AccessOverview";

export default {
  name: "Footer",
  components: {
    AccessOverview
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
