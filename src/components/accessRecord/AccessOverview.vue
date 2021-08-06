<template>
  <div>access overview</div>
</template>

<script>
import { overview } from "@/api/system/accessRecord";

export default {
  name: "AccessOverview",
  data() {},
  created() {
    this.renderAccessOverview();
  },
  methods: {
    renderAccessOverview() {
      overview()
        .then(resp => {
          console.log(resp);
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped></style>
