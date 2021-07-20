<template>
  <div>
    <el-row>
      <!-- 左 源日志 -->
      <el-col :md="12" :xs="24" class="col-space">
        <div class="sub-title row-space"><b>mybatis日志</b></div>
        <el-input
            v-model="srcLog"
            type="textarea"
            size="small"
            :autosize="{ minRows: 16,maxRows:16 }"
            resize="none"/>
        <div class="row-space" style="float:right">
          <el-button type="warning" size="mini" @click="srcLog = ''" :disabled="!srcLog">清空</el-button>
          <el-button type="primary" size="mini" @click="tran2Sql()" :disabled="!srcLog">转换</el-button>
        </div>
        <div style="clear:both"></div>
      </el-col>

      <!-- sql区域 -->
      <el-col :md="12" :xs="24" class="col-space">
        <div class="sub-title row-space"><b>可执行sql</b></div>
        <SqlEditor ref="codemirror" :value="sql" :height="'332px'" @setSql="setSql"></SqlEditor>

        <div class="row-space" style="float:right">
          <el-button type="warning" size="mini" @click="sql = ''" :disabled="!sql">清空</el-button>
          <el-button type="primary" size="mini" @click="copy()" :disabled="!sql">复制</el-button>
          <el-button type="primary" size="mini" @click="format()" :disabled="!sql">格式化</el-button>
        </div>
        <div style="clear:both"></div>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import {handleClipboard} from '@/utils/clipboard.js';
import SqlEditor from '@/components/codemirror/SqlEditor'
import sqlFormatter from 'sql-formatter';

export default {
  name: "MybatisSqlTrans",
  components: {
    SqlEditor
  },
  data() {
    return {
      srcLog: "",
      sql: "",
    };
  },
  mounted() {
  },
  methods: {
    tran2Sql() {
      let preparing = "Preparing: ";
      let parameters = "Parameters: ";

      let srcLog = this.srcLog;
      let lines = srcLog.split("\n").filter(l => l.indexOf(preparing) != -1 || l.indexOf(parameters) != -1);

      if (lines.length == 0 || lines.length % 2 != 0) {
        this.$message.error("日志格式错误, 必须包含Preparing: 和Parameters: ");
        return;
      }

      let sqls = [];
      for (let i = 0; i < lines.length; i = i + 2) {
        // sql
        let sql = lines[i];
        sql = sql.substring(sql.indexOf(preparing) + preparing.length);

        // params
        let paramIndex = i + 1;
        let paramStrs = lines[paramIndex];
        paramStrs = paramStrs.substring(
            paramStrs.indexOf(parameters) + parameters.length
        );
        paramStrs = paramStrs.split(",");

        // 替换
        let regx = /\((.+?)\)/g;
        for (let i = 0; i < paramStrs.length; i++) {
          let paramStr = paramStrs[i];
          let type = String(paramStr.match(regx));
          let param = paramStr.replace(type, "");
          type = type.indexOf("(") != -1 ? type.substring(1, type.length - 1) : "null";

          if (type == "String" || type == "Timestamp" || type == "Date") {
            sql = sql.replace("?", "'" + param.trim() + "'");
          } else if (type == "null") {
            sql = sql.replace(  "?", "null");
          } else {
            // 数值类型
            sql = sql.replace("?", param.trim());
          }
        }
        if (!sql.endsWith(";")) {
          sql += ";";
        }
        sqls.push(sql);
      }

      if (sqls.length > 0) {
        this.sql = sqls.join("\r\r");
        this.$message.success("成功转换" + sqls.length + "个sql");
      }
    },
    copy() {
      handleClipboard(
          this.sql,
          event,
          () => {
            this.$message.success('复制成功');
          },
          () => {
            this.$message.error(this.$t('复制失败'));
          }
      );
    },
    format() {
      this.sql = sqlFormatter.format(this.sql);
    },
    setSql(sql) {
      this.sql = sql
    },
  }
}

</script>
<style>
.col-space {
  padding: 0 10px;
}

</style>
