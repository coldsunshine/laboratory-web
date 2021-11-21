<template>
  <el-container>
    <el-header class="text-center">
      <h2 class="mt-4 text-2xl">办公工具</h2>
    </el-header>
    <el-row>
      <el-col :md="8">&zwj;</el-col>
      <el-col :md="8">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="office文档转pdf" name="tab_office2pdf">
            <office2pdf></office2pdf>
          </el-tab-pane>
          <el-tab-pane label="OCR图片识别文字" name="tab_ocr">
            <ocr></ocr>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import office2pdf from "@/views/office/office2pdf";
import ocr from "@/views/office/ocr";
export default {
  name: "OfficeIndex",
  components: { office2pdf, ocr },
  data() {
    return {
      activeName: "tab_office2pdf"
    };
  }
};
</script>

<style scoped></style>
