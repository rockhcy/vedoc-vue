<template>
  <div>
    <el-divider content-position="left">普通仓库</el-divider>
    <el-row :gutter="20">
      <el-col :span="4"
              v-for="item in repoList[1]"
              :key="item.repoId">
        <repoFree :item=item></repoFree>
      </el-col>
    </el-row>
    <el-divider content-position="left">版本仓库</el-divider>
    <el-row :gutter="20">
      <el-col :span="4"
              v-for="item in repoList[2]"
              :key="item.repoId">

        <repoVersion :item=item></repoVersion>
      </el-col>

    </el-row>
    <el-divider content-position="left">协作仓库</el-divider>
    <el-row :gutter="20"
            v-if="repoList[3] ==null ||repoList[3].length>0">
      <el-col :span="4"
              v-for="item in repoList[3]"
              :key="item.repoId">

        <repoTeam :item=item></repoTeam>
      </el-col>

    </el-row>
    <p style="text-align: left;margin-left: 76px;"
       v-else>暂无</p>
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
  },
  inject: ['reload'],
  data () {
    return {
      repoList: {}
    }
  },
  created () {
    this.getHomeReposList()
  },
  methods: {
    getHomeReposList () {
      this.$api.get("repo/getHomeReposList").then(res => {
        console.log(res.data)
        console.log(res.data[1])
        this.repoList = res.data
      })
    },
    reloadPge () {
      this.reload()
    }
  }

}
</script>

<style scoped>
.el-row {
  margin-top: 30px;
}
</style>