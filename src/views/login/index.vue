<template>
  <div class="content">
    <el-card class="box-card">
      <img
        src="../../assets/logo_index.png"
        style="width:200px;display:block;margin:0 auto;margin-bottom:30px"
        alt
      />
      <el-form ref="form" :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:360px;margin-right:35px"
          ></el-input>
          <el-button type="info">获取验证码</el-button>
        </el-form-item>

        <el-checkbox :value="true" style="margin-bottom:20px">我已阅读并同意用户协议和隐私条款</el-checkbox>

        <el-form-item>
          <el-button type="primary" style="width:100%">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style>
.content {
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
.el-card {
  width: 550px;
  height: 330px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
