<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
    <Footer/>
  </div>
</template>
<script>
import Footer from '@/components/layout/Footer'

export default {
  name: "home",
  components: {
    Footer
  }
};
</script>
<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
