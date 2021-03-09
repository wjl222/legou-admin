<template>
  <div class="contain">
    <el-card class="content-card">
      <div slot="header">
        <el-button type="primary" @click="addLimitActivity"> 新增 </el-button>
      </div>
      <el-table class="table-c" :data="limitActList" border style="width: 100%">
        <el-table-column
          align="center"
          fixed
          type="index"
          width="50"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          class="good-image"
          label="商品图片"
          width="150"
        >
          <template slot-scope="scope">
            <img class="img" :src="scope.row.pic" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="promotionStartTime"
          label="活动时间"
          width="300"
        >
          <template slot-scope="scope">
            <p>开始时间：{{ scope.row.promotionStartTime }}</p>
            <p>结束时间：{{ scope.row.promotionEndTime }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否过期" width="120">
          <template slot-scope="scope">
            <p>{{ scope.row.isLate ? "过期" : "否" }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="商品名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="brandName"
          label="品牌名称"
          width="250"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="商品价格"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productCategoryName"
          label="商品类别"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间 "
          width="350"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button class="delete-btn" @click="handleDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增 -->
    <el-dialog
      title="热销详情"
      :visible.sync="addDialogTableVisible"
      width="1200px"
      class="out-Dialog"
    >
      <el-card>
        <div slot="header" class="filtrate-header">
          <span>条件查询</span>
        </div>
        <el-row>
          <el-col :span="4">
            <el-input
              v-model="filtrate.name"
              placeholder="商品名称/模糊查询"
              size="mini"
              class="search-input"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input
              class="search-input"
              v-model="filtrate.productSn"
              placeholder="商品货号"
              size="mini"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-select
              class="search-input"
              v-model="filtrate.brandId"
              placeholder="品牌"
              size="mini"
            >
              <el-option
                v-for="item in goodList"
                :key="item.id"
                :label="item.brandName"
                :value="item.brandId"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              class="search-input"
              v-model="filtrate.publishStatus"
              placeholder="上架状态"
              size="mini"
            >
              <el-option
                v-for="(item, index) in onStatusOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select
              class="search-input"
              v-model="filtrate.verifyStatus"
              placeholder="审核状态"
              size="mini"
            >
              <el-option
                v-for="(item, index) in auditStatusOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button size="mini" @click="resetSearch"> 重置 </el-button>
            <el-button type="primary" size="mini" @click="searchGood">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="good-list-card">
        <div slot="header">
          <span>商品列表</span>
        </div>

        <el-table
          class="popup-goodlist"
          ref="goodList"
          :data="goodList"
          style="width: 100%"
        >
          <el-table-column align="center" type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column align="center" width="100" label="选择">
            <template slot-scope="scope">
              <!-- <el-radio @change="ccc(scope.row)"></el-radio> -->
              <el-button type="primary" @click="editItem(scope.row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品图片" width="200">
            <template slot-scope="scope">
              <img class="good-img" :src="scope.row.pic" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="商品名称"
            width="130"
          >
            <template slot-scope="scope">
              <p>名称：{{ scope.row.name }}</p>
              <p>品牌：{{ scope.row.brandName }}</p>
              <p>描述：{{ scope.row.description }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="price"
            label="商品价格"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="productCategoryName"
            label="商品类别"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="weight"
            label="重量"
            width="200"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleGoodListSizeChange"
          @current-change="handleGoodListCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="goodListTotal"
        >
        </el-pagination>

        <!-- 内部dialog -->
        <el-dialog
          width="50%"
          title="编辑限时活动"
          :visible.sync="innerDialogTableVisible"
          append-to-body
          class="innerDialog"
        >
          <el-form ref="form" :rules="rules" :model="innerDialogGoodItem" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="100px" label="商品原价">
                  <div>{{ innerDialogGoodItem.price }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="100px" label="商品名称">
                  <div>{{ innerDialogGoodItem.name }}</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="100px" label="促销价格" prop="promotionPrice">
                  <el-input-number
                    :min="0"
                    size="mini"
                    v-model="innerDialogGoodItem.promotionPrice"
                  ></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="100px" label="排序" prop="sort">
                  <el-input-number
                    size="mini"
                    v-model="innerDialogGoodItem.sort"
                    :min='0'
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="100px" label="开始时间" prop="promotionStartTime">
                  <el-date-picker
                    size="mini"
                    v-model="innerDialogGoodItem.promotionStartTime"
                    type="datetime"
                    placeholder="选择开始日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="100px" label="结束时间" prop="promotionEndTime">
                  <el-date-picker
                    size="mini"
                    v-model="innerDialogGoodItem.promotionEndTime"
                    type="datetime"
                    placeholder="选择结束日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="100px" label="活动限购数量" prop="promotionPerLimit">
                  <el-input
                    size="mini"
                    class="activity-input"
                    v-model="innerDialogGoodItem.promotionPerLimit"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="100px" label="商品图片">
                  <img
                    class="inner-diaLog-img"
                    :src="innerDialogGoodItem.pic"
                    alt=""
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="sub-c">
              <el-button @click="innerCancelSub"> 取消 </el-button>
              <el-button type="primary" @click="innerEditSub"> 编辑 </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  requestLimitAct,
  deleteLimitAction,
  requestGoodList,
  uploadLimitActivity,
} from "@/api/marketManage";

export default {
  data() {
    return {
      limitActList: [],
      addDialogTableVisible: false,
      innerDialogTableVisible: false,
      filtrate: {
        name: "",
        brandId: "",
        productSn: "",
        publishStatus: "",
        verifyStatus: "",
      },
      onStatusOption: [
        {
          value: "1",
          label: "上架",
        },
        {
          value: "0",
          label: "未上架",
        },
      ],
      auditStatusOption: [
        {
          value: "1",
          label: "审核",
        },
        {
          value: "0",
          label: "未审核",
        },
      ],
      goodList: [],
      goodListParam: {
        start: 1,
        limit: 10,
      },
      goodListTotal: 0,
      innerDialogGoodItem: {},
      rules: {
        promotionPrice: [
          {
            required: true,
            message: "输入促销价格",
            trigger: "blur"
          }
          
        ],
        sort: [
          {
            required: true,
            message: "输入排序",
            trigger: "blur"
          },
        ],
        promotionStartTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        promotionEndTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        promotionPerLimit: [
          {
            required: true,
            message: "请输入限购数量",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async initInfo() {
      const res = await requestLimitAct();
      this.limitActList = res.data.data.items;
      this.total = res.data.data.items.length;
      // 过滤时间
      let nowDate = new Date().getTime();
      this.limitActList.filter((item) => {
        const lateTime = new Date(item.promotionEndTime).getTime();
        item.isLate = lateTime < nowDate;
      });
    },
    async requestGoodList() {
      const data = {};
      for (let i in this.filtrate) {
        if (this.filtrate[i] !== "") {
          data[i] = this.filtrate[i];
        }
      }
      // 请求商品
      const goodListRes = await requestGoodList({
        start: this.goodListParam.start,
        limit: this.goodListParam.limit,
        data,
      });
      this.goodList = goodListRes.data.data.rows;
      console.log(this.goodList);
      this.goodListTotal = goodListRes.data.data.total;
    },
    // 添加事件
    addLimitActivity() {
      this.addDialogTableVisible = true;
    },
    async handleDelete(item) {
      const res = await deleteLimitAction({
        id: item.recommendId,
      });
      if(!!res.data.success) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
      this.initInfo()
    },
    editItem(e) {
      this.innerDialogGoodItem = {
        brandName: e.brandName,
        createTime: e.createTime,
        modifyTime: e.modifyTime,
        name: e.name,
        pic: e.pic,
        price: e.price,
        productCategoryName: e.productCategoryName,
        productId: e.id,
        productSn: e.productSn,
        promotionEndTime: "",
        promotionPerLimit: 0,
        promotionPrice: 0,
        promotionStartTime: "",
        publishStatus: e.publishStatus,
        sort: 0
      };

      this.innerDialogTableVisible = true;
    },
    handleGoodListSizeChange(i) {
      this.goodListParam.limit = i;
      this.requestGoodList();
    },
    handleGoodListCurrentChange(i) {
      this.goodListParam.start = i;
      this.requestGoodList();
    },
    innerCancelSub() {
      this.innerDialogTableVisible = false;
    },
     innerEditSub() {
      console.log(this.innerDialogGoodItem);
      this.$refs["form"].validate(async(valid) => {

          if (valid) {
            const res = await uploadLimitActivity({
              data: this.innerDialogGoodItem,
            });
            if (!!res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
            }
            this.initInfo();
            this.addDialogTableVisible = false;
            this.innerDialogTableVisible = false;
          } else {
            this.$message({
              message:'为按要求填写信息',
              type: 'warning'
            })
            return false;
          }
        });
    },
    searchGood() {
      this.requestGoodList();
    },
    resetSearch() {
      this.filtrate = {
        name: "",
        brandId: "",
        productSn: "",
        publishStatus: "",
        verifyStatus: "",
      };
      this.requestGoodList();
    },
  },
  created() {
    this.initInfo();
    this.requestGoodList();
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
  .table-c {
    .img {
      width: 100px;
      height: 100px;
    }
    .delete-btn {
      color: #f00;
    }
  }

  .good-list-card {
    height: 750px;
    overflow-y: scroll;
    .popup-goodlist {
      .good-img {
        width: 50px;
        height: 50px;
      }
    }
  }
}

.out-Dialog {
  .search-input {
    width: 80%;
    margin: auto;
  }
}

.innerDialog {
  .inner-diaLog-img {
    width: 150px;
    height: auto;
  }
  .activity-input {
    width: 170px;
  }
  .sub-c {
    display: flex;
    justify-content: flex-end;
  }
}
</style>