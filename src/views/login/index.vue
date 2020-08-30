<template>
  <div class="login">
    <div class="login-div">
      <el-row>
        <div class="login-d-ti">
          <span class="login-title">和信文件管理系统</span>
        </div>
      </el-row>
      <el-input v-model="loginName"
                placeholder="请输入用户名"></el-input>
      <el-input v-model="password"
                placeholder="请输入密码"></el-input>
      <el-row>
        <el-button type="primary"
                   @click="gotoLogin">登录</el-button>
      </el-row>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      loginName: "",
      password: ''
    }
  },
  methods: {
    gotoLogin () {
      this.$api.post("/user/userLogin", { params: { "loginname": this.loginName, "password": this.password } }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
body {
  background-image: url("../../assets/bg.png");
}
.login {
  width: 1360px;
  height: 664px;
  background-image: url("../../assets/login.png");
  margin-top: 218px;
  margin-left: 280px;
}
.log {
  margin-left: 627px;
  padding-top: 100px;
}
.login-title {
  font-size: 26px;
  color: #3d9aff;
  font-family: "微软雅黑";
}
.login-d-ti {
  margin-bottom: 100px;
}
.el-button--primary {
  width: 53%;
}
.el-input {
  width: 53%;
  margin-bottom: 34px;
}
.el-input > input {
  height: 60px;
}
.login-div {
  width: 50%;
  margin-left: 44%;
  padding-top: 102px;
}
</style>
