<template>
  <div class="content">
    <el-card class="box-card">
      <el-card>
        <!-- logo -->
        <img src="../../assets/logo_index.png" width="200px" alt />
        <!-- 表单 -->
        <el-form ref="form" :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.code"
              style="width:235px;margin-right:10px"
              placeholder="请输入验证码"
            ></el-input>
            <el-button>发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
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
  width: 500px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
