<template>
  <div class="container-pubish">
    <el-card>
      <!-- 头部面包屑 -->
      <div slot="header">
        <my-bread>{{$route.query.id ?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 单图的视图 -->
          <div v-if="articleForm.cover.type == 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三图视图 -->
          <div v-if="articleForm.cover.type == 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
          <!-- 无图 -->
          <div v-if="articleForm.cover.type == 0"></div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-input v-model="articleForm.channel_id"></my-input>
        </el-form-item>
        <!-- 判断当前是编辑还是发表 控制显示隐藏 -->
        <el-form-item v-if="$route.query.id">
          <!-- 点击事件 与下面差不多 下面是发表，这个是编辑(修改) -->
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <!-- 注册点击事件 发送请求 判断是 发表 还是存入草稿   draft  true 或 false  是否存为草稿（true 为草稿） -->
          <el-button type="primary" @click="fabiao(false)">发表</el-button>
          <el-button @click="fabiao(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          images: [],
          type: 1
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    async fabiao (draft) {
      // 发送请求
      await this.$http.post(`articles?${draft}`, this.articleForm)
      // 提示用户是发表成功||存为草稿成功
      this.$message.success(draft ? '存为草稿成功' : '发表成功')
      // 跳转到内容管理页面
      this.$router.push('/article')
    },
    // 获取文章信息（对应id的文章）
    async getlist (id) {
      const { data: { data } } = await this.$http.get('articles/' + id)
      this.articleForm = data
    },
    // 编辑文章
    async edit (draft) {
      await this.$http.put(`articles/${this.articleForm.id}?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      // 去内容管理
      this.$router.push('/article')
    },

    // 判断当前地址栏是否有id值，如果有则为编辑文章，若没有则为发布
    todoList () {
      // 定义变量获取地址栏中的id
      const articleId = this.$route.query.id
      // 判断是否有值
      if (articleId) {
        // 渲染当前编辑的文章
        this.getlist(articleId)
      } else {
        // 如果没有id，则为编辑页面，清空表带内的内容
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            images: [],
            type: 1
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    // 调用todoList
    this.todoList()
  },
  // 当路由规则没有发生改变的时候，组件是不会重新初始化
  // 只有组件初始化的时候才会只会执行一次。
  // 监听地址栏参数的变化，执行下面代码
  watch: {
    '$route.query.id': function () {
      this.todoList()
    }
  }

}
</script>

<style scoped lang='less'>
</style>
