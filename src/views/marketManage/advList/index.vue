<template>
  <div class="contain">
    <el-card class="content-card">
      <div slot="header">
        <el-button type="primary" @click="addBtn"> 新增 </el-button>
      </div>
      <el-table class="ad-table-c" :data="adList" border style="width: 100%">
        <el-table-column
          align="center"
          fixed
          type="index"
          prop="date"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="广告图片"
          width="200"
        >
          <template slot-scope="scope">
            <img class="ad-img" :src="scope.row.pic" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间" width="250">
          <template slot-scope="scope">
            <div>开始时间：{{ scope.row.createTime }}</div>
            <div>结束时间：{{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="广告名称"
          width="250"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="clickCount"
          label="点击数"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="orderCount"
          label="下单数"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="轮播位置"
          width="150"
        >
        </el-table-column>
        <el-table-column align="center" prop="url" label="链接位置" width="150">
        </el-table-column>
        <el-table-column align="center" prop="note" label="备注" width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="上下线状态"
          width="180"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button
              class="delete-btn"
              type="text"
              size="small"
              @click="deleteItem(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      class="ad-dialog-c"
      title="收货地址"
      :visible.sync="editDialogVisible"
      @close="dialogClose"
    >
      <el-form
        ref="adForm"
        :model="adDetailForm"
        class="ad-form"
        :rules="rules"
      >
        <el-form-item
          label-width="110px"
          label="广告名称"
          prop="name"
          class="ad-form-item"
        >
          <el-input
            size="mini"
            class="ad-info-input"
            v-model="adDetailForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="备注" class="ad-form-item">
          <el-input
            size="mini"
            class="ad-info-input"
            v-model="adDetailForm.note"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="排序" class="ad-form-item">
          <el-input
            size="mini"
            class="ad-info-input"
            v-model="adDetailForm.sort"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="产品数量" class="ad-form-item">
          <el-input
            size="mini"
            class="ad-info-input"
            v-model="adDetailForm.orderCount"
            autocomplete="off"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label-width="110px" label="链接" class="ad-form-item">
          <el-input
            size="mini"
            class="ad-info-input"
            v-model="adDetailForm.url"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label-width="110px"
          label="首页轮播图位置"
          class="ad-form-item"
        >
          <el-select v-model="adDetailForm.type" placeholder="请选择">
            <el-option
              v-for="item in typeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="110px" label="上线状态" class="ad-form-item">
          <el-switch
            v-model="adDetailForm.status"
            active-color="#13ce66"
            :active-value=1
            :inactive-value=0
          >
          </el-switch>
        </el-form-item>
        <el-form-item label-width="110px" label="开始时间" class="ad-form-item">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="adDetailForm.startTime"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="结束时间" class="ad-form-item">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="adDetailForm.endTime"
            type="datetime"
            placeholder="选择日期时间"
            size="mini"
            class="date-picker"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="110px" label="图片" class="ad-form-item">
          <el-upload
            class="avatar-uploader"
            action="/lejuAdmin/material/uploadFileOssSave"
            :headers="uploadHeader"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <img
              v-if="adDetailForm.pic"
              :src="adDetailForm.pic"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestAdList, addAd, editAd,deleteAd } from "@/api/marketManage";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      adList: [],
      editDialogVisible: false,
      adDetailForm: {
        endTime: "",
        name: "",
        note: "",
        orderCount: null,
        pic: "",
        sort: null,
        startTime: "",
        status: 0,
        type: null,
        url: "",
      },
      uploadHeader: {
        token: "",
      },
      typeOption: [
        {
          value: 0,
          label: "app轮播",
        },
        {
          value: 1,
          label: "1",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
      },
      subStatus: ''
    };
  },
  methods: {
    async initAdList() {
      const res = await requestAdList();
      this.adList = res.data.data.items;
    },
    addBtn() {
      this.editDialogVisible = true;
      this.subStatus = 'add';
    },
    handleEdit(item) {
      Object.assign(this.adDetailForm,item);
      this.editDialogVisible = true;
      this.subStatus = 'edit'
    },
    deleteItem(item) {
      // console.log(item);
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async(res) => {

          if(res == 'confirm') {
            const res = await deleteAd({
              adsId: item.id
            });
            if(res.data.success) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.initAdList()
            }
          }
        }).catch(err => {
          console.log(err);
        })
    },
    handleUploadSuccess(e) {
      this.adDetailForm.pic = e.data.material.ossUrl;
    },
    sub() {
      this.$refs.adForm.validate(async (valid) => {
        if (valid) {
          let res;
          if(this.subStatus == 'add') {
            res = await addAd({ data: this.adDetailForm });
          } else {
            res = await editAd({data: this.adDetailForm})
          }
          this.editDialogVisible = false;
          if (res.data.success) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.initAdList()
          }
        } else {
          this.$message({
            message: "请核对输入",
          });
          return false;
        }
      });
    },
    dialogClose() {
      this.adDetailForm = {
        endTime: "",
        name: "",
        note: "",
        orderCount: null,
        pic: "",
        sort: null,
        startTime: "",
        status: "0",
        type: "0",
        url: "",
      };
    },
  },
  created() {
    this.initAdList();
    this.uploadHeader.token = getToken();
  },
};
</script>

<style scoped lang='scss'>
@import "@/styles/variables.scss";
.contain {
  background-color: $themeBgc;
  .content-card {
    margin: 20px;
  }
  .ad-table-c {
    .ad-img {
      width: 100px;
      height: 100px;
    }
    .delete-btn {
      color: #f00;
    }
  }
  .ad-dialog-c {
    .ad-form {
      display: flex;
      flex-wrap: wrap;
      .ad-form-item {
        width: 50%;
        .ad-info-input {
          width: 90%;
        }
        .avatar-uploader {
          width: 178px;
          height: auto;
          text-align: center;
          line-height: 178px;
          .avatar-uploader-icon {
            height: 50px;
            width: 50px;
            font-size: 40px;
            text-align: center;
            line-height: 50px;
          }
          .avatar {
            width: 220px;
          }
        }
      }
    }
  }
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>