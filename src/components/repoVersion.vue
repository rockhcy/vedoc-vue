<template>
  <div class="f-repo-d"
       v-on:click='enterRepo'>
    <i class="el-icon-s-order
 hcy-repo"></i>
    <h3> 版本仓库</h3>
  </div>
</template>

<script>
export default {
  methods: {
    enterRepo () {
      console.log("进入仓库")
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