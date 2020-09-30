<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="基本信息">
      <el-divider content-position="left"
                  style="font-size: 18px;">基本信息</el-divider>
      <el-form :label-position="labelPosition"
               label-width="80px"
               style="width:700px"
               :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.alias"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="修改密码">
      <el-divider content-position="left"
                  style="font-size: 18px;">修改密码</el-divider>
      <el-form :label-position="labelPosition"
               label-width="100px"
               style="width:700px"
               :model="formPassword">
        <el-form-item label="旧密码">
          <el-input v-model="formPassword.oldPWD"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formPassword.newPWD"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="formPassword.verifyPWD"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      tabPosition: 'left',
      labelPosition: 'left',
      formLabelAlign: {
        username: '',
        alias: '',
        tel: '',
        email: ''
      },
      formPassword: {
        oldPWD: '',
        newPWD: '',
        verifyPWD: ''
      }
    };
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    }
  }
}
</script>

<style>
</style>