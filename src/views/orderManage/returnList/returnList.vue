<template>
  <div class="contain">
    <el-card class="card-c">
      <div slot="header">
        <div>条件查询</div>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="input-c">
            <p>订单编号</p>
            <el-input
              class="input-item"
              type="number"
              v-model="searchParam.orderSn"
              placeholder="请填写订单编号"
              size="mini"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>退单状态</p>
            <el-select
              clearable
              class="input-item"
              v-model="searchParam.status"
              placeholder="退单状态"
              size="mini"
            >
              <el-option
                v-for="item in returnStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="btn-bar-line">
          <div class="btn-bar">
            <el-button @click="searchC" type="primary" size="mini">
              搜索
            </el-button>
            <el-button @click="resetC" size="mini"> 重置 </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="table-card">
      <el-table :data="returnOrderList" border style="width: 100%">
        <el-table-column align="center" fixed type="index" label="#" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderSn"
          label="订单编号"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="payType"
          label="退单状态"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              class="pay-tag-c"
              effect="dark"
              v-if="scope.row.status == 0"
              type="danger"
            >
              待处理
            </el-tag>
            <el-tag
              class="pay-tag-c"
              effect="dark"
              type="warning"
              v-else-if="scope.row.status == 1"
            >
              退货中
            </el-tag>
            <el-tag
              class="pay-tag-c"
              type="primary"
              v-else-if="scope.row.status == 2"
            >
              已完成
            </el-tag>
            <el-tag
              class="pay-tag-c"
              type="info"
              v-else-if="scope.row.status == 3"
            >
              已拒绝
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="描述"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="reason"
          label="退单原因"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productName"
          label="商品名称"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="productAttr"
          label="商品属性"
          width="200"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.productAttr | producAttrFilter }}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="handleNote"
          label="商家备注"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="添加时间"
          width="200"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="seeOrderDetail(scope.row)"
              type="primary"
              size="small"
              class="see-btn"
            >
              <i class="iconfont el-icon-yanjing"></i>
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="returnOrderTotal"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { requestReturnOrder } from "@/api/orderManage";

import OrderTag from "@/components/OrderTag";
export default {
  data() {
    return {
      requestParam: {
        start: 1,
        limit: 10,
      },
      searchParam: {
        orderSn: "",
        status: null,
      },
      returnStatusList: [
        {
          value: 0,
          label: "待处理",
        },
        {
          value: 1,
          label: "退货中",
        },
        {
          value: 2,
          label: "已完成",
        },
        {
          value: 3,
          label: "已拒绝",
        },
      ],
      returnOrderList: [],
      returnOrderTotal: 0,
    };
  },
  components: {
    OrderTag,
  },
  methods: {
    async initInfo() {
      let data = {};
      for (const key in this.searchParam) {
        const element = this.searchParam[key];
        if (element !== "" && element !== null) {
          data[key] = this.searchParam[key];
        }
      }
      const res = await requestReturnOrder({
        start: this.requestParam.start,
        limit: this.requestParam.limit,
        data,
      });
      this.returnOrderList = res.data.data.rows;
      this.returnOrderTotal = res.data.data.total;
    },
    searchC() {
      this.initInfo();
    },
    resetC() {
      this.searchParam = {
        orderSn: "",
        status: null,
      };
    },
    seeOrderDetail(item) {
      this.$router.push({
        path: "/orderManage/returnDetail/" + item.id,
      });
    },
    handleSizeChange(e) {
      this.requestParam.limit = e;
      this.initInfo();
    },
    handleCurrentChange(e) {
      this.requestParam.start = e;
      this.initInfo();
    },
  },
  created() {
    this.initInfo();
    console.log("object");
  },
  filters: {
    producAttrFilter(val) {
      if (typeof val == "string") {
        try {
          let obj = JSON.parse(val);
          if (typeof obj == "object" && obj) {
            let str = '';
            obj.forEach(item => {
              str += `${item.key} : ${item.value};`;
            });
            return str
            return 
          } else {
            return val;
          }
        } catch (e) {
          
          return val;
        }
      }
      // let sVal = JSON.parse(val);
      // console.log(sVal);
      return 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.contain {
  background-color: $themeBgc;
  overflow: hidden;
  .card-c {
    margin: 20px;
    .input-c {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      p {
        display: block;
        margin: 0 20px;
        font-size: 14px;
        font-weight: 400;
      }
      .input-item {
        width: 200px;
      }
    }
    .btn-bar-line {
      text-align: right;
      margin: 30px 0;
      .btn-bar {
        padding-right: 30px;
      }
    }
  }
  .table-card {
    margin: 20px;
    .pay-tag-c {
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      margin: auto;
    }
    .zhifubao-class {
      font-size: 25px;
    }
    .weixin-class {
      font-size: 20px;
    }

    .see-btn {
      width: 150px;
      height: 28px;
      line-height: 28px;
      padding: 0;
      margin: auto;
      & ::v-deep span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .iconfont {
        margin: 0 5px;
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