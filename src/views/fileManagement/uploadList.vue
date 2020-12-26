<template>
  <el-table :data="files">
    <el-table-column show-overflow-tooltip
                     prop="size"
                     label="大小"
                     width='100'>
      <template slot-scope="scope">{{(Math.round(scope.row.size/1024))+'KB'}}</template>
    </el-table-column>

    <el-table-column prop="name"
                     show-overflow-tooltip
                     label="名称">
    </el-table-column>

    <el-table-column prop="thumb"
                     label="缩略图"
                     width="80">
      <template slot-scope="scope">
        <img v-if="scope.row.thumb"
             :src="scope.row.thumb"
             width="40"
             height="auto" />
      </template>
    </el-table-column>
    <el-table-column prop="success"
                     show-overflow-tooltip
                     label="状态"
                     width='80'>
      <template slot-scope="scope">
        {{scope.row.success?'成功':'失败'}}
      </template>
    </el-table-column>
    <el-table-column prop="name"
                     show-overflow-tooltip
                     label="操作">
      <template slot-scope="scope">
        <el-button icon="el-icon-video-play"
                   type="primary"
                   @click.prevent="fileUploadObj.update(scope.row, {active: true, error: '', progress: '0.00'})">重试</el-button>
        <el-button icon="el-icon-delete"
                   type="danger"
                   @click.prevent="stopFile(scope.row, {active: false})">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>
<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => []
    },
    fileUploadObj: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row);
    },
    stopFile (file, data) {
      // 分片文件上传 暂停，
      file.active = false
      this.fileUploadObj.update(file, data)
    }
  }
  // watch: {
  //   files (val) {
  //     console.log(val, this.fileUploadObj)
  //   }
  // }
}
</script>
