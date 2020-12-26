<template>
  <el-row style="width: max-content;">

    <el-button type="warning"
               icon="el-icon-upload2"
               @click="dialogVisible = true">上传</el-button>
    <el-button type="warning"
               icon="el-icon-download"
               @click="batchDownload">下载</el-button>
    <el-button type="warning"
               icon="el-icon-delete"
               @click="deleteFile">删除</el-button>
    <el-button type="warning"
               icon="el-icon-folder-add"
               @click="createFolder">创建文件夹</el-button>

    <el-dialog title="文件上传"
               :visible.sync="dialogVisible"
               class="dialog">
      <fileUpload></fileUpload>
      <tooltipInfo class="tooltipInfo"
                   :info='info'></tooltipInfo>
    </el-dialog>

  </el-row>
</template>

<script>
import fileUpload from './fileUpload'
import tooltipInfo from '@/components/tooltipInfo'
export default {
  components: {
    fileUpload,
    tooltipInfo
  },
  data () {
    return {
      dialogVisible: false,
      info: '超过5M的文件系统会自动分片，上传过程中分片文件会被锁定，可以显示但是不能打开和修改，请在完成上传后在执行相关操作！'
    }
  },
  methods: {
    createFolder () {
      this.$prompt('请输入文件夹名称', '文件夹名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-z0-9\\u4e00-\\u9fa5]*$/,
        inputErrorMessage: '文件名称不合法'
      }).then(({ value }) => {
        var argus = new FormData();
        argus.append("path", sessionStorage.getItem("currentPath"))
        argus.append("folderName", value)
        this.$api.post("/repo/createFolder", argus).then(res => {
          console.log(res)
          if (res.data) {
            this.$notify({
              title: 'success',
              message: '新建文件夹成功',
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: 'error',
              message: '创建失败，文件夹可能已经存在！'
            });
          }
          this.$store.state.reloadFile = true
        })


      });
    },
    batchDownload () {
      var filelist = this.$store.state.fileSelected
      if (filelist.length == 0) {
        this.$notify({
          title: 'warning',
          message: '请先选中要操作的文件',
          type: 'warning'
        });
        return;
      }
      var files = []
      for (var f in filelist) {
        files.push(filelist[f].path)
      }
      this.$api({
        method: 'post',
        url: 'repo/batchDownload',
        data: files,
        responseType: 'arraybuffer',

      }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: 'success',
            message: '下载成功',
            type: 'success'
          });
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', res.headers['filename']);
          document.body.appendChild(link);
          link.click();
        }

      })
    },
    deleteFile () {
      var filelist = this.$store.state.fileSelected
      if (filelist.length == 0) {
        this.$notify({
          title: 'warning',
          message: '请先选中要操作的文件',
          type: 'warning'
        });
        return;
      }
      var files = []
      for (var f in filelist) {
        files.push(filelist[f].path)
      }
      this.$api.post('/repo/deleteFile', { files: files }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: 'success',
            message: '删除文件成功',
            type: 'success'
          });
        }
        this.$store.state.reloadFile = true
      })
    }

  }
}
</script>

<style lang="scss">
.dialog {
  .el-dialog__header {
    text-align: initial;
  }
}
.dialog {
  position: relative;
  .el-dialog__body {
    position: relative;
    .el-tooltip {
      position: absolute;
      top: -34px;
      left: 98px;
      font-size: 20px;
    }
  }
}
</style>