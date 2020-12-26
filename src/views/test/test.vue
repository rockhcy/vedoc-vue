<template>
  <div>
    <span>{{test}}</span>
    <vue-qr :logoSrc="imageUrl"
            :text="text"
            :size="200"></vue-qr>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  props: {
    test2: {
      type: String,
      default: 'props -test'
    },



  },
  data () {
    return {
      test: 'data- test',
      text: '你是真无聊，看到二维码就扫！\n\r 看什么看，说的就是你',
      imageUrl: require("../../assets/vesystemlogo.png"),
    }
  }

}
</script>

<style>
</style>