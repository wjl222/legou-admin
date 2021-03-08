<template>
  <div class="contain">
    <el-card class="content-card">
      <div slot="header">
        <el-button type="primary"> 新增 </el-button>
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
          prop="promotionStartTime"
          label="创建时间 "
          width="350"
        >
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small"
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
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="filtrate.name" placeholder="商品货号"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="filtrate.brandName" placeholder="品牌">
              <el-option
                v-for="item in limitActList"
                :key="item.id"
                :label="item.brandName"
                :value="item.productId"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="filtrate.isPutaway" placeholder="上架状态">
              <el-option
                v-for="(item, index) in onStatusOption"
                :key="index"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="filtrate.auditStatus" placeholder="审核状态">
              <el-option
                v-for="(item, index) in auditStatusOption"
                :key="index"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button size="mini"> 重置 </el-button>
            <el-button type="primary" size="mini"> 搜索 </el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header">
          <span>商品列表</span>
        </div>

        <el-table ref="goodList" :data="limitActList" style="width: 100%">
          <el-table-column width="55" label="选择">
            <template slot-scope="scope">
              <!-- <el-radio @change="ccc(scope.row)"></el-radio> -->
              <el-button @click="ccc(scope.row)"> 点击 </el-button>
            </template>
          </el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleListSizeChange"
          @current-change="handleListCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { requestLimitAct, deleteLimitAction } from "@/api/marketManage";

export default {
  data() {
    return {
      limitActList: [],
      addDialogTableVisible: true,
      filtrate: {
        name: "",
        goodsNum: 0,
        brandName: "",
        isPutaway: "",
        auditStatus: "",
      },
      onStatusOption: [
        {
          value: "0",
          label: "上架",
        },
        {
          value: "1",
          label: "未上架",
        },
      ],
      auditStatusOption: [
        {
          value: "0",
          label: "审核",
        },
        {
          value: "1",
          label: "未审核",
        },
      ],
    };
  },
  methods: {
    async initInfo() {
      const res = await requestLimitAct();
      //   console.log(res);
      this.limitActList = res.data.data.items;
      this.total = res.data.data.items.length;
      let nowDate = new Date().getTime();
      this.limitActList.filter((item) => {
        const lateTime = new Date(item.promotionEndTime).getTime();
        item.isLate = lateTime < nowDate;
      });
      console.log(this.total);
    },
    async handleDelete(item) {
      const res = await deleteLimitAction({
        id: item.id,
      });
    },
    ccc(e) {
      console.log(e);
    },
    handleListSizeChange(i) {
      console.log(i);
    },
    handleListCurrentChange(i) {
      console.log(i);
    } 
    
  },
  created() {
    this.initInfo();
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
  }
}
</style>