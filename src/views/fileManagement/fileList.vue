<template>
  <el-table ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection"
                     width="55">
    </el-table-column>
    <el-table-column label="文件名">
      <template slot-scope="scope">{{ scope.row.filename }}</template>
    </el-table-column>
    <el-table-column prop="data"
                     label="修改时间">
    </el-table-column>
    <el-table-column prop="type"
                     label="类型">
    </el-table-column>
    <el-table-column prop="size"
                     label="大小"
                     show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          filename: '新建文件夹',
          data: '2012-08-28 15：35',
          type: '文件夹',
          size: '--'
        },
        {
          filename: 'dist(2).zip',
          data: '2012-08-28 15：35',
          type: '360压缩 ZIP 文件',
          size: '3.02 MB'
        },
        {
          filename: 'dist(2).zip',
          data: '2012-08-28 15：35',
          type: '360压缩 ZIP 文件',
          size: '3.02 MB'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {

    handleSelectionChange (val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style>
</style>