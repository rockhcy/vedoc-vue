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
  },
  // provide () {
  //   return {
  //     reload: this.reload
  //   }
  // },
  // data () {
  //   return {
  //     isRouterAlive: true
  //   }
  // },
  // methods: {
  //   reload () {
  //     this.isRouterAlive = false
  //     this.$nextTick(function () {
  //       this.isRouterAlive = true
  //     })
  //   }
  // }

}
</script>

<style scoped>
</style>