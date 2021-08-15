<template>
  <div>
    <el-row>
      <el-col :sm="6">&zwj;</el-col>
      <el-col :xs="24" :sm="12">
        <el-row>
          <el-col>
            <el-card class="my-4 mx-2">
              <!-- card header -->
              <div slot="header" class="flex items-center justify-between">
                <div>
                  <div class="inline-block align-middle">
                    <img
                      src="https://blog-bucket-cdn.yiidii.cn/icon/svg/chat.svg"
                    />
                    <span class="font-semibold text-xs items-start"
                      >Web IM</span
                    >
                  </div>
                  <div
                    class="font-blod inline-block align-middle ml-8 font-medium text-xl"
                  >
                    即时沟通
                  </div>
                </div>

                <div class="">
                  <span
                    class="animate-ping inline-block w-1 h-1 border-2 rounded  border-green-500 align-middle"
                  ></span>
                  <span class=" align-middle ml-1">{{ onlineNum }}</span>
                </div>
              </div>

              <!-- card body -->
              <div
                ref="chat_message_div"
                class="h-96 overflow-y-auto transition ease-in duration-700"
              >
                <div v-for="m in historyMessage" :key="m.mid" class="mb-4">
                  <!-- 左 -->
                  <el-row v-if="m.nickname != nickname">
                    <el-col :xs="3" :sm="2">
                      <!--  头像 -->
                      <img
                        class="w-14 inline-block align-top"
                        src="https://blog-bucket-cdn.yiidii.cn/icon/svg/avatar-dft.svg"
                      />
                    </el-col>
                    <el-col :xs="18" :sm="20">
                      <!-- 昵称 + 消息 -->
                      <div class="mx-2">
                        <!-- 昵称 -->
                        <div class="text-gray-400 text-xs my-1">
                          {{ m.nickname }} ({{ m.timestamp }})
                        </div>
                        <!-- 消息 -->
                        <div
                          class="rounded bg-green-500 inline-block break-words p-2"
                          style="max-width: 270px"
                        >
                          {{ m.content }}
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="3" :sm="2"></el-col>
                  </el-row>
                  <!-- 右 -->
                  <el-row v-if="m.nickname == nickname">
                    <el-col :xs="3" :sm="2"> &nbsp;</el-col>
                    <el-col :xs="18" :sm="20">
                      <el-row>
                        <el-col>
                          <div class="text-gray-400 text-xs my-1 float-right">
                            ({{ m.timestamp }}) {{ m.nickname }}
                          </div>
                          <div class="clear-both"></div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <div style="text-align: right">
                            <div
                              class="rounded bg-green-500 break-words p-2 inline-block break-words"
                              style="max-width: 270px;text-align: left"
                            >
                              {{ m.content }}
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :xs="3" :sm="2">
                      <!-- 头像 -->
                      <img
                        class="inline-block align-top w-14"
                        src="https://blog-bucket-cdn.yiidii.cn/icon/svg/avatar-dft.svg"
                      />
                    </el-col>
                  </el-row>
                </div>
              </div>
              <el-divider></el-divider>

              <!-- 底部 -->
              <div>
                <el-row>
                  <!-- 发送内容框 -->
                  <el-row>
                    <el-input
                      v-model="message"
                      type="textarea"
                      :rows="3"
                      placeholder="说点什么..."
                    >
                    </el-input>
                  </el-row>

                  <!-- 按钮 -->
                  <el-row class="my-2 float-right">
                    <el-button
                      type="primary"
                      :disabled="!message"
                      @click="sendMsg()"
                      >发送
                    </el-button>
                  </el-row>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      width="80%"
      :visible="dialogVisible"
      :show-close="false"
    >
      <div class="my-2 text-base">请输入昵称</div>
      <div class="my-2">
        <el-input v-model="nickname"></el-input>
      </div>
      <div slot="footer">
        <el-button
          type="primary"
          :disabled="!Boolean(nickname)"
          @click="submitName"
          >确 定</el-button
        >
      </div>
      <div class="clear-right"></div>
    </el-dialog>

    <el-dialog
      title="提示"
      width="80%"
      :visible="channelExceptionVisible"
      :show-close="false"
      custom-class="text-center"
    >
      <div class="font-bold text-lg">服务器抽风中</div>
    </el-dialog>
  </div>
</template>

<script>
import { ipPort } from "../../../config/env";
import Moment from "moment";

export default {
  data() {
    return {
      websocket: null,
      onlineNum: 0,
      nickname: "",
      dialogVisible: true,
      channelExceptionVisible: false,
      message: "",
      historyMessage: []
    };
  },
  watch: {
    historyMessage: function() {
      this.scrollToBottom();
    },
    nickname: function() {
      if (this.nickname.length <= 0) {
        this.dialogVisible = true;
      }
    }
  },
  created() {
    // this.submitName();
  },
  methods: {
    sendMsg() {
      if (!this.message.trim()) {
        this.$message.warning("不允许发送空白消息");
        return;
      }
      this.websocketsend(this.message);
    },
    randomStr(len) {
      len = len || 32;
      let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
      for (let i = 0; i < len; i++)
        n += t.charAt(Math.floor(Math.random() * a));
      return n;
    },
    submitName() {
      if (this.nickname.length <= 0) {
        return;
      }
      this.initWebSocket();
      this.dialogVisible = false;
    },
    initWebSocket() {
      this.websocket = null;
      let wsUrl = `ws://${ipPort}/ws/im?nickname=${this.nickname}`;
      if ("WebSocket" in window) {
        //初始化weosocket(必须)
        this.websock = new WebSocket(wsUrl); //新建一个webstock对象
        this.websock.onopen = this.websocketonopen;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      } else {
        alert("当前浏览器 Not support websocket");
      }
    },
    websocketonopen() {},
    websocketonmessage(e) {
      let resp = JSON.parse(e.data);
      if (resp.type == "POP_INFO") {
        this.$message.info(resp.content);
        return;
      } else if (resp.type == "NICKNAME_REPEATED") {
        this.$message.warning(resp.content);
        this.nickname = "";
        return;
      } else if (resp.type == "ONLINE_NUM") {
        this.onlineNum = resp.content;
        return;
      } else if (resp.type == "MESSAGE") {
        let hisMessage = JSON.parse(resp.content);
        hisMessage.forEach(e => {
          this.historyMessage.push(e);
        });
      } else {
        console.log(resp);
      }
    },
    websocketonerror() {
      this.channelExceptionVisible = true;
    },
    websocketclose() {
      this.channelExceptionVisible = true;
    },
    websocketsend(data) {
      //数据发送
      this.websock.send(data);
      let msg = {
        mid: this.randomStr(6),
        nickname: this.nickname,
        content: this.message,
        timestamp: Moment().format("YYYY-MM-DD HH:mm:ss")
      };
      this.historyMessage.push(msg);
      this.message = "";
    },
    scrollToBottom() {
      let chatMessageDiv = this.$refs.chat_message_div;
      // div高度
      let divHeight = chatMessageDiv.offsetHeight;
      // 总高度
      let scrollHeight = chatMessageDiv.scrollHeight;
      let interval = setInterval(() => {
        // 滑块距离top的高度
        let scrollTop = chatMessageDiv.scrollTop;
        let speed = scrollHeight - scrollTop / 1000;
        if (
          chatMessageDiv.scrollTop + divHeight <
          chatMessageDiv.scrollHeight
        ) {
          chatMessageDiv.scrollTop += speed;
        } else {
          clearInterval(interval);
        }
      }, 1);
    }
  }
};
</script>

<style scoped></style>
