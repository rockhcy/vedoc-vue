<template>
  <el-dialog title="新建仓库"
             :visible.sync="addRepoVisible">
    <el-form :model="form">
      <el-form-item label="仓库名称"
                    :label-width="formLabelWidth">
        <el-input v-model="form.repoName"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="仓库类型"
                    :label-width="formLabelWidth">
        <el-select v-model="form.repoType"
                   style="width:100%"
                   placeholder="请选择仓库类型">
          <el-option label="普通仓库"
                     value="1"></el-option>
          <el-option label="版本仓库"
                     value="2"></el-option>
          <el-option label="协作仓库"
                     value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介"
                    :label-width="formLabelWidth">
        <el-input v-model="form.repoDes"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问密码"
                    :label-width="formLabelWidth">
        <el-input v-model="form.repoPwd"
                  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="addRepoVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="dialogFormVisible = false">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'addRepo',
  data () {
    return {
      addRepoVisible: false,
      form: {
        repoName: '',
        repoType: '',
        repoDes: '',
        repoPwd: '',

      },
      formLabelWidth: '120px'
    }

  }

}
</script>

<style>
</style>