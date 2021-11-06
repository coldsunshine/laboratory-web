<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :md="4" :xs="0">&zwj;</el-col>
        <el-col :md="16" :xs="24">
          <!-- 卡片 -->
          <el-row :gutter="20">
            <div v-for="card in cardInfo" :key="card.routerName">
              <el-col :xs="24" :sm="6" class="row-space">
                <router-link :to="{ name: card.routerName }">
                  <el-card
                    :body-style="{ padding: '0px' }"
                    class="rounded-lg duration-200 transform  hover:scale-105"
                  >
                    <div
                      class="img-div"
                      :style="'background-color: ' + card.bgColor"
                    >
                      <img :src="card.imgSrc" class="image inline-block w-16" />
                    </div>
                    <div class="card-body">
                      <span class="card-title">{{ card.title }}</span>
                      <span class="card-desc" v-html="card.desc"></span>
                    </div>
                    <div class="card-footer">
                      <el-link
                        v-if="card.routerName"
                        type="primary"
                        :underline="false"
                        >点击进入<i class="el-icon-arrow-right"></i
                      ></el-link>
                    </div>
                  </el-card>
                </router-link>
              </el-col>
            </div>
          </el-row>
          <!-- 访问统计 -->
          <el-row :gutter="20" class="mt-10 p-4 mx-auto">
            <AccessRecord />
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import AccessRecord from "@/components/system/accessrRecord/Index";
import { getList } from "@/api/free/dict";

export default {
  name: "Index",
  components: { AccessRecord },
  data() {
    return {
      cardInfo: []
    };
  },
  created() {
    this.initCardInfo();
  },
  methods: {
    initCardInfo() {
      getList("LAB_INDEX_CARD").then(resp => {
        this.cardInfo = resp.data
          .filter(c => c.status == "ENABLED")
          .map(c => {
            return JSON.parse(c.value);
          });
      });
    }
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
  font-size: 12px;
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
