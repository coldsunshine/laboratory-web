<template>
  <div class="header">
    <div class="header-wrapper">
      <router-link to="/">
        <div class="flex items-center">
          <Logo class="h-10 w-10" />
          <p class="pl-3 select-none">Lab</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style scoped>
.header {
  @apply h-16 drop-shadow-sm shadow-md bg-white;
}

.header-wrapper {
  @apply w-11/12 max-w-5xl h-full m-auto font-bold text-2xl flex items-center justify-between;
}
</style>
