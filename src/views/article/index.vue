<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <my-input v-model="reqParams.channel_id"></my-input>
          <!-- <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="日期">
          <!-- v-model 绑定的数组  [起始时间,结束时间] -->
          <el-date-picker
            @change="getDate"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="shaiXuan">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>根据筛选结果查询到{{totle}}条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <el-image :src="scope.row.cover.images[0]" fit="fill" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" type="warning ">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success ">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="primary ">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="toEdit(scope.row.id)"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              type="danger"
              @click="toDel(scope.row.id)"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;text-align:center;"
        background
        layout="prev, pager, next"
        :total="totle"
        :page-size="reqParams. pagesize"
        :current-page="reqParams.page"
        @current-change="fPage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        pagesize: 20,
        page: 1
      },
      // 频道选项数据
      // channelOptions: [],
      // 日期数组
      dateArr: [],
      articles: [],
      totle: 0
    }
  },
  created () {
    // this.getOptions()
    this.getList()
  },
  methods: {
    // 获取频道信息
    // async getOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   // console.log(data)
    //   this.channelOptions = data.channels
    // },
    async getList () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 为什么要用对象传参
      console.log(data)
      this.articles = data.results
      this.totle = data.total_count
    },
    fPage (newPage) {
      this.reqParams.page = newPage
      this.getList()
    },
    shaiXuan () {
      // 数据已经绑定，不需要再考虑数据
      // 判断频道是否为空字符串
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.reqParams.page = 1
      // this.reqParams.channel_id = null
      this.getList()
    },
    getDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    async toDel (id) {
      await this.$http.delete(`barticles/${id}`)
      this.$message.success('删除成功')
      this.getList()
    }
  }

}
</script>

<style scoped lang='less'></style>
