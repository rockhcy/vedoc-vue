<template>
  <div>
    <el-divider content-position="left">仓库管理</el-divider>
    <el-table :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column prop="repoName"
                       label="仓库名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="repoType"
                       width="180"
                       :formatter="formatRepoType">
      </el-table-column>
      <el-table-column prop="repoDes"
                       label="描述">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间">
      </el-table-column>
      <el-table-column prop="creater"
                       label="创建人">
      </el-table-column>
      <el-table-column prop="isSelfCreate"
                       label="标签"
                       width="100"
                       :filters="[{ text: '所有者', value: true }, { text: '协作者', value: false }]"
                       :filter-method="filterTag"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isSelfCreate ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.isSelfCreate?"所有者":"协作者"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address"
                       label="成员管理">
        <template slot-scope="scope">
          <el-button size="mini"
                     disabled
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">研发中...</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     disabled>编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                     <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">仓库分享</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      total: 0,
      tableData: []
    }
  },
  created () {
    this.getSelfRepoAdminList()
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row);
      let apiurl = "/repo/deleteMappingRepo";
      if (row.isSelfCreate) {
        apiurl = "/repo/deleteSelfRepo";
      }
      let argus = { repoId: row.repoId }
      this.$api.delete(apiurl, { params: argus }).then(res => {
        console.log(res.data)
        if (res.status == 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
          this.getSelfRepoAdminList()
        }
      })

    },
    formatRepoType (val) {
      console.log(val)
      switch (val.repoType) {
        case 1:
          return "普通仓库"
        case 2:
          return "版本仓库"
        case 3:
          return "协作仓库"

      }

    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.getSelfRepoAdminList()
    },
    getSelfRepoAdminList () {
      let argus = { current: this.currentPage }
      this.$api.get("/repo/getSelfRepoAdminList", argus).then(res => {
        console.log(res.data)
        this.tableData = res.data.records
        this.total = res.data.total

      })
    },
    filterTag (value, row) {
      return row.isSelfCreate == value;
    },
  }

}
</script>

<style>
</style>