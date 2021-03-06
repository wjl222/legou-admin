<template>
  <div class="contain">
    <el-card class="article-main">
      <div slot="header" class="clearfix">
        <span>新增文章</span>
      </div>
      <el-form
        class="emit-article-form"
        :rules="rules"
        ref="articleForm"
        :model="article"
        label-width="120px"
      >
        <div class="top-input">
          <el-form-item class="author" prop="author" label="作者">
            <el-input
              class="input"
              size="mini"
              v-model="article.author"
            ></el-input>
          </el-form-item>
          <el-form-item class="article-title" prop="title" label="标题">
            <el-input
              class="input"
              size="mini"
              v-model="article.title"
            ></el-input>
          </el-form-item>
          <el-form-item class="is-show" label="是否显示">
            <el-switch
              v-model="isShowB"
              @change="changeShow"
              value="1"
              active-color="#13ce66"
            >
            </el-switch>
          </el-form-item>
        </div>
        <el-form-item label="摘要" class="summary-form-item">
          <el-input
            class="summary-input"
            size="mini"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="article.summary"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="封面图片" class="top-image">
          <el-upload
            class="upload-btn"
            action="/lejuAdmin/material/uploadFileOss"
            :multiple="false"
            :headers="uploadImgHeaders"
            :limit="1"
            :on-success="onloadImgSuccess"
            list-type="text"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传素材</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <div class="img-c">
            <img v-if="article.coverImg" :src="article.coverImg" alt="" />
          </div>
        </el-form-item>
        <el-form-item size="300" class="chang-text-type" label="切换富文本类型">
          <el-radio
            @change="radioChange"
            v-model="article.editorType"
            :label="0"
            >富文本</el-radio
          >
          <el-radio
            @change="radioChange"
            v-model="article.editorType"
            :label="1"
            >MarkDown</el-radio
          >
          <el-alert
            class="warn-c"
            title=" 注意!切换编辑器会清空编辑内容"
            type="warning"
            show-icon
            :closable="false"
          >
          </el-alert>
        </el-form-item>
        <Tinymce
          ref="tinymce"
          :height="300"
          v-if="article.editorType == 0"
        ></Tinymce>
        <Editor :value='article.content1' ref="editorItem" v-else-if="article.editorType == 1" />
        <el-button class="sub" type="primary" @click="sub">
          立即修改
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight

import { requestArticleDetail,uploadArticleDetail } from "@/api/article";
import { getToken } from "@/utils/auth";
import Tinymce from "@/components/Tinymce";
import Editor from "@/components/MarkdownEditor";

export default {
  data() {
    return {
      article: {
        author: "",
        collectCount: 0,
        content1: "",
        content2: "",
        coverImg: "",
        createTime: "",
        editorType: null,
        id: "",
        isShow: 0,
        modifyTime: "",
        summary: "",
        title: "",
        viewCount: 0,
        zanCount: 0,
      },
      isShowB: false,
      uploadImgHeaders: {},
      rules: {
        author: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入标题", trigger: "change" }],
      },
    };
  },
  components: { Tinymce, Editor },
  methods: {
    async initInfo() {
      this.uploadImgHeaders = {
        token: getToken(),
      };
      this.article.id = this.$route.params.id;
      const res = await requestArticleDetail({ id: this.article.id });
      this.article = Object.assign(this.article, res.data.data.productArticle);

      if (this.article.isShow == 0 || this.article.isShow == null) {
        this.isShowB = false;
      } else {
        this.isShowB = true;
      }
    },
    radioChange() {
      this.article.content1 = this.article.content2 = '';
    },
    changeShow(e) {
      if (e) {
        this.article.isShow = 1;
      } else {
        this.article.isShow = 0;
      }
    },
    onloadImgSuccess(e) {
      this.article.coverImg = e.data.fileUrl;
    },
    setTinymce(val) {
      if (!!val || val === '') {
        this.$refs.tinymce.setContent(val);
      }
    },
    setMarkDown(val) {
      if(!!val || val === '') {
        this.$refs.editorItem.setValue(val)
        this.$refs.editorItem.setHtml(val)
      }
    },
    /**
     * 时间格式yyyy-MM-dd HH:mm:ss
     */

    getDate() {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const strDate = date.getDate().toString().padStart(2, "0");
       const time = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return time
    },
     sub() {
      if (this.article.editorType == 0) {
        this.article.content2 = this.article.content1 = this.$refs.tinymce.getContent();
      } else if (this.article.editorType == 1) {
        this.article.content1 = this.$refs.editorItem.getValue();
        this.article.content2 = this.$refs.editorItem.getHtml();
      }

      if (!this.article.content2 || !this.article.content1) {
        this.$message({
          message: '文章内容不能为空',
           type: 'warning'
        });
        return false;
      }

      this.$refs.articleForm.validate((valid) => {
        if (valid) {
          this.article.modifyTime = this.getDate();
          uploadArticleDetail({
             data: this.article
           });
           this.$message({
             type: 'success',
             message: '更新成功！'
           })
           this.$router.push('/article')
        } else {
          this.$message({
          message: '未按要求填入的内容',
           type: 'warning'
        });
          return false;
        }
      });
    },
  },
  created() {
    this.initInfo();
  },
  mounted() {
    // console.log(this.$route.params.id);
  },
};
</script>

<style scoped lang='scss'>
@import "@/styles/variables.scss";
.contain {
  overflow: hidden;
  background-color: $themeBgc;
}
.article-main {
  margin: 30px;
  .emit-article-form {
    .top-input {
      display: flex;
      justify-content: flex-start;
      .input {
        width: 300px;
      }
    }
  }
  .summary-form-item {
    .summary-input {
      width: 800px;
    }
  }
  .top-image {
    .upload-btn {
      width: 400px;
      .el-upload__tip {
      }
    }
    .img-c {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .chang-text-type {
    & ::v-deep .el-form-item__content {
      width: 800px;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
    }
    .warn-c {
      width: 300px;
    }
  }
  .sub {
    display: block;
    margin: 50px auto;
  }
}
</style>