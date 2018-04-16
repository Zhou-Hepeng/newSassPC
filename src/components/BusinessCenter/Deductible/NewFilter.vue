<template>
  <div class="filter-header">
    <div class="select-header">
      <div class="item">
        <span>选择排序：</span>
        <Select v-model="filterInfo.sort" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
      <div class="item">
        <span>选择车型：</span>
        <Select v-model="filterInfo.brandid" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
        <Select v-model="filterInfo.seriesid" style="width: 160px;margin-left:20px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
        <Select v-model="filterInfo.carType" style="width: 160px;margin-left:20px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
    </div>
    <div class="search-header">
      <div class="item">
        <span>条件搜索：</span>
        <i-input v-model="filterInfo.searchValue" placeholder="请输入订单号、客户姓名搜索" style="width: 330px"></i-input>
        <Button type="primary" style="margin-left: 10px;width: 60px;" @click="searchInfo">查询</Button>
      </div>
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
    }
  }
}
</script>
<style scoped>

</style>
