<template>
  <div class="contain">
    <el-card class="content-card">
      <div slot="header" class="content-top">
        <el-upload
          class="upload-demo"
          action="/lejuAdmin/material/uploadFileOssSave"
          :show-file-list="false"
          :headers="headers"
          :on-success="uploadMaterial"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>





        <!-- <el-button type="primary">点击上传素材</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div> -->
      </div>
      <div class="material-c">
        <el-card
          class="material-card"
          v-for="(item, index) in meteriallList"
          :key="index"
          body-style="{padding: '20px'}"
        >
          <div slot="header" class="material-top">
            <p>上传时间：{{ item.createTime }}</p>
          </div>
          <img class="material-img" :src="item.ossUrl" />
          <div class="delete-contain">
            <el-button @click="deleteItem(item)" class="delete-btn" type="danger" size="mini">
              删除
            </el-button>
          </div>
        </el-card>
        <div class="blank-card" shadow='never'></div>
        <div class="blank-card" shadow='never'></div>
        <div class="blank-card" shadow='never'></div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { requestMeterial, deleteMeterial } from "@/api/article";
import { getToken } from '@/utils/auth'; 

export default {
  data() {
    return {
      params: {
        start: 1,
        limit: 10,
      },
      meteriallList: [],
      total: 0,
      headers: {
          token: ''
      }
    };
  },
  methods: {
    async initInfo() {
      const res = await requestMeterial({
        start: this.params.start,
        limit: this.params.limit,
      });
      this.meteriallList = res.data.data.rows;
      this.total = res.data.data.total;
    },
    handleCurrentChange(e) {
      this.params.start = e;
      this.initInfo();
    },
    handleSizeChange(e) {
      this.params.limit = e;
      this.initInfo();
    },
    uploadMaterial(res) {
        if(res.success) {
            this.initInfo()
        }
    },
    async deleteItem(item) {
        const res = await deleteMeterial({id: item.id});
        if(res.data.success) {
            this.initInfo()
        }
    }
  },
  created() {
    this.initInfo();
    this.headers.token = getToken();
  },
};
</script>

<style scoped lang='scss'>
@import "@/styles/variables.scss";
.contain {
  background-color: $themeBgc;
}
.content-card {
  margin: 20px;
  .material-c {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .material-card {
      box-sizing: content-box;
      width: 16%;
      height: 400px;
      padding: 20px;
      margin-top: 20px;
      & ::v-deep .el-card__header {
        width: 100%;
        padding: 0;
      }
      & ::v-deep .el-card__body {
        padding: 0;
      }
      .material-top {
        font-size: 14px;
        display: block;
        width: 80%;
        padding: 0;
      }
      .material-img {
        width: 100%;
        height: 250px;
        margin-top: 30px;
      }
      .delete-contain {
        margin-top: 10px;
        .delete-btn {
          width: 90px;
        }
        text-align: right;
      }
    }
  }
}
.blank-card {
  display: block;
  width: 20%;
  height: 0;
}
</style>