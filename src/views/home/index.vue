<template>
  <div class="contents">
    <el-container class="one">
      <el-aside :width="isOpen? '200px':'64px'">
        <!-- 侧边栏 -->
        <div class="box" :class="{smallImg:!isOpen}"></div>
        <el-menu
          :default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          :collapse="!isOpen"
          :collapse-transition="false"
          active-text-color="#ffd04b"
          style="border:none;"
          router
        >
          <!-- el-submenu 拥有值二级菜单的菜单项目 el-menu-item 没有二级菜单的菜单项-->
          <!-- index作用  当前菜单唯一标识 -->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- //头部 -->
          <span
            class="el-icon-s-fold"
            @click="clickOpen"
            style="font-size:36px;vertical-align:middle"
          ></span>
          <span style="font-size:20px;vertical-align:middle;margin-left:10px;">江苏传智播客教育有限公司</span>
          <el-dropdown>
            <span class="el-dropdown-link" style="font-size:20px;">
              <img :src="userInfo.photo" />
              <span>{{userInfo.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="el-icon-setting" @click.native="mySelf">个人设置</el-dropdown-item>
              <p></p>
              <el-dropdown-item class="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      isOpen: true,
      userInfo: {}
    }
  },
  methods: {
    clickOpen () {
      this.isOpen = !this.isOpen
    },
    mySelf () {
      this.$router.push('/setting')
    },
    logout () {
      // this.$router.push('/login')
      local.delUser()
      this.$router.push('/login')
    }

  },
  created () {
    const User = local.getUser() || {}
    this.userInfo.name = User.name
    this.userInfo.photo = User.photo
  }
}
</script>

<style scoped lang='less'>
.contents {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .one {
    height: 100%;
    .el-aside {
      background: #002033;
      .box {
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center /
          140px auto;
      }
      .smallImg {
        background-image: url(../../assets/logo_admin_01.png);
        background-size: 36px auto;
      }
    }
    .el-header {
      border-bottom: 1px solid #ccc;
      line-height: 60px;
      .el-dropdown {
        float: right;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
