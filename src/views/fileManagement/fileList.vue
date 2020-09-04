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
        <svg-icon icon-class="setIcon(scope.row.type)"
                  slot="prefix" />
        <!-- <svg-icon icon-class="excle"
                  slot="prefix"
                  v-else-if="scope.row.type == 'xlsx'" />
        <svg-icon icon-class="JPG"
                  slot="prefix"
                  v-else-if="scope.row.type == 'jpg'" />
        <svg-icon icon-class="PDF"
                  slot="prefix"
                  v-else-if="scope.row.type == 'pdf'" />
        <svg-icon icon-class="PNG"
                  slot="prefix"
                  v-else-if="scope.row.type == 'png'" />
        <svg-icon icon-class="ppt"
                  slot="prefix"
                  v-else-if="scope.row.type == 'ppt'" />
        <svg-icon icon-class="TET"
                  slot="prefix"
                  v-else-if="scope.row.type == 'txt'" />
        <svg-icon icon-class="zip"
                  slot="prefix"
                  v-else-if="scope.row.type == 'zip'" />
        <svg-icon icon-class="unknown"
                  slot="prefix"
                  v-else /> -->
        <span>
          {{ scope.row.filename }}
        </span>
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
    setIcon (fileType) {
      var iconType = "";
      console.log(fileType.substr(fileType.lastIndexOf(".") + 1))
      switch (fileType.substr(fileType.lastIndexOf(".") + 1)) {
        case 'xlsx':
          iconType = "excle"
          break
        case "jpg":
          iconType = "JPG"
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