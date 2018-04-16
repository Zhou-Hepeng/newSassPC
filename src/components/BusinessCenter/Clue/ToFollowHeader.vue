<template>
  <div class="filter-header">
    <div class="select-header">
      <div class="item">
        <span>线索来源：</span>
        <Select @on-change="searchData" v-model="filterInfo.s_clueresource" style="width: 160px;">
          <Option value="">全部</Option>
          <Option :value="item.value" v-for="(item,index) in getwaylist" :key="index">{{item.key}}</Option>
        </Select>
      </div>
      <div class="item">
        <span>跟进人员：</span>
        <Select @on-change="searchData" v-model="filterInfo.s_followId" style="width: 160px;">
          <Option value="">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
      <div class="item">
        <span>意向车系：</span>
        <Select @on-change="searchData" v-model="filterInfo.s_brandids" style="width: 160px;">
          <Option value="">全部品牌</Option>
          <Option :value="item.brandid" v-for="(item,index) in brandList" :key="index">{{item.brandname}}</Option>
        </Select>
        <Select @on-change="searchData" v-model="filterInfo.seriesid" style="margin-left: 10px;width: 160px;">
          <Option value="">全部车系</Option>
            <OptionGroup  v-for="(item,index) in seriesList[filterInfo.brandid]" v-if="filterInfo.brandid" :key="index" :label="item[0].subcategoryname">
              <Option :value="ele.seriesid" v-for="(ele,number) in item" :key="number">{{ele.seriesname}}</Option>
            </OptionGroup>
        </Select>
      </div>
    </div>
    <div class="date-header">
      <span class="text">获取时间：</span>
      <DatePicker v-model="filterInfo.s_inquirytimemin" format="yyyy/MM/dd" type="date" placeholder="自定义起始时间" style="width: 160px" @on-change="changeStart"></DatePicker>
      <span class="text to">至</span>
      <DatePicker v-model="filterInfo.s_inquirytimemax" format="yyyy/MM/dd" type="date" placeholder="自定义结束时间" style="width: 160px" @on-change="changeEnd"></DatePicker>
    </div>
    <div class="search-header">
      <span>线索搜索：</span>
      <i-input v-model="filterInfo.s_keyword" placeholder="请输入手机号或客户姓名" style="width: 330px"></i-input>
      <Button type="primary" style="margin-left: 10px;width: 60px;" @click="searchData">查询</Button>
      <Button type="primary" style="margin-left: 10px;width: 80px;" @click="searchData">查看全部</Button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['filterInfo'],
  data: () => ({
    // 线索来源
    getwaylist: [],
    // 品牌列表
    brandList: [],
    // 车系列表
    seriesList: {}
  }),
  created() {
    // 线索来源取得
    let getwaylist = this.getStorage('newgetwaylist')
    if (getwaylist) {
      this.getwaylist = getwaylist.getwaylist
    }
    // 获取品牌列表
    let brandlist = this.getStorage('newbrandlist')
    if (brandlist) {
      this.brandList = brandlist.brandlist
    }
    console.log(this.brandList, 'this.brandlist')
    // 获取车系列表
    let serieslist = this.getStorage('newserieslist')
    if (serieslist) {
      this.seriesList = serieslist.serieslist
      console.log(this.seriesList, 'seriesList')
    }
  },
  methods: {
    // 查询
    searchInfo() {
      this.$emit('searchInfo')
    },
    // 查询全部
    searchAll() {
      this.$emit('searchAll')
    },
    // 改变开始时间
    changeStart(e) {
      this.$emit('changeStart', e)
    },
    // 改变结束时间
    changeEnd(e) {
      this.$emit('changeEnd', e)
    },
    searchData() {
      this.$emit('searchData')
    }
  }
}
</script>
<style scoped>
</style>
