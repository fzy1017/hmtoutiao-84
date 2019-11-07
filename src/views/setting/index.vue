<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editUser">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :http-request="uploadPhoto"
            :show-file-list="false"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
import local from '@/utils/local'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null,
        id: null,
        photo: null,
        mobile: null
      }
    }
  },
  methods: {
    // 获取当前用户信息
    async getUserm () {
      const { data: { data } } = await this.$http.get('user/profile')
      console.log(data)
      this.userInfo = data
    },
    // 点击保存用户信息(修改)
    async editUser () {
      // 解构赋值  name intro email
      // const { name, intro, email } = this.userInfo
      const { data: { data } } = await this.$http.patch('user/profile', { name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email })
      // 提示用户保存成功
      this.$message.success('保存成功')
      // 向home组件中传递数据  谁传递 谁触发
      eventBus.$emit('updateName', data)
      // 然后修改存储数据
      // 1.拿到后台存储的信息
      const user = local.getUser()
      // 2.更改信息
      user.name = data.name
      // 3.保存信息
      local.setUser(user)
    },
    // 上传头像
    async uploadPhoto ({ file }) {
      // result.file 是你选择图片后的文件对象
      // 获取文件对象  文档没有记录
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 提示
      this.$message.success('修改头像成功')
      // 预览
      this.userInfo.photo = data.photo
      // 更新home组件头像
      eventBus.$emit('updatePhoto', data.photo)
      // 更新本地存储的头像
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  },
  created () {
    this.getUserm()
  }
}
</script>

<style scoped lang='less'></style>
