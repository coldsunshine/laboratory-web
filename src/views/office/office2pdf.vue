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
          >点击转换
        </el-button>
      </div>
    </div>

    <div class="p-4">
      <el-card class="box-card">
        <!-- card header -->
        <div slot="header" class="clearfix">
          <span>文件列表</span>
          <el-tooltip content="刷新" placement="top">
            <el-button
              class="float-right p-2"
              type="text"
              icon="el-icon-refresh"
              @click="getFileList"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="清空" placement="top">
            <el-button
              class="float-right p-2"
              type="text"
              icon="el-icon-delete"
              @click="rmFileCache"
            ></el-button>
          </el-tooltip>
        </div>

        <!-- card body -->
        <div>
          <div v-if="taskList.length > 0">
            <div v-for="e in taskList" :key="e.taskId" class="my-2">
              <div>
                <div>
                  本次一共{{ e.fileInfos.length }}个文件
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
                <div></div>
              </div>
              <div
                v-for="(f, index) in e.fileInfos"
                :key="f.fileName"
                class="my-2"
              >
                <!-- 名称 -->
                <div class="text-xs">
                  <span>
                    <i class="el-icon-document mr-2"></i>{{ f.fileName }}
                  </span>
                  <span class="ml-4">
                    <el-tooltip content="下载" placement="top">
                      <el-link
                        v-if="f.attachment"
                        :href="f.attachment.domain + '/' + f.attachment.url"
                        :underline="false"
                      >
                        <i class="el-icon-download"></i>
                      </el-link>
                    </el-tooltip>
                  </span>
                </div>
                <!-- 备注 -->
                <div class="text-xs">
                  <i class="el-icon-info mr-2"></i>{{ f.remark }}
                </div>
                <div
                  v-if="index != e.fileInfos.length - 1"
                  class="w-full my-4  border-dashed border-t-2 border-light-blue-500"
                >
                  <div></div>
                </div>
              </div>
              <el-divider class=""></el-divider>
            </div>
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
import { toPdf, get2pdfFileList } from "@/api/free/office";

export default {
  name: "Office2pdf",
  data() {
    return {
      upload: {
        // 加载动画
        isUploading: false,
        // 上传的地址
        url: baseUrl + "/free/doc/2pdf",
        // 最终要上传的文件列表
        fileData: ""
      },
      // 转换成pdf后的文件列表
      taskList: [],

      // 缓存key
      cache: {
        taskIds: "off2pdf-taskId"
      }
    };
  },
  created() {
    this.getFileList();
    setInterval(() => {
      this.getFileList();
    }, 2000);
  },
  methods: {
    toPdf() {
      let { uploadFiles } = this.$refs.ref_toPdf_upload;
      if (uploadFiles.length == 0) {
        this.$message.warning("请先选择文件");
        return;
      }
      let form = new FormData();
      uploadFiles.forEach(item => {
        form.append("fileList", item.raw);
      });
      toPdf(form)
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
        });
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
    getFileList() {
      let taskIds = localStorage.getItem(this.cache.taskIds);
      if (!taskIds) {
        return;
      }
      get2pdfFileList(JSON.parse(taskIds))
        .then(resp => {
          this.taskList = resp.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    rmFileCache() {
      localStorage.removeItem(this.cache.taskIds);
      this.taskList = [];
    }
  }
};
</script>

<style scoped></style>
