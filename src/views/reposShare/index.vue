<template>
  <div style="margin-left: 34px;">
    <el-divider content-position="left">仓库市场</el-divider>
    <el-row style="width:fit-content">
      <el-input placeholder="分享编号"
                class="reposShare-input"
                prefix-icon="el-icon-s-platform"
                v-model="shardId">
      </el-input>
      <el-input placeholder="仓库简介"
                class="reposShare-input"
                prefix-icon="el-icon-s-platform"
                v-model="repoDes">
      </el-input>
      <el-select v-model="repoType"
                 class="reposShare-input"
                 placeholder="请选择仓库类型">
        <el-option label="普通仓库"
                   value="1"></el-option>
        <el-option label="版本仓库"
                   value="2"></el-option>
        <el-option label="协作仓库"
                   value="3"
                   :disabled="true"></el-option>
      </el-select>
      <el-select v-model="openType"
                 class="reposShare-input"
                 placeholder="公开方式">
        <el-option label="无密码仓库"
                   value="1"></el-option>
        <el-option label="有密码仓库"
                   value="2"></el-option>
      </el-select>
      <el-button type="primary"
                 icon="el-icon-search">搜索</el-button>
    </el-row>

    <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="name"
                       label="分享id"
                       width="180">
      </el-table-column>
      <el-table-column prop="仓库名称"
                       label="仓库名称">
      </el-table-column>
      <el-table-column prop="仓库名称"
                       label="仓库类型">
      </el-table-column>
      <el-table-column prop="仓库名称"
                       label="仓库简介">
      </el-table-column>
      <el-table-column prop="仓库名称"
                       label="创建人">
      </el-table-column>
      <el-table-column prop="仓库名称"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="仓库名称"
                       label="是否需要密码">
      </el-table-column>

    </el-table>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="1000">
    </el-pagination>
  </div>

</template>

<script>
export default {
  name: 'reposShare',
  data () {
    return {
      shardId: '',
      repoDes: '',
      repoType: '',
      openType: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handlerAddMappingRepo (index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style scoped>
.el-pagination {
  width: 0px;
}
.reposShare-input {
  width: 229px;
  margin-right: 10px;
}
</style>