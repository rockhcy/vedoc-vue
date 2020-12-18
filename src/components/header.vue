<template>
  <el-container>
    <el-header style="width:100%;padding: 0">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               style="padding: 0 200px"
               mode="horizontal"
               @select="handleSelect">

        <el-menu-item index="5">
          <a href="#/homeIndex">
            <div><img src="../assets/vesystemlogo.png"
                   style="width:61px;height:67px"
                   alt=""></div>

          </a>
        </el-menu-item>
        <el-menu-item index="6">
          <el-input v-model="input"
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search">
          </el-input>
        </el-menu-item>
        <el-submenu index="1"
                    style="margin-left:200px">
          <template slot="title">admin</template>
          <el-menu-item index="2-1">个人中心</el-menu-item>
          <el-menu-item index="2-2">我的分享</el-menu-item>
          <el-menu-item index="2-3">仓库管理</el-menu-item>
          <el-menu-item index="2-4">仓库市场</el-menu-item>
          <el-menu-item index="2-5">退出登陆</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">新建</el-menu-item>
        <el-menu-item index="4"><a href="#/home"
             target="_blank">后台管理</a></el-menu-item>
      </el-menu>
    </el-header>
    <addRepo ref="addRepo"></addRepo>
  </el-container>

</template>

<script>
import addRepo from '@/components/addrepo'
export default {
  components: {
    addRepo
  },
  data () {
    return {
      input: '',
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case "3":
          this.$refs.addRepo.addRepoVisible = true
          break;
        case "2-1":
          this.$router.push('/usercenter')
          break;
        case "2-2":
          this.$router.push('/docShare')
          break;
        case "2-3":
          this.$router.push('/repoAdmin')
          break;
        case "2-4":
          this.$router.push('/reposShare')
          break;
        case "2-5":
          this.$router.push('/')
          break;
      }
    }
  }

}
</script>

<style>
</style>