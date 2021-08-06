<template>
  <div class="text-center text-xs text-gray-400 mt-4">
    <div>
      <table class="inline-block">
        <thead>
          <tr>
            <th></th>
            <th>pv</th>
            <th>uv</th>
            <th>ip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>今</td>
            <td>{{ overview.today.pv }}</td>
            <td>{{ overview.today.uv }}</td>
            <td>{{ overview.today.ipCount }}</td>
          </tr>
          <tr>
            <td>昨</td>
            <td>{{ overview.yesterday.pv }}</td>
            <td>{{ overview.yesterday.uv }}</td>
            <td>{{ overview.yesterday.ipCount }}</td>
          </tr>
          <tr>
            <td>总</td>
            <td>{{ overview.all.pv }}</td>
            <td>{{ overview.all.uv }}</td>
            <td>{{ overview.all.ipCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { overview } from "@/api/system/accessRecord";

export default {
  name: "AccessOverview",
  data() {
    return {
      overview: {
        today: { pv: 0, uv: 0, ipCount: 0 },
        yesterday: { pv: 0, uv: 0, ipCount: 0 },
        all: { pv: 0, uv: 0, ipCount: 0 }
      }
    };
  },
  watch: {
    $route: {
      handler: function() {
        this.renderAccessOverview();
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.renderAccessOverview();
  },
  methods: {
    renderAccessOverview() {
      let param = { path: this.$route.path };
      overview(param)
        .then(resp => {
          this.overview = resp.data;
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
td {
}
</style>
