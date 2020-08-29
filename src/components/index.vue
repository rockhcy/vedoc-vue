<template>
  <div>
    <hcyHeader></hcyHeader>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import hcyHeader from '@/components/header.vue'


export default {
  components: {
    hcyHeader

  }

}
</script>

<style scoped>
</style>