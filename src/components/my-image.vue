<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <!-- 动态绑定src，便于预览图片 -->
      <img :src="value|| bgRound" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div>
            <el-radio-group
              size="small"
              style="width:100%"
              v-model="reqParams.collect"
              @change="todoList"
            >
              <!-- false 和 true 控制全部与收藏的切换 -->
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
              <!--dialogVisible 控制弹框的显示和隐藏，默认为false 隐藏 -->
            </el-radio-group>
          </div>
          <!-- 图片区 -->
          <div
            class="img-box"
            v-for="item in images"
            :key="item.id"
            @click="clickImage(item.url)"
            :class="{selected : scUrl === item.url}"
          >
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <div style="text-align:center;margin-top:20px">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="fn"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="shangchuan"
          >
            <img v-if="setUrl" :src="setUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- 点击确定后，预览图片 -->
        <el-button type="primary" @click="yL">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/default.png'
import local from '@/utils/local'
export default {
  props: ['value'],
  data () {
    return {
      // 设置预览默认图片地址
      bgRound: defaultImage,
      // 添加头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡name的值
      activeName: 'image',
      images: [],
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      //   定义一个选中素材的url
      scUrl: null,
      //   定义一个上传的图片的url
      setUrl: null
    }
  },
  methods: {
    // 确定按钮点击事件，预览图片
    yL () {
      // 先判断用户点击的是素材还是上传图片
      // image为素材图片
      if (this.activeName === 'image') {
        // 然后判断用户是否选中了图片
        if (this.scUrl) {
          // 如果选中了图片，就把选中的图片给了预览图 并且关闭弹窗 清空选中的图片
          this.dialogVisible = false
          // 向父组件传值
          // this.bgRound = this.scUrl
          this.$emit('input', this.scUrl)
          this.scUrl = null
        } else {
          this.$message.warning('请选择一张图片')
        }
      } else if (this.activeName === 'upload') {
        // 这是上传图片
        // 判断用户是否上传了
        if (this.setUrl) {
          // 如果上传了，就把上传的图片预览并且关闭弹窗 清空上传的图片
          // this.bgRound = this.setUrl
          // 向父组件传值
          this.$emit('input', this.setUrl)
          this.dialogVisible = false
          this.setUrl = null
        } else {
          this.$message.warning('请上传图片')
        }
      }
    },
    //   点击素材图片
    clickImage (url) {
      // 把点击的图片的URL给 定义的scUrl
      this.scUrl = url
    },
    //   上传功能
    shangchuan (res) {
      console.log(res.data)
      this.setUrl = res.data.url
      // 2. 提示
      this.$message.success('上传成功')
    },

    // 打开对话框
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 分页功能
    fn (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 获取图片列表
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    // 全部与收藏切换
    todoList () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-box {
  width: 150px;
  height: 120px;
  position: relative;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  //   伪类 加遮罩层和图片 点击哪个图片给哪个加selected这个类名
  &.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center /
      50px 50px;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
</style>
