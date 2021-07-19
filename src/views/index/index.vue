<template>
  <el-container>
    <el-header class="text-center"><h1>工具库</h1></el-header>
    <el-main>
      <el-row>
        <el-col :md="4" :xs="0">&zwj;</el-col>
        <el-col :md="16" :xs="24">
          <el-row :gutter="20">

            <el-col :xs="12" :sm="6" class="row-space">
              <router-link :to="{name:'Cookie'}">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="img-div" style="background-color: #E6A23C">
                    <img src="//blog-bucket.yiidii.cn/icon/svg/Cookies.svg" class="image"/>
                  </div>
                  <div class="card-body">
                    <span class="card-title">Cookie工具</span>
                    <span class="card-desc">包含JD, 联通的cookie在线获取</span>
                  </div>
                  <div class="card-footer">
                    <el-link type="primary" :underline="false">点击进入<i class="el-icon-arrow-right"></i></el-link>
                  </div>
                </el-card>
              </router-link>
            </el-col>

            <el-col :xs="12" :sm="6" class="row-space">
              <router-link :to="{name:'Tools'}">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="img-div" style="background-color: #F56C6C">
                    <img src="//blog-bucket.yiidii.cn/icon/svg/tools.svg" class="image"/>
                  </div>
                  <div class="card-body">
                    <span class="card-title">开发者工具</span>
                    <span class="card-desc">
                    <ul>
                      <li>mybatis日志解析</li>
                      <li>sql格式化</li>
                      <li>时间转换工具</li>
                      <li>JSON工具</li>
                    </ul>
                  </span>
                  </div>
                  <div class="card-footer">
                    <el-link type="info" :underline="false">点击进入<i class="el-icon-arrow-right"></i></el-link>
                  </div>
                </el-card>
              </router-link>
            </el-col>

            <el-col :xs="12" :sm="6" class="row-space">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="img-div" style="background-color: #909399">
                  <img src="//blog-bucket.yiidii.cn/icon/svg/waiting.svg" class="image"/>
                </div>
                <div class="card-body">
                  <span class="card-title">Waiting...</span>
                  <span class="card-desc">
                    更多内容敬请期待...
                  </span>
                </div>
                <div class="card-footer">
                </div>
              </el-card>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>

<style>
ul {
  padding-left: 12px;
}

.card-title {
  color: #303133;
  font-weight: bold;
  padding: 2px;
}

.card-desc {
  color: #909399;
  font-size: 8px;
  display: block;
  padding: 2px;
}

.card-body {
  padding: 0 8px ;
  margin-top: 16px;
  height: 96px;
}

.card-footer {
  height: 32px;
  margin-right: 8px;
  font-size: 4px !important;
  float: right;
}

.img-div {
  width: 100%;
  height: 168px;
  text-align: center;
}


.image {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

/**
去掉router-link下划线
 */
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>