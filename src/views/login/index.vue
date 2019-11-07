<template>
  <div class="content">
    <el-card class="box-card">
      <img
        src="../../assets/logo_index.png"
        style="width:200px;display:block;margin:0 auto;margin-bottom:30px"
        alt
      />
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:360px;margin-right:35px"
          ></el-input>
          <el-button type="info">获取验证码</el-button>
        </el-form-item>

        <el-checkbox :value="true" style="margin-bottom:20px">我已阅读并同意用户协议和隐私条款</el-checkbox>

        <el-form-item>
          <el-button type="primary" style="width:100%" @click="checkForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    const jy = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13200000000',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: jy, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入正确验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkForm () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          // this.$http
          //   .post('authorizations', this.loginForm)
          //   .then(res => {
          //     // this.$router    获取当前路由对象
          //     console.log(res)
          //     // 保存用户信息（token）
          //     local.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码不正确')
          //   })
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            local.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码不正确')
          }
        }
      })
    }
  }
}
</script>

<style>
.content {
  width: 100%;
  height: 100%;
  background: url('../../assets/login_bg.jpg') no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
.box-card {
  width: 550px;
  height: 330px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
