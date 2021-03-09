<template>
  <el-tag
    class="status-tag-c"
    :effect="statusIsDark(status)"
    :type="statusType(status)"
  >
    {{ orderStatusText(status) }}
  </el-tag>
</template>

<script>
export default {
    props: ['status'],
  computed: {
    statusIsDark() {
      return function (status) {
        // switch (item.status):
        switch (status) {
          case 0:
          case 1:
          case 4:
            return "dark";

          default:
            return "light";
        }
      };
    },
    statusType() {
      return function (status) {
        switch (status) {
          case 0:
            return "danger";
          case 1:
            return "warning";
          case 4:
          case 5:
            return "info";

          default:
            return "";
        }
      };
    },
    orderStatusText() {
      return function (status) {
        switch (status) {
          case 0:
            return "待付款";
          case 1:
            return "待发货";
          case 2:
            return "已发货";
          case 3:
            return "已完成";
          case 4:
            return "已关闭";
          case 5:
            return "无效订单";
          default:
            return "";
        }
      };
    },
  },
};
</script>

<style>
</style>