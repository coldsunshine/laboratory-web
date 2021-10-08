<template>
  <div>
    <el-row>
      <el-col :sm="6">&zwj;</el-col>
      <el-col :xs="24" :sm="12">
        <el-row>
          <el-col class="p-2">
            <el-form label-width="60px">
              <el-form-item label="手机号">
                <el-input v-model="phone"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="password"></el-input>
              </el-form-item>
              <el-form-item label="步数">
                <el-input v-model="step" placeholder="默认: 18888"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col class="text-center m-2">
            <el-button type="primary" size="small" @click="miBrushStep()">
              刷步
            </el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { miBrushStep } from "@/api/mi/step";

export default {
  data() {
    return {
      phone: "",
      password: "",
      step: ""
    };
  },
  watch: {},
  created() {},
  methods: {
    miBrushStep() {
      let params = {
        phone: this.phone,
        password: this.password,
        step: this.step
      };
      miBrushStep(params)
        .then(resp => {
          this.$message.success(resp.msg);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
