<template>
  <div class="contain">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="searchForm" label-width="80px">
        <el-row :gutter="20" class="query-input-c">
          <el-col :span="6">
            <div class="grid-content">
              <p class="title">作者</p>
              <el-input
                size="small"
                class="info-input"
                v-model="searchForm.author"
                placeholder="作者"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <p class="title article-title">标题</p>
              <el-input
                size="small"
                class="info-input"
                v-model="searchForm.title"
                placeholder="标题"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <p class="title">编辑类型</p>
              <el-select
                v-model="searchForm.editType"
                placeholder="编辑类型"
                size="small"
              >
                <el-option
                  v-for="(item,index) in editTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="index"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6" :offset="18">
            <div class="grid-content">
              <el-button size="mini">重置</el-button>
              <el-button type="primary" size="mini" @click="onSubmitSearch"
                >搜索</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="form-list_card">
      <div slot="header" class="clearfix">
        <router-link to="/article/addArticle">
          <el-button type="primary"> 新增 </el-button>
        </router-link>
      </div>

      <el-table
        class="article-list"
        :data="articleList"
        border
        style="width: 100%"
      >
        <el-table-column align="center" type="index" fixed label="#" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="title"
          label="文章标题"
          width="250"
        >
        </el-table-column>
        <el-table-column
          align="center"
          class="table-col"
          label="展示图片"
          width="200"
        >
          <template slot-scope="scope">
            <img class="article-image" :src="scope.row.coverImg" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="添加时间"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="author"
          label="文章作者"
          width="200"
        >
        </el-table-column>
        <el-table-column align="center" label="文章是否显示" width="200">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isShow" active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容" width="200">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.editorType !== null">
              {{ scope.row.editorType === 0 ? "富文本" : "MarkDown" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑文章</el-button
            >
            <el-button
              @click="deleteArticle(scope.row)"
              class="delete-btn"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[3, 6, 9, 12]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleTotal"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { requestArticleInfo, deleteArticleR } from "@/api/article";
export default {
  data() {
    return {
      searchForm: {
        author: "",
        editType: "",
        title: "",
      },
      editTypeList: [
        {
          value: "2",
          label: "富文本",
        },
        {
          value: "1",
          label: "MarkDown",
        },
      ],
      articleList: [],
      articleTotal: 0,
      params: {
        pagenum: 1,
        limit: 3,
      },
    };
  },
  methods: {
    onReset() {
      this.searchForm = {
        author: '',
        editType: '',
        title: ''
      };
      this.initInfo()
    },
    onSubmitSearch() {
       this.initInfo()
    },
    handleEdit(row) {
      this.$router.push(`/article/editArticle/${row.id}`);
    },
    
    async initInfo() {
      const data = {};
      for (const item in this.searchForm) {
        if(this.searchForm[item] !== '') {
          data[item] = this.searchForm[item]
        }
      }
      const res = await requestArticleInfo({
        limit: this.params.limit,
        pagenum: this.params.pagenum,
        data
      });
      this.articleList = res.data.data.rows;
      this.articleTotal = res.data.data.total;
      this.articleList.forEach((item) => {
        item.isShow = item.isShow == 1;
      });
    },
    handleCurrentChange(e) {
      this.params.pagenum = e;
      this.initInfo();
    },
    handleSizeChange(e) {
      this.params.limit = e;
      this.initInfo();
    },
    handleEdit(a, b) {
      console.log(a, b);
    },
    // 删除文章
    async deleteArticle(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          const res = await deleteArticleR({
            id: item.id,
          });
          this.initInfo()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      
    },
  },
  created() {
    this.initInfo();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.top-card {
  margin: 30px;
}
.contain {
  color: $themeBgc;
  .query-input-c {
    padding: 0px 10px;
    .grid-content {
      display: flex;
      align-items: center;
      padding: 10px;
      .title {
        width: 100px;
        text-align: right;
        padding-right: 20px;
      }
      // .info-input {
      //     display: block;
      //     height: 32px;
      //     line-height: 32px;
      // }
    }
  }

  .form-list_card {
    .article-list {
      el-table-column {
        box-sizing: content-box;
        padding: 12px 0;
        text-align: center;
      }
      img {
        width: 100px;
        height: 100px;
      }
    }
    .delete-btn {
      color: #f00;
    }
  }
}
</style>