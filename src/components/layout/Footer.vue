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
