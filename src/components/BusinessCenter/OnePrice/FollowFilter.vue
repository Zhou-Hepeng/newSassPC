<template>
  <div class="filter-header">
    <div class="select-header">
      <div class="item">
        <span>选择车型：</span>
        <Select v-model="filterInfo.brandid" style="width: 160px;">
            <Option :value="0">全部品牌</Option>
            <Option :value="item.brandid" v-for="(item,index) in brandList" :key="index">{{item.brandname}}</Option>
        </Select>
        <Select v-model="filterInfo.seriesid" style="width: 160px;">
            <Option :value="0">全部车系</Option>
            <OptionGroup v-for="(item,index) in seriesList[filterInfo.brandid]" :key="index" :label="item[0].subcategoryname">
                <Option v-for="(ele,number) in item" :ref="`series${ele.seriesid}`" :key="number" :value="ele.seriesid" :data-id="ele.subcategoryid">{{ele.seriesname}}</Option>
            </OptionGroup>
        </Select>
        <Select v-model="filterInfo.carType" style="width: 160px;">
            <Option :value="0">全部车型</Option>
            <Option :value="item.productid"  v-if="item.brandid === filterInfo.brandid && item.seriesid === filterInfo.seriesid" v-for="(item,index) in productList" :key="index">{{item.productid}}{{item.productname}}</Option>
        </Select>
      </div>
      <div class="item">
        <span>订单归属：</span>
        <Select v-model="filterInfo.orderBelong" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
      <div class="item">
        <span>订单状态：</span>
        <Select v-model="filterInfo.orderStatus" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
    </div>
    <div class="select-location">
      <div class="item">
        <span>提车地区：</span>
        <Select v-model="filterInfo.location" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option :value="item.provincesn" v-for="(item,index) in provinceList" :key="index">{{item.provincename}}</Option>
        </Select>
      </div>
    </div>
    <div class="search-header">
      <span>条件搜索：</span>
      <i-input v-model="filterInfo.searchValue" placeholder="请输入客户手机号、订单号、姓名搜索" style="width: 330px"></i-input>
      <Button type="primary" style="margin-left: 10px;width: 60px;" @click="searchInfo">查询</Button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['filterInfo'],
  data: () => ({
    // 品牌列表
    brandList: [],
    // 车系列表
    seriesList: {},
    // 车型列表
    productList: [],
    // 省市列表
    provinceList: [],
    cityList: []
  }),
  created() {
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
    // 获取品牌列表
    let brandlist = this.getStorage('newbrandlist')
    if (brandlist) {
      this.brandList = brandlist.brandlist
    }
    // 获取车系列表
    let serieslist = this.getStorage('newserieslist')
    if (serieslist) {
      this.seriesList = serieslist.serieslist
    }
    console.log(this.seriesList, 'seriesList')

    // 获取车型列表
    let productlist = this.getStorage('newproductlist')
    if (productlist) {
      this.productList = productlist.productlist
    }
  },
  methods: {
    // 查询
    searchInfo() {
      this.$emit('searchInfo')
    }
  }
}
</script>
<style scoped>
.select-location{
  margin-top: 10px;
}
.select-header .item .ivu-select-single:not(:first-child){
  margin-left:4px;
}
</style>
