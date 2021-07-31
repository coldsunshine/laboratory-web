<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :md="4" :xs="0">&zwj;</el-col>
        <el-col :md="16" :xs="24">
          <el-row :gutter="20">
            <div v-for="card in cardInfo" :key="card.routerName">
              <el-col :xs="24" :sm="6" class="row-space">
                <router-link :to="{ name: card.routerName }">
                  <el-card :body-style="{ padding: '0px' }" class="rounded-lg">
                    <div
                      class="img-div"
                      :style="'background-color: ' + card.bgColor"
                    >
                      <img :src="card.imgSrc" class="image inline-block" />
                    </div>
                    <div class="card-body">
                      <span class="card-title">{{ card.title }}</span>
                      <span class="card-desc" v-html="card.desc"></span>
                    </div>
                    <div class="card-footer">
                      <el-link type="primary" :underline="false"
                        >点击进入<i class="el-icon-arrow-right"></i
                      ></el-link>
                    </div>
                  </el-card>
                </router-link>
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      cardInfo: [
        {
          routerName: "Cookie",
          imgSrc: "//blog-bucket.yiidii.cn/icon/svg/Cookies.svg",
          title: "Cookie获取",
          desc: "包含JD, 联通的cookie在线获取",
          bgColor: "#E6A23C"
        },
        //   {
        //   routerName: 'Tool',
        //   imgSrc: '//blog-bucket.yiidii.cn/icon/svg/tools.svg',
        //   title: '工具',
        //   desc: '<ul><li>md转ubb工具</li></ul>',
        //   bgColor: '#67C23A'
        // },
        {
          routerName: "DevTool",
          imgSrc: "//blog-bucket.yiidii.cn/icon/svg/Developer.svg",
          title: "开发者工具",
          desc:
            "<ul><li>mybatis日志解析</li><li>sql格式化</li><li>时间转换工具</li><li>JSON工具</li></ul>",
          bgColor: "#F56C6C"
        },
        {
          routerName: "",
          imgSrc: "//blog-bucket.yiidii.cn/icon/svg/waiting.svg",
          title: "Waiting...",
          desc: "更多内容尽请期待...",
          bgColor: "#909399"
        }
      ]
    };
  }
};
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
  padding: 0 8px;
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
