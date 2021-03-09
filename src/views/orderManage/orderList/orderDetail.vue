<template>
  <div class="contain" v-if="hasLoad">
    <el-card class="content-card">
      <div class="line-c">
        <el-steps
          :align-center="true"
          :active="orderInfo.orderBase.status + 1"
          finish-status="success"
        >
          <el-step title="待付款" description=""></el-step>
          <el-step title="待发货" description=""></el-step>
          <el-step title="已发货" description=""></el-step>
          <el-step title="已完成" description=""></el-step>
          <el-step title="已关闭" description=""></el-step>
        </el-steps>
      </div>
      <div class="line-c">
        <div class="content-title">
          <p class="title">订单信息：</p>
          <OrderTag
            class="order-tag"
            :status="this.orderInfo.orderBase.status"
          />
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <p>订单金额：{{ orderInfo.orderBase.totalAmount }}</p>
            <p>下单时间：{{ orderInfo.orderBase.createTime }}</p>
          </div>
          <div class="good-detail-item">
            <p>订单编号：{{ orderInfo.orderBase.orderSn }}</p>
            <p>付款时间：{{ orderInfo.orderBase.paymentTime }}</p>
          </div>
          <div class="good-detail-item">
            <p>用户账号：{{ orderInfo.orderBase.memberUsername }}</p>
            <p>发货时间：{{ orderInfo.orderBase.modifyTime }}</p>
          </div>
          <div class="good-detail-item">
            <p>备注：{{ orderInfo.orderBase.note }}</p>
            <p>收货时间：{{ orderInfo.orderBase.receiveTime }}</p>
          </div>
        </div>
      </div>
      <div class="line-c">
        <div class="content-title">
          <p class="title">收货人信息：</p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <p>收货人：{{ orderInfo.orderBase.receiverName }}</p>
            <p>地址：{{ addressComputed }}</p>
          </div>
          <div class="good-detail-item">
            <p>用户姓名：{{ orderInfo.orderBase.memberUsername }}</p>
            <p>详细地址：{{ orderInfo.orderBase.receiverDetailAddress }}</p>
          </div>
          <div class="good-detail-item">
            <p>手机号码：{{ orderInfo.orderBase.receiverPhone }}</p>
          </div>
          <div class="good-detail-item">
            <p>邮政编码：{{ orderInfo.orderBase.receiverPostCode }}</p>
          </div>
        </div>
      </div>
      <div class="line-c">
        <div class="content-title">
          <p class="title">商品信息：</p>
        </div>
        <el-table
          border
          class="product-table"
          :data="orderInfo.orderItems"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="productName"
            label="商品名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="productPic"
            label="商品图片"
            width="200"
          >
            <template slot-scope="scope">
              <img :src="scope.row.productPic" class="product-pic" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="isReturn"
            label="是否退货"
            width="100"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="productBrand"
            label="品牌"
            width="120"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="realAmount"
            label="价格"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="productQuantity"
            label="商品数量"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            prop="totalPrice"
            label="小计"
            width="200"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="line-c">
        <div class="content-title">
          <p class="title">费用信息：</p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <p>运费金额：{{ orderInfo.orderBase.freightAmount || 0 }}</p>
          </div>
          <div class="good-detail-item">
            <p>订单总金额：{{ orderInfo.orderBase.payAmount || 0 }}</p>
          </div>
          <div class="good-detail-item">
            <p>实际金额：{{ orderInfo.orderBase.totalAmount || 0 }}</p>
          </div>
          <div class="good-detail-item">
            <p>促销优化金额：{{ orderInfo.orderBase.promotionAmount || 0 }}</p>
          </div>
        </div>
      </div>
      <div class="line-c" v-if="orderInfo.orderBase.deliveryCompany">
        <div class="content-title">
          <p class="title">
            物流信息：{{ orderInfo.orderBase.deliveryCompany }}[{{
              orderInfo.orderBase.deliverySn
            }}]
          </p>
        </div>
        <el-table border :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="570">
          </el-table-column>
          <el-table-column prop="note" label="备注"> </el-table-column>
        </el-table>
      </div>
      <el-button class="close-btn" type="primary" @click="closeC" v-if="orderInfo.orderBase.status == 3">
        关闭订单
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { requestOrderDetail, closeOrder } from "@/api/orderManage";

import OrderTag from "@/components/OrderTag";
export default {
  data() {
    return {
      hasLoad: false,
      orderInfo: {},
      tableData: [
        {
          date: "2015-03-06 21:16:58",
          status: "深圳市横岗速递营销部已收件",
          note: "揽投员姓名：钟定基;联系电话：13883838888",
        },
        {
          date: "2015-03-07 14:25:00",
          status: "离开深圳市 发往广州市",
          note: "",
        },
        {
          date: "2015-03-08 00:17:00",
          status: "到达广东速递物流公司广航中心处理中心（经转）",
          note: "",
        },
        {
          date: "2015-03-08 01:15:00",
          status: "离开广州市 发往北京市（经转）",
          note: "",
        },
        {
          date: "2015-03-09 09:01:00",
          status: "到达北京黄村转运站处理中心（经转）",
          note: "",
        },
        {
          date: "2015-03-09 18:39:00",
          status: "离开北京市 发往呼和浩特市（经转）",
          note: "",
        },
        {
          date: "2015-03-10 18:06:00",
          status: "到达 呼和浩特市 处理中心",
          note: "",
        },
        {
          date: "2015-03-11 09:53:48",
          status: "呼和浩特市邮政速递物流分公司金川揽投部安排投递",
          note: "投递员姓名：安长虹;联系电话：18047140142",
        },
      ],
    };
  },
  methods: {
    async initInfo() {
      const id = this.$route.params.id;
      const res = await requestOrderDetail({
        id,
      });

      this.hasLoad = true;
      this.orderInfo = res.data.data.orderDetail;
      console.log(this.orderInfo);
    },
    async closeC() {
      const res = await closeOrder({
        orderId: this.orderInfo.orderBase.id
      })
      if(res.data.success) {
        this.$message({
          message: '关闭成功',
          type: 'success'
        })
        this.$route.push('/orderManage/orderList');
      }
    }
  },
  created() {
    this.initInfo();
  },
  components: {
    OrderTag,
  },
  computed: {
    addressComputed() {
      return `${this.orderInfo.orderBase.receiverProvince}-${this.orderInfo.orderBase.receiverCity}-${this.orderInfo.orderBase.receiverRegion}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.contain {
  padding: 20px;
  background-color: $themeBgc;
}

.content-card {
  margin: 20px;
  .line-c {
    padding: 30px 0;
    border-bottom: 2px solid #e9eaee;
    .content-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .title {
        font-weight: 700;
        font-size: 16px;
      }
      .order-tag {
        width: 52px;
        height: 22px;
        font-size: 12px;
        padding: 0;
        line-height: 22px;
        text-align: center;
        vertical-align: middle;
      }
    }
    .good-detail {
      display: flex;
      .good-detail-item {
        width: 25%;
        p {
          display: block;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          margin: 0;
        }
      }
    }

    .product-table {
      .product-pic {
        width: 100px;
        height: 100px;
      }
    }
  }

  .close-btn {
    display: block;
    width: 100px;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 14px;
    margin: 30px auto;
  }

  & ::v-deep .el-steps {
    width: 100%;
  }
  & ::v-deep .is-success {
    color: #409eff;
    border-color: #409eff;
  }
}
</style>