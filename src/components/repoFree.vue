<template>
  <div class="f-repo-d"
       v-on:click='enterRepo'>
    <i class="el-icon-s-platform
 hcy-repo"></i>
    <h3> {{item.repoName}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      repoItem: {}
    }
  },
  methods: {
    enterRepo () {
      sessionStorage.setItem("currentPath", this.item.repoPath)
      sessionStorage.setItem("repoId", this.item.repoId)
      this.$router.push({ path: '/fileManagement' })
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