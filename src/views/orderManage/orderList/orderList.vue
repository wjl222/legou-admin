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
              v-model="searchParam.deliverySn"
              placeholder="请填写订单编号"
              size="mini"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>订单类型</p>
            <el-select
              clearable
              class="input-item"
              v-model="searchParam.orderType"
              placeholder="请选择订单类型"
              size="mini"
            >
              <el-option
                v-for="item in orderTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>支付方式</p>
            <el-select
              clearable
              class="input-item"
              v-model="searchParam.payType"
              placeholder="请选择支付方式"
              size="mini"
            >
              <el-option
                v-for="item in payList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>订单状态</p>
            <el-select
              clearable
              class="input-item"
              v-model="searchParam.status"
              placeholder="请选择订单状态"
              size="mini"
            >
              <el-option
                v-for="item in orderStatusList"
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
      <el-table :data="orderList" border style="width: 100%">
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
          label="支付方式"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag
              class="pay-tag-c"
              effect="dark"
              v-if="scope.row.payType == 1"
            >
              <svg-icon icon-class="zhifubao" class-name="zhifubao-class" />
            </el-tag>
            <el-tag
              class="pay-tag-c"
              effect="dark"
              type="success"
              v-else-if="scope.row.payType == 2"
            >
              <svg-icon icon-class="weixin" class-name="weixin-class" />
            </el-tag>
            <el-tag class="pay-tag-c" effect="dark" v-else type="info">
              未支付
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="订单状态"
          width="200"
        >
          <template slot-scope="scope">
            <OrderTag :status="scope.row.status" />
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
          prop="memberUsername"
          label="用户账号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderType"
          label="订单类型"
          width="200"
        >
          <el-tag type="success"> 正常订单 </el-tag>
        </el-table-column>
        <el-table-column
          align="center"
          prop="promotionInfo"
          label="备注"
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
        :total="orderTotal"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { requestOrderList } from "@/api/orderManage";

import OrderTag from "@/components/OrderTag";
export default {
  data() {
    return {
      requestParam: {
        start: 1,
        limit: 10,
      },
      searchParam: {
        deliverySn: "",
        id: "",
        memberUsername: "",
        orderSn: "",
        orderType: null,
        payType: null,
        sourceType: null,
        status: null,
      },
      orderTypeList: [
        {
          value: 0,
          label: "正常订单",
        },
        {
          value: 1,
          label: "秒杀订单",
        },
      ],
      payList: [
        {
          value: 0,
          label: "未支付",
        },
        {
          value: 1,
          label: "支付宝",
        },
        {
          value: 2,
          label: "微信",
        },
      ],
      orderStatusList: [
        {
          value: 0,
          label: "待付款",
        },
        {
          value: 1,
          label: "代发货",
        },
        {
          value: 2,
          label: "已发货",
        },
        {
          value: 3,
          label: "已完成",
        },
        {
          value: 4,
          label: "已关闭",
        },
        {
          value: 5,
          label: "无效订单",
        },
      ],
      orderList: [],
      orderTotal: 0,
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
      const res = await requestOrderList({
        start: this.requestParam.start,
        limit: this.requestParam.limit,
        data,
      });
      this.orderList = res.data.data.rows;
      this.orderTotal = res.data.data.total;
    },
    searchC() {
      this.initInfo();
    },
    resetC() {
      this.searchParam = {
        deliverySn: "",
        id: "",
        memberUsername: "",
        orderSn: "",
        orderType: null,
        payType: null,
        sourceType: null,
        status: null,
      };
    },
    seeOrderDetail(item) {
      this.$router.push({
        path: "/orderManage/orderDetail/" + item.id,
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