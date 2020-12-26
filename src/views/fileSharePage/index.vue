<template>
  <el-container>
    <el-header style="width:100%;padding: 0">
      <el-menu class="el-menu-demo"
               style="padding: 0 200px"
               mode="horizontal">

        <el-menu-item index="5">
          <a href="#/homeIndex">
            <div><img src="../../assets/vesystemlogo.png"
                   style="width:61px;height:67px"
                   alt=""></div>

          </a>
        </el-menu-item>

      </el-menu>
    </el-header>
    <el-main>
      <fileOperation></fileOperation>
      <el-table ref="multipleTable"
                @row-click="clickRow"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column label="文件名">
          <template slot-scope="scope">
            <contextMenu :row=scope.row></contextMenu>
          </template>
        </el-table-column>
        <el-table-column prop="modifyTime"
                         label="修改时间"
                         :formatter="formatterDate">
        </el-table-column>
        <el-table-column prop="size"
                         label="大小"
                         :formatter="formatSize"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import fileOperation from '@/views/fileManagement/fileOperation'
import contextMenu from '@/views/fileManagement/contextMenu'
export default {
  components: {
    fileOperation,
    contextMenu
  },
  data () {
    return {
      tableData: [],

    }
  },
  created () {

  },
  methods: {

    handleSelectionChange (val) {
      console.log(val)
    },
    clickRow (row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    formatterDate (row) {
      return this.$moment(new Date(row.modifyTime)).format("YYYY-DD-MM HH:mm:ss")
    },
    formatSize (row) {
      if (row.size < 1024 * 1024) {
        return Math.ceil(row.size / 1024) + " KB"
      } else if (1024 * 1024 <= row.size < 1024 * 1024 * 1024) {
        return (row.size / (1024 * 1024)).toFixed(2) + " MB"
      } else {
        return (row.size / (1024 * 1024 * 1024)).toFixed(2) + " GB"
      }
    },

  }

}
</script>

<style>
</style>