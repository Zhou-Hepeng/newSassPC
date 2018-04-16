<template>
  <div class="container">
    <div class="title-name">
      询价线索
    </div>
    <!-- 头部选中 -->
    <select-bar :titleArr="selectArr" @selectBar="selectBar" :selectIndex="selectIndex"></select-bar>
    <router-view />
  </div>
</template>
<script>
import SelectBar from '@/components/SelectBar'

export default {
  components: {
    SelectBar
  },
  created() {
  },
  data() {
    return {
      // selectBar数组
      selectArr: [
        {
          name: '新线索',
          num: 4
        },
        {
          name: '待跟进',
          num: 7
        },
        {
          name: '跟进中',
          num: 345
        },
        {
          name: '全部线索',
          num: 234
        },
        {
          name: '公共池',
          num: ''
        }
      ],
      selectIndex: 0 // 选中
    }
  },
  methods: {
    // navBar切换
    selectBar(index) {
      this.selectIndex = index
      let path = [
        '/clue/newclue',
        '/clue/tofollow',
        '/clue/following',
        '/clue/allclue',
        '/clue/cluepool'
      ]
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

</style>
