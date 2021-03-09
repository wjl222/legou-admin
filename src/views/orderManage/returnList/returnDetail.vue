<template>
  <div class="contain" v-if="hasLoad">
    <el-card class="content-card">
      <div class="line-c">
        <div class="content-title">
          <p class="title">
            订单信息：
            <el-tag
              class="order-tag"
              effect="dark"
              v-if="returnOrderInfo.status == 0"
              type="danger"
            >
              待处理
            </el-tag>
            <el-tag
              class="order-tag"
              effect="dark"
              type="warning"
              v-else-if="returnOrderInfo.status == 1"
            >
              退货中
            </el-tag>
            <el-tag
              class="order-tag"
              type="primary"
              v-else-if="returnOrderInfo.status == 2"
            >
              已完成
            </el-tag>
            <el-tag
              class="order-tag"
              type="info"
              v-else-if="returnOrderInfo.status == 3"
            >
              已拒绝
            </el-tag>
          </p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <div class="order-sn">
              订单：{{ returnOrderInfo.orderSn }}
              <el-button size="mini" class="see-detail" type="primary" @click="seeOrderDetail"
                >查看订单详情</el-button
              >
            </div>
            <div>申请时间：{{ returnOrderInfo.createTime }}</div>
            <div>
              退单图片：
              <div class="img-c" v-if="proofPicsList.length">
                <img
                  v-for="(item, index) in proofPicsList"
                  :key="index"
                  :src="item"
                />
              </div>
            </div>
          </div>
          <div class="good-detail-item">
            <div>退单人姓名：{{ returnOrderInfo.returnName }}</div>
          </div>
          <div class="good-detail-item">
            <div>退单理由：{{ returnOrderInfo.reason }}</div>
          </div>
          <div class="good-detail-item">
            <div>退单描述：{{ returnOrderInfo.description }}</div>
          </div>
        </div>
      </div>
      <div class="line-c">
        <div class="content-title">
          <p class="title">退货商品：{{ returnOrderInfo.createTime }}</p>
        </div>
        <el-table
          border
          class="product-table"
          :data="goodDetail"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="productPic"
            label="商品图片"
            width="150"
          >
            <template slot-scope="scope">
              <img :src="scope.row.productPic" class="product-pic" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="商品描述" width="200">
            <template slot-scope="scope">
              <p>名字：{{ scope.row.productName }}</p>
              <p>品牌：{{ scope.row.productBrand }}</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="productRealPrice"
            label="商品价格"
            width="250"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="商品属性"
            prop="productAttr"
            width="250"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="productCount"
            label="商品数量"
            width="236"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="returnAmount"
            label="合计"
            width="100"
          >
          </el-table-column>
        </el-table>
      </div>

      <div class="line-c">
        <div class="content-title">
          <p class="title">用户信息：</p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <div>联系人：{{ returnOrderInfo.returnPhone }}</div>
          </div>
          <div class="good-detail-item">
            <div>联系电话：{{ returnOrderInfo.returnPhone }}</div>
          </div>
        </div>
      </div>
      <div class="line-c">
        <div class="content-title">
          <p class="title">费用信息：</p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <div>退单金额：{{ returnOrderInfo.returnAmount }}</div>
          </div>
          <div class="good-detail-item">
            <div>运费金额：0</div>
          </div>
        </div>
      </div>
      <div class="line-c" v-if="returnOrderInfo.status !== 1">
        <div class="content-title">
          <p class="title">处理结果：</p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <div>处理人：{{ returnOrderInfo.handleMan }}</div>
          </div>
          <div class="good-detail-item">
            <div>处理备注：{{ returnOrderInfo.handleNote }}</div>
          </div>
          <div class="good-detail-item">
            <div>处理时间：{{ returnOrderInfo.handleTime }}</div>
          </div>
        </div>
      </div>
      <div class="line-c" v-if="returnOrderInfo.status !== 1">
        <div class="content-title">
          <p class="title">收货信息：</p>
        </div>
        <div class="good-detail">
          <div class="good-detail-item">
            <div>退单收货人：{{ returnOrderInfo.receiveMan }}</div>
          </div>
          <div class="good-detail-item">
            <div>退单收货备注：{{ returnOrderInfo.receiveNote }}</div>
          </div>
          <div class="good-detail-item">
            <div>退单收货时间：{{ returnOrderInfo.receiveTime }}</div>
          </div>
        </div>
      </div>

      <div class="line-c" v-if="returnOrderInfo.status == 1">
        <div class="content-title">
          <p class="title">处理结果：</p>
        </div>
        <el-form
          :model="getGoodParams"
          ref="numberValidateForm"
          :rules="rules"
          :inline="true"
        >
          <div class="good-detail">
            <div class="good-detail-item">
              <div>处理人：{{ returnOrderInfo.receiveMan }}</div>
              <div class="get-man-c">
                <el-form-item prop="receiveMan" label="收货人：">
                  <el-input
                    size="mini"
                    class="get-input"
                    placeholder="请输入收货人姓名"
                    v-model="getGoodParams.receiveMan"
                  ></el-input>
                </el-form-item>
              </div>
            </div>

            <div class="good-detail-item">
              <div>处理备注：{{ returnOrderInfo.receiveNote }}</div>
              <div class="get-note">
                <el-form-item prop="receiveNote" label="收货备注：">
                  <el-input
                    size="mini"
                    class="get-input"
                    placeholder="请输入收货备注"
                    v-model="getGoodParams.receiveNote"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="good-detail-item">
              <div>处理时间：{{ returnOrderInfo.receiveTime }}</div>
            </div>
          </div>
        </el-form>
      </div>
      <el-button
        class="sure-get"
        type="primary"
        @click="getReturn"
        v-if="returnOrderInfo.status == 1"
      >
        确认收货
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { receiveProductR, requestReturnOrderDetail } from "@/api/orderManage";

import OrderTag from "@/components/OrderTag";
export default {
  data() {
    return {
      hasLoad: false,
      returnOrderInfo: {},
      goodDetail: [],
      proofPicsList: [],
      getGoodParams: {
        receiveMan: "",
        receiveNote: "",
      },
      rules: {
        receiveMan: { required: true, message: "收货备注不能为空" },
        receiveNote: { required: true, message: "处理备注不能为空" },
      },
    };
  },
  methods: {
    async initInfo() {
      const id = this.$route.params.id;
      const res = await requestReturnOrderDetail({
        id,
      });
      this.hasLoad = true;
      this.returnOrderInfo = res.data.data.orderReturnApply;
      // this.goodDetail
      let goodDetailObj = {};
      goodDetailObj = {
        productPic: this.returnOrderInfo.productPic,
        productName: this.returnOrderInfo.productName,
        productBrand: this.returnOrderInfo.productBrand,
        productRealPrice: this.returnOrderInfo.productRealPrice,
        productAttr: this.returnOrderInfo.productAttr,
        productCount: this.returnOrderInfo.productCount,
        returnAmount: this.returnOrderInfo.returnAmount,
      };
      this.goodDetail.push(goodDetailObj);
      if (!!this.returnOrderInfo.proofPics) {
        this.proofPicsList = this.returnOrderInfo.proofPics.split(",");
      }

    },
    async getReturn() {
      const res = await receiveProductR({
        id: this.returnOrderInfo.id,
        data: {
          ...this.getGoodParams,
          id: this.returnOrderInfo.id
        }
      })
      if(res.data.success) {
        this.$message({
          message: '收货成功'
        })
        this.initInfo()
      }
    },
    seeOrderDetail() {
      this.$router.push({
        path: '/orderManage/orderDetail/' + this.returnOrderInfo.orderId
        })
    }
  },
  created() {
    this.initInfo();
  },
  components: {
    OrderTag,
  }
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
    &:last-child(1) {
      border-bottom: 0px;
    }
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
        div {
          display: block;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          margin: 0;
          &.order-sn {
            .see-detail {
              background-color: transparent;
              color: #409eff;
              border: none;
              padding: 0;
              font-size: 14px;
              margin-left: 4px;
            }
          }
        }
        .get-note,
        .get-man-c {
          display: flex;
          .get-input {
            width: 200px;
          }
        }
      }
    }

    .product-table {
      margin: auto;
      .product-pic {
        width: 100px;
        height: 100px;
      }
    }

    & ::v-deep .el-form-item__label {
      font-weight: 500;
    }
  }

  .sure-get {
    display: block;
    width: 100px;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 12px;
    margin: 30px auto;
  }
}
</style>