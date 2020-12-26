<template>
  <div>
    <UploadList class="scroll-bar"
                style="max-height:500px;overflow:auto;margin-bottom:20px"
                :files="files"
                :fileUploadObj="$refs.upload"></UploadList>

    <el-row style="text-align:end">
      <el-button type="primary"
                 icon="el-icon-plus">
        <FileUpload class="table-upload m-rigth-sm"
                    ref="upload"
                    :post-action="fileUploadUrl"
                    :accept="accept"
                    :multiple="true"
                    :size=0
                    :thread=3
                    :headers='headers'
                    :data='fileparams'
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    :chunk-enabled="true"
                    :chunk="{
                      action:multipartUpload,
                      minSize: 3 * 1048576,
                      maxActive: 3,
                      maxRetries: 3,
                      headers:headers,
                      startBody: fileparams,
                      uploadBody: fileparams,
                      finishBody: fileparams,
                      ...handler
          }">
          添加文件
        </FileUpload>
      </el-button>
      <el-button type="danger"
                 icon="el-icon-delete"
                 @click="clearFile">清空</el-button>
    </el-row>
  </div>
</template>

<script>
import ChunkUploadHandlerCm from './chunkUploadHandler'
import VueUploadComponent from 'vue-upload-component'
import UploadList from './uploadList'
export default {
  components: {
    FileUpload: VueUploadComponent,
    UploadList

  },
  data () {
    return {
      handler: { handler: ChunkUploadHandlerCm },
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
      fileparams: { savePath: sessionStorage.getItem("currentPath"), repoId: sessionStorage.getItem("repoId") },
      fileUploadUrl: window.GLOBAL_CONFIG_SETTING.WEB_BASE_API + "/repo/smallFileUpload ",
      multipartUpload: window.GLOBAL_CONFIG_SETTING.WEB_BASE_API + "/repo/multipartUpload ",
      accept: window.ACCEPT_FILE_TYPE,//允许上传的文件类型
      files: [],
    }
  },

  methods: {
    clearFile () {
      this.$refs.upload.clear()
    },
    inputFile: function (newFile, oldFile) {
      console.log("inputFile 方法触发", newFile, oldFile)
      if (!this.$refs.upload.active) {
        this.$refs.upload.active = true
      }

      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },
    inputFilter: function (newFile, oldFile, prevent) {
      // if (newFile && !oldFile) {
      //   // 过滤不是图片后缀的文件
      //   if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
      //     return prevent()
      //   }
      // }
      console.log(newFile, oldFile, prevent)
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
      // 创建 blob 字段 用于图片预览
      // newFile.blob = ''
      // let URL = window.URL || window.webkitURL
      // if (URL && URL.createObjectURL) {
      //   newFile.blob = URL.createObjectURL(newFile.file)
      // }
    }
  }

}
</script>

<style>
</style>