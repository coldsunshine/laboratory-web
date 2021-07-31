<template>
  <el-container>
    <el-header class="text-center">
      <h1 class="text-2xl mt-4">开发者工具</h1>
    </el-header>
    <el-main>
      <el-row>
        <el-col :md="2" :xs="0">&zwj;</el-col>
        <el-col :md="20" :xs="24">
          <el-tabs :value="activeName" lazy @tab-click="handleClick">
            <!-- stretch -->
            <el-tab-pane label="Mybatis Sql 转换" name="tab_mybatis_sql_trans">
              <MybatisSqlTrans />
            </el-tab-pane>

            <el-tab-pane label="时间戳" name="tab_timestamp">
              <TimeStamp />
            </el-tab-pane>

            <el-tab-pane label="JSON" name="tab_json">
              <div class="text-center" style="margin: 10px 0 20px 0">
                <el-radio-group
                  v-model="jsonStyle.checked"
                  size="mini"
                  @change="jsonStyleChange"
                >
                  <el-radio-button
                    v-for="item in jsonStyle.styles"
                    :key="item.value"
                    :label="item.value"
                    >{{ item.label }}
                  </el-radio-button>
                </el-radio-group>
              </div>

              <el-divider></el-divider>
              <Json v-if="jsonStyle.checked == 'JSON'" />
              <JsonNew v-if="jsonStyle.checked == 'JSON_NEW'" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>

    <el-footer></el-footer>
    <el-backtop></el-backtop>
  </el-container>
</template>

<script>
import MybatisSqlTrans from "./mybatisSqlTrans";
import TimeStamp from "./timestamp";
import Json from "./json";
import JsonNew from "./jsonNew";

export default {
  components: {
    MybatisSqlTrans,
    TimeStamp,
    Json,
    JsonNew
  },
  data() {
    return {
      activeName: "tab_mybatis_sql_trans",
      jsonStyle: {
        checked: "JSON",
        styles: [
          { value: "JSON", label: "样式一" },
          { value: "JSON_NEW", label: "样式二" }
        ]
      }
    };
  },
  mounted() {
    let activeName = localStorage.getItem("activeName");
    if (activeName) {
      this.activeName = activeName;
    }

    let jsonStyleChecked = localStorage.getItem("jsonStyleChecked");
    if (jsonStyleChecked) {
      this.jsonStyle.checked = jsonStyleChecked;
    }
  },
  methods: {
    handleClick(tab) {
      localStorage.setItem("activeName", tab.name);
    },
    jsonStyleChange(label) {
      localStorage.setItem("jsonStyleChecked", label);
    }
  }
};
</script>
<style scoped>
.row-space {
  margin: 10px 0;
}

.col-space {
  margin: 0 10px;
}

.text-center {
  text-align: center;
}
</style>
