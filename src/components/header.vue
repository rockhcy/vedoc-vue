<template>
  <el-container>
    <el-header style="width:100%;padding: 0">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               style="padding: 0 200px"
               mode="horizontal"
               @select="handleSelect">

        <el-menu-item index="5">
          <a href="#"><i class="el-icon-s-goods"
               style=""></i>VE DOC</a>
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
          <el-menu-item index="2-3">退出登陆</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">新建</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me"
             target="_blank">后台管理</a></el-menu-item>
      </el-menu>

    </el-header>
    <el-main>Main</el-main>
  </el-container>

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
/* .h-i { */
/* position: absolute;
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
} */
</style>