<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/layout/Footer";

export default {
  name: "Home",
  components: {
    Footer
  }
};
</script>
<style>
#app {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
