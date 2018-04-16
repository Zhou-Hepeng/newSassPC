<template>
  <div class="container">
    <div class="set">
      <div class="title">
        商机设置
      </div>
      <!-- 头部选中 -->
      <select-bar :titleArr="selectArr" @selectBar="selectBar" :selectIndex="selectIndex"></select-bar>
      <router-view />
    </div>
  </div>
</template>
<script>
import SelectBar from '@/components/SelectBar'

export default {
  components: {
    SelectBar
  },
  data() {
    return {
      // selectBar数组
      selectArr: [
        {
          name: '400接听设置'
        },
        {
          name: '客户级别'
        }
      ],
      selectIndex: 0 // 选中
    }
  },
  methods: {
    // navBar切换
    selectBar(index) {
      this.selectIndex = index
      let path = ['/businessSet/call-set', '/businessSet/level-set']
      this.$router.push({ path: path[index] })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let index = vm.newGetStorage('selectBarIndex')
      if (index) {
        vm.selectIndex = index
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    this.removeStorage('selectBarIndex')
    next()
  }
}
</script>
<style scoped>
  .title{
    font-size: 20px;
    color: #17181A;
    line-height: 30px;
  }
</style>
