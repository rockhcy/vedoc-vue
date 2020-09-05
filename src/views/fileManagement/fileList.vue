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
      <template slot-scope="scope">
        <div style="cursor: pointer;">
          <svg-icon :icon-class=setIcon(scope.row.filename,scope.row.type)
                    slot="prefix"
                    style="    width: 26px;
    height: 26px;
    text-align: center;
    margin: 0 10px 0 10px;
    vertical-align: middle;" />
          <span>
            {{ scope.row.filename }}
          </span>
        </div>

      </template>
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
      multipleSelection: [],
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    setIcon (filename, fileType) {
      var iconType = "";
      if (fileType == '文件夹') {
        return iconType = 'folder'
      }
      console.log(filename.substr(filename.lastIndexOf(".") + 1))
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

    }
  }
}
</script>

<style>
</style>