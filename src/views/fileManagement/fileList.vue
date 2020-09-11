<template>
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
        <div style="cursor: pointer;">
          <svg-icon :icon-class=setIcon(scope.row.name,scope.row.type)
                    slot="prefix"
                    style="    width: 26px;
    height: 26px;
    text-align: center;
    margin: 0 10px 0 10px;
    vertical-align: middle;" />
          <span>
            {{ scope.row.name }}
          </span>
        </div>

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
</template>

<script>
export default {
  created () {
    this.getFileList()
  },
  data () {
    return {
      path: '',
      tableData: [],
      multipleSelection: [],
    }
  },
  methods: {
    getFileList () {
      this.$api.get("repo/getFileList", { params: { "path": sessionStorage.getItem("currentPath") } }).then(res => {
        this.tableData = res.data
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    setIcon (filename, fileType) {
      var iconType = "";
      if (fileType == '文件夹') {
        return iconType = 'folder'
      }
      switch (filename.substr(filename.lastIndexOf(".") + 1)) {
        case 'xlsx':
          iconType = "excle"
          break
        case "jpg":
          iconType = "JPG"
          break
        case "pdf":
          iconType = "PDF"
          break
        case "png":
          iconType = "PNG"
          break
        case "ppt":
          iconType = "ppt"
          break
        case "txt":
          iconType = "TET"
          break
        case "word":
          iconType = "WORD"
          break
        case "zip":
          iconType = "zip"
          break
        default:
          iconType = "unknown"
      }
      return iconType

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
    clickRow (row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  }

}
</script>

<style>
</style>