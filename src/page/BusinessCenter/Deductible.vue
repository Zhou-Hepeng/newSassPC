<template>
  <div class="container">
    <div class="title-name">
      抵扣券
    </div>
    <!-- 头部选中 -->
    <select-bar :titleArr="selectArr" @selectBar="selectBar" :selectIndex="selectIndex"></select-bar>
    <router-view />
  </div>
</template>
<script>
import SelectBar from '@/components/SelectBar'
export default {
  components: { SelectBar },
  data: () => ({
    // selectBar数组
    selectArr: [
      {
        name: '最新的订单线索',
        url: 'new'
      },
      {
        name: '跟进中的订单线索',
        url: 'follow'
      },
      {
        name: '全部一口价线索',
        url: 'all'
      }
    ],
    // 默认选择第一个
    selectIndex: 0
  }),
  methods: {
    selectBar(index) {
      this.$router.push(this.selectArr[index].url)
      this.selectIndex = index
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

</style>
