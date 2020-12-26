<template>
  <div class="f-repo-d"
       v-on:click='enterRepo'>
    <i class="el-icon-s-order
 hcy-repo"></i>
    <h3> {{item.repoName}}</h3>
    <el-dialog title="提示"
               :visible.sync="showSubmitPasswordBox"
               width="30%">
      <div>
        <el-input placeholder="请输入内容"
                  v-model="input1">
          <template slot="prepend">请输入密码</template>
        </el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showSubmitPasswordBox = false">取 消</el-button>
        <el-button type="primary"
                   @click="showSubmitPasswordBox = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      input1: '',
      showSubmitPasswordBox: false
    };
  },
  methods: {
    enterRepo () {
      sessionStorage.setItem("currentPath", this.item.repoPath)
      sessionStorage.setItem("repoId", this.item.repoId)
      this.$router.push({ path: '/fileManagement' })
      // let argus = new FormData();
      // argus.append("repoId", this.item.repoId)
      // this.$api.post('/repo/enterRepo', argus).then(res => {
      //   if (!res.data) {

      //   } else {
      //     this.showSubmitPasswordBox = true
      //   }
      // })
    }

  }
}
</script>

<style>
.f-repo-d {
  cursor: pointer;
  margin-bottom: 21px;
}
.hcy-repo {
  font-size: 80px;
  color: #f47023;
}
</style>