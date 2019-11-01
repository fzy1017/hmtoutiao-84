<template>
  <div class="container-img">
    <!-- 卡片 -->
    <el-card>
      <!-- 头部面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div>
        <el-radio-group
          size="small"
          style="width:100%"
          v-model="reqParams.collect"
          @change="todoList"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
          <el-button
            style="float:right"
            type="success"
            size="small"
            @click="dialogVisible = true"
          >添加素材</el-button>
        </el-radio-group>
      </div>
      <!-- 图片区 -->
      <div class="img-box" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div v-if="!reqParams.collect">
          <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="SC(item)"></span>
          <span class="el-icon-delete-solid" @click="delImg(item.id)"></span>
        </div>
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
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        name="image"
        :on-success="shangchuan"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      // 对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    //   发送请求 渲染图片素材
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    // 分页效果
    fn (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 列表切换（收藏，全部）
    todoList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 点击收藏
    async SC (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      item.is_collected = data.collect
    },
    // 删除
    delImg (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击了确认
        await this.$http.delete(`user/images/${id}`)
        // 删除成功
        this.$message.success('删除成功')
        // 更新列表
        this.getImages()
      }).catch(() => {
        // 点击了取消
      })
    },
    // 上传图片
    shangchuan (res) {
      // 获取上传成功的图片地址  res.data.url
      console.log(res.data)
      this.reqParams.imageUrl = res.data.url
      // 2. 提示
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 3. 2s 关闭对话框
        // 4. 2s 更新列表
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style scoped lang='less'>
.img-box {
  width: 180px;
  height: 180px;
  border: 1px #ccc dashed;
  margin-top: 20px;
  margin-right: 50px;
  position: relative;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.4);

    span {
      margin-right: 10px;
    }
    span.red {
      color: red;
    }
  }
}
</style>
