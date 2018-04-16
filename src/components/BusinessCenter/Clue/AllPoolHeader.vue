<template>
  <div class="filter-header">
    <div class="select-header">
      <div class="item">
        <span>用途类别：</span>
        <Select v-model="filterInfo.subcategoryid" style="width: 160px;">
          <Option value="">全部</Option>
          <Option :value="item.subcategoryid" v-for="(item,index) in allsubcategoryList" :key="index">{{item.subcategoryname}}</Option>
        </Select>
      </div>
      <div class="item">
        <span>车型品牌：</span>
        <Select v-model="filterInfo.brandid" style="width: 160px;">
          <Option value="">全部</Option>
          <OptionGroup v-for="(item,index) in allbrandList" :key="index" :label="brandNavList[index]">
            <Option :value="ele.brandid" v-for="(ele,number) in item" :key="number">{{ele.brandname}}</Option>
          </OptionGroup>
        </Select>
      </div>
      <div class="item">
        <span>购车地区：</span>
        <Select v-model="filterInfo.provincesn" placeholder="请选择省份" style="width: 160px;">
          <Option value="">全部</Option>
          <Option :value="item.provincesn" v-for="(item,index) in provinceList" :key="index">{{item.provincename}}</Option>
        </Select>
        <Select v-model="filterInfo.citysn" placeholder="请选择城市" style="margin-left: 10px;width: 160px;">
          <Option value="">全部</Option>
          <Option v-if="filterInfo.provincesn" :value="item.citysn" v-for="(item,index) in cityList[filterInfo.provincesn]" :key="index">{{item.cityname}}</Option>
        </Select>
      </div>
      <Button type="primary" style="margin-left: 10px;width: 60px;" @click="search">查询</Button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['filterInfo'],
  data: () => ({
    // 品牌列表
    allbrandList: [],
    // nav 导航
    brandNavList: [],
    // 用途类别
    allsubcategoryList: [],
    // 省份
    provinceList: [],
    // 城市
    cityList: []
  }),
  created() {
    // 获取品牌列表
    let allbrandlist = this.getStorage('newallbrandlist')
    if (allbrandlist) {
      this.allbrandList = allbrandlist.allbrandlist.navdata
      this.brandNavList = allbrandlist.allbrandlist.navindex
    }
    // 获取用途类别
    let allsubcategorylist = this.getStorage('newallsubcategorylist')
    if (allsubcategorylist) {
      this.allsubcategoryList = allsubcategorylist.allsubcategorylist
    }
    // 请求城市信息
    let provincelist = this.getStorage('newsalesprovincelist')
    if (provincelist) {
      this.provinceList = provincelist.salesprovincelist
    }
    // 获取城市列表
    let citylist = this.getStorage('newsalescitylist')
    if (citylist) {
      this.cityList = citylist.salescitylist
    }
  },
  methods: {
    // 查询
    search() {
      this.$emit('search')
    }
  }
}
</script>
<style scoped>
</style>
