<template>
  <div>
    <el-divider content-position="left">普通仓库</el-divider>
    <el-row :gutter="20">
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>
      <el-col :span="4">
        <repoFree></repoFree>
      </el-col>

    </el-row>
    <el-divider content-position="left">版本仓库</el-divider>
    <el-row :gutter="20">
      <el-col :span="4">
        <repoVersion></repoVersion>
      </el-col>

    </el-row>
    <el-divider content-position="left">协作仓库</el-divider>
    <el-row :gutter="20">
      <el-col :span="4">
        <repoTeam></repoTeam>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import repoFree from '@/components/repoFree'
import repoVersion from '@/components/repoVersion'
import repoTeam from '@/components/repoTeam'

export default {
  components: {
    repoFree,
    repoVersion,
    repoTeam


  }

}
</script>

<style scoped>
.el-row {
  margin-top: 30px;
}
</style>