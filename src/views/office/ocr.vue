<template>
  <div>
    <div class="text-center">
      <el-upload
        ref="ref_toPdf_upload"
        :action="upload.url"
        :auto-upload="false"
        drag
        :multiple="true"
        :limit="3"
        :http-request="uploadFile"
        :on-remove="onRemove"
        :before-upload="beforeUpload"
        :on-change="onChange"
        :on-exceed="onExceed"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>

      <div class="text-center">
        <el-button
          class="my-2 justify-self-center"
          size="mini"
          type="primary"
          @click="toPdf"
          >点击试别
        </el-button>
      </div>
    </div>

    <div class="p-4">
      <el-card class="box-card">
        <!-- card header -->
        <div slot="header" class="clearfix">
          <span>识别结果</span>
          <el-tooltip content="刷新" placement="top">
            <el-button
              class="float-right p-2"
              :class="{ 'animate-spin': getTask.loading == true }"
              type="text"
              icon="el-icon-refresh"
              @click="getTaskList()"
            ></el-button>
          </el-tooltip>

          <el-popconfirm
            confirm-button-text="好的"
            icon="el-icon-info"
            icon-color="red"
            title="确定清除本地文件缓存么？"
            @confirm="rmTaskIdCache()"
          >
            <el-tooltip slot="reference" content="清空" placement="top">
              <el-button
                class="float-right p-2"
                type="text"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
          </el-popconfirm>
        </div>

        <!-- card body -->
        <div>
          <div v-if="taskList.length > 0">
            <el-collapse accordion>
              <el-collapse-item v-for="e in taskList" :key="e.taskId">
                <template slot="title">
                  <div>
                    <div>
                      一共{{ e.fileInfos.length }}个文件，耗时{{
                        e.consumingTime / 1000
                      }}秒
                      <el-tooltip content="等待运行" placement="top">
                        <i
                          v-if="e.state == 'INIT'"
                          class="el-icon-remove-outline"
                          style="color: #909399"
                        ></i>
                      </el-tooltip>
                      <el-tooltip content="运行中" placement="top">
                        <i
                          v-if="e.state == 'RUNNING'"
                          class="el-icon-loading"
                          style="color: #409EFF"
                        ></i>
                      </el-tooltip>
                      <el-tooltip content="部分转换成功" placement="top">
                        <i
                          v-if="e.state == 'PART_SUCCESS'"
                          class="el-icon-circle-check"
                          style="color: #E6A23C"
                        ></i>
                      </el-tooltip>
                      <el-tooltip content="成功" placement="top">
                        <i
                          v-if="e.state == 'SUCCESS'"
                          class="el-icon-circle-check"
                          style="color: #67C23A"
                        ></i>
                      </el-tooltip>
                      <el-tooltip content="全部失败" placement="top">
                        <i
                          v-if="e.state == 'FAIL'"
                          class="el-icon-circle-close"
                          style="color: #F56C6C"
                        ></i>
                      </el-tooltip>
                    </div>
                  </div>
                </template>

                <!-- 本次任务的文件列表 -->
                <template>
                  <div
                    v-for="(f, index) in e.fileInfos"
                    :key="f.fileName"
                    class="my-2"
                  >
                    <!-- 名称 -->
                    <div class="text-xs my-2">
                      <el-tooltip content="原文件名称" placement="top">
                        <span>
                          <i class="el-icon-document mr-2 text-blue-600"></i>
                          {{ f.fileName }}
                        </span>
                      </el-tooltip>
                    </div>
                    <!-- 结束时间 -->
                    <div class="text-xs my-2">
                      <el-tooltip content="完成时间" placement="top">
                        <span>
                          <i class="el-icon-time mr-2 text-green-600"></i>
                          <span v-if="f.startTime && f.endTime">{{
                            f.endTime
                          }}</span>
                          <span v-else> - </span>
                        </span>
                      </el-tooltip>
                    </div>

                    <!-- 耗时 -->
                    <div class="text-xs my-2">
                      <el-tooltip content="耗时" placement="top">
                        <span>
                          <i class="el-icon-timer mr-2 text-yellow-600"></i>
                          <span v-if="f.consumingTime">{{
                            f.consumingTime / 1000
                          }}</span>
                          <span v-else> - </span>
                        </span>
                      </el-tooltip>
                    </div>

                    <!-- 备注 -->
                    <div class="text-xs my-2">
                      <el-tooltip content="说明" placement="top">
                        <span>
                          <i class="el-icon-open mr-2 text-pink-600"></i
                          >{{ f.remark }}
                        </span>
                      </el-tooltip>
                    </div>

                    <!-- 操作 -->
                    <div v-if="f.text" class="text-xs my-2">
                      <span>
                        <i class="el-icon-receiving mr-2"></i>
                        <span class="relative bottom-0.5"> </span>
                        {{ f.text }}
                      </span>
                    </div>

                    <!-- 虚线 分割线 -->
                    <div
                      v-if="index != e.fileInfos.length - 1"
                      class="w-full my-4  border-dashed border-t-2 border-light-blue-500"
                    ></div>
                  </div>
                </template>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- 无数据显示 -->
          <div v-else>
            <el-empty description="暂无文件"></el-empty>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "../../../config/env";
import { ocr, getOCRTaskList } from "@/api/free/office";

export default {
  name: "Office2pdf",
  data() {
    return {
      upload: {
        loading: false,
        url: baseUrl + "/free/doc/ocr",
        // 最终要上传的文件列表
        fileData: ""
      },
      // 转换成pdf后的文件列表
      taskList: [],

      // 缓存key
      cache: {
        taskIds: "ocr-taskId"
      },
      getTask: {
        loading: false,
        interval: null
      }
    };
  },
  created() {
    this.setGetTaskInterval();
  },
  methods: {
    toPdf() {
      // 先取出elementUI中upload组件中的文件
      let { uploadFiles } = this.$refs.ref_toPdf_upload;
      if (uploadFiles.length == 0) {
        this.$message.warning("请先选择文件");
        return;
      }
      // formData数据
      let form = new FormData();
      uploadFiles.forEach(item => {
        form.append("fileList", item.raw);
      });
      // 上传期间清除定时器
      clearInterval(this.getTask.interval);
      ocr(form)
        .then(response => {
          this.$message.success("上传成功，稍后刷新文件列表查看");
          this.$refs.ref_toPdf_upload.clearFiles();
          let taskIds = localStorage.getItem(this.cache.taskIds);
          if (!taskIds) {
            taskIds = [];
          } else {
            taskIds = JSON.parse(taskIds);
          }
          taskIds.push(response.data.taskId);
          localStorage.setItem(this.cache.taskIds, JSON.stringify(taskIds));
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => this.setGetTaskInterval());
    },
    // :http-request 覆盖默认的上传行为
    uploadFile(file) {
      this.upload.fileData.append("fileList", file.file);
    },
    // 移除
    onRemove(file, fileList) {},
    // 文件上传前的钩子，可以在这个钩子函数里判断上传的图片的类型和大小是否达标
    beforeUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
        return false;
      }
    },
    onChange(file, fileList) {
      let existFile = fileList
        .slice(0, fileList.length - 1)
        .find(f => f.name === file.name);
      if (existFile) {
        this.$message.error("当前文件已经存在!");
        fileList.pop();
      }
      this.taskList = fileList;
    },
    onExceed() {
      this.$message.warning("最多同时上传3个文件哦");
    },
    getTaskList() {
      let taskIds = localStorage.getItem(this.cache.taskIds);
      if (!taskIds) {
        return;
      }
      this.getTask.loading = true;
      getOCRTaskList(JSON.parse(taskIds))
        .then(resp => {
          this.taskList = resp.data;

          // 都完成的话清除定时器
          let unfinished =
            this.taskList.filter(t => t.state == "INIT" || t.state == "RUNNING")
              .length > 0;
          if (!unfinished) {
            clearInterval(this.getTask.interval);
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.getTask.loading = false;
        });
    },
    // 删除本地缓存
    rmTaskIdCache() {
      localStorage.removeItem(this.cache.taskIds);
      this.taskList = [];
    },
    setGetTaskInterval() {
      this.getTaskList();
      this.getTask.interval = setInterval(() => {
        this.getTaskList();
      }, 2000);
    }
  }
};
</script>

<style scoped></style>
