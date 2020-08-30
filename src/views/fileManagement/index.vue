<template>
  <div style="margin-left: 48px;">
    <FileOperation></FileOperation>
    <FileBreadcrumb></FileBreadcrumb>
    <el-divider></el-divider>
    <FileList></FileList>
  </div>
</template>

<script>
import FileOperation from '@/views/fileManagement/fileOperation'
import FileBreadcrumb from '@/views/fileManagement/fileBreadcrumb'
import FileList from '@/views/fileManagement/fileList'

export default {
  components: {
    FileOperation,
    FileBreadcrumb,
    FileList

  }

}
</script>

<style>
</style>