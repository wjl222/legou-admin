<template>
  <div>
    <el-card>
      <div slot="header">
        <div>条件查询</div>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="input-c">
            <p>订单编号</p>
            <el-input type="number" v-model="searchParam.deliverySn" placeholder="请填写订单编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>订单类型</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>支付方式</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input-c">
            <p>订单状态</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchParam: {
        deliverySn: "",
        id: "",
        memberUsername: "",
        orderSn: "",
        orderType: 0,
        payType: 0,
        sourceType: 0,
        status: 0,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep input[type='number'] {
  -moz-appearance: textfield !important;
}
</style>