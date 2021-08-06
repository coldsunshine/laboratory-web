<template>
  <div v-if="visible">
    <el-row>
      <el-col
        v-for="d in data"
        :key="d.randomId"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        class="p-2"
      >
        <el-card class="h-80">
          <div class="w-auto text-center">
            <div>
              <el-image
                class="w-16 h-16 rounded-full"
                :src="d.avatar"
                @click="copyVideoAddr(d)"
              />
            </div>
            <div class="text-gray-500 text-base font-semibold my-2">
              {{ d.author }}
            </div>
            <!--            <div class="text-gray-500 text-xs mb-4">-->
            <!--              {{ d.signature }}-->
            <!--            </div>-->
            <div class="h-4">
              <div v-if="!d.image">
                <el-image class="w-24 h-24" :src="d.video.poster[0]" />
                <el-button
                  class="mt-2 block mx-auto"
                  size="mini"
                  type="primary"
                  @click="copyVideoAddr(d)"
                  >复制地址
                </el-button>
              </div>
              <el-image
                v-if="d.image"
                class="w-36 h-36"
                :src="d.image.urlList[0]"
                :preview-src-list="d.image.urlList"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { handleClipboard } from "@/utils/clipboard";

export default {
  name: "DouYinRmWaterMarkView",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {
    copyVideoAddr(data) {
      if (data.image) {
        return;
      }
      handleClipboard(
        data.video.urlList[0],
        event,
        () => {
          this.$message.success("复制成功");
        },
        () => {
          this.$message.error(this.$t("复制失败"));
        }
      );
    }
  }
};
</script>

<style scoped></style>
