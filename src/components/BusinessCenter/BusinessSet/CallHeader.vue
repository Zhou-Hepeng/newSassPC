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
        <span>使用状态：</span>
        <Select v-model="filterInfo.usedStatus" style="width: 160px;">
          <Option :value="0">全部</Option>
          <Option value="1">lv.1</Option>
          <Option value="2">lv.2</Option>
          <Option value="3">lv.3</Option>
        </Select>
      </div>
      <div class="call-search">
        <span>号码搜索：</span>
        <i-input v-model="filterInfo.tel" placeholder="请输入400号码" style="width: 330px"></i-input>
        <Button type="primary" style="margin-left: 10px;width: 60px;height: 30px;" @click="searchInfo">查询</Button>
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
  .call-search{
    margin-left: 20px;
  }
</style>
