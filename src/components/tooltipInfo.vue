<template>
  <el-tooltip class="item"
              effect="dark"
              :content=info
              placement="top-start">
    <i class="el-icon-warning-outline"></i>
  </el-tooltip>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style>
</style>