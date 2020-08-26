<template>
  <el-row>
    <div class="h-i">
      <a href=""><i class="el-icon-s-goods"></i>VE DOC</a>
    </div>

    <div class="header-input">
      <el-input v-model="input"
                placeholder="请输入内容"></el-input>
      <el-button icon="el-icon-search"></el-button>
    </div>
    <div class="h-user-admin">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">admin</template>
          <el-menu-item index="2-1">个人中心</el-menu-item>
          <el-menu-item index="2-2">我的分享</el-menu-item>
          <el-menu-item index="2-3">仓库管理</el-menu-item>
          <el-menu-item index="2-3">退出登陆</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">新建</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me"
             target="_blank">后台管理</a></el-menu-item>
      </el-menu>
    </div>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>

<style>
.h-i {
  position: absolute;
  display: inline-block;
  width: 50px;
}
.header-input {
  width: 300px;
  display: inline-block;
  position: absolute;
}
.el-input {
  position: absolute;
  display: inline-block;
}
.el-input > input {
  width: 200px;
}
.el-button {
  position: absolute;
  display: inline-block;
}
.h-user-admin {
  position: absolute;
  display: inline-block;
  width: 400px;
}
</style>