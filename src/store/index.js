import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//创建VueX对象
const store = new Vuex.Store({
  // 使用Vue.set(state,"age",15)和Vue.delete(state,'age')向state中动态添加和删除成员
  state: {
    //存放的键值对就是所要管理的状态
    name: 'helloVueX',
    currentPath: ''
  },
  methods: {
    //定义方法，注意不要在方法中直接修改state中的中的值
    add () {
      console.log(this.$store.state.name)
    }
  },
  //所有state中的值如果要修改，都因该在mutations 中定义方法来改变。
  //组件中使用 this.$store.commit('edit') 来调用对应的方法，带参数的这样提交，this.$store.commit('edit',{age:15,sex:'男'})，多个参数建议封装为对象
  mutations: {
    // 设置当前路径
    setCurrentPath (state, newPath) {
      state.currentPath = newPath
    },
    edit (state) {
      state.name = "hcy"
      console.log(state.name)
    }
  },
  //通过getters可以对state中的成员进行修改并返回给外界，组件中调用这么写：this.$store.getters.nameInfo
  getters: {
    nameInfo (state) {
      return "姓名:" + state.name
    },
  },
  //actions用于异步调用方法修改state中的值，组件中调用这么写：this.$store.dispatch('aEdit',{age:15})
  actions: {
    aEdit (context, payload) {
      setTimeout(() => {
        context.commit('edit', payload)
      }, 2000)
    }
  }
  //models:{}.当项目特别大时可以使用models将各个模块都关在各自的空间中
})

export default store
