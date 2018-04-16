<template>
  <div class="filter-header">
    <div class="select-header">
      <div class="item">
        <span>品牌店铺：</span>
        <Select v-model="filterInfo.brand" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
      <div class="item">
        <span>通话状态：</span>
        <Select v-model="filterInfo.telStatus" style="width: 160px;">
          <Option :value="1">全部</Option>
          <Option :value="2">未接电话</Option>
          <Option :value="3">未转化</Option>
        </Select>
      </div>
      <div class="item">
        <span>考核状态：</span>
        <Select v-model="filterInfo.examStatus" style="width: 160px;">
          <Option :value="0">全部品牌</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
    </div>
    <div class="date-header">
      <span class="text">来电时间：</span>
      <DatePicker v-model="filterInfo.startTime" format="yyyy/MM/dd" type="date" placeholder="自定义起始时间" style="width: 160px" @on-change="changeStart"></DatePicker>
      <span class="text to">至</span>
      <DatePicker v-model="filterInfo.endTime" format="yyyy/MM/dd" type="date" placeholder="自定义结束时间" style="width: 160px" @on-change="changeEnd"></DatePicker>
    </div>
    <div class="search-header">
      <span>来电搜索：</span>
      <i-input v-model="filterInfo.searchValue" placeholder="请输入手机号或客户姓名" style="width: 330px"></i-input>
      <Button type="primary" style="margin-left: 10px;width: 60px;" @click="searchInfo">查询</Button>
      <Button type="primary" style="margin-left: 10px;width: 80px;" @click="searchAll">查看全部</Button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['filterInfo'],
  data: () => ({}),
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
    }
  }
}
</script>
<style scoped>
</style>
