<template>
  <div class="header-info">
    <img :src="clueInfo.clueslevel ? `https://s.kcimg.cn/newBusiness/newSass/images/level-${clueInfo.clueslevel}.png` : 'https://s.kcimg.cn/gonggao/default90.jpg'" />
    <div class="info">
      <div class="user">
        <span class="name">{{clueInfo.realname}}</span>
        <span class="tel">{{clueInfo.tel}} ({{clueInfo.provincename == clueInfo.cityname ? clueInfo.provincename : clueInfo.provincename + clueInfo.cityname}}) </span>
      </div>
      <div class="follow">
        <span class="title">跟进人员：<em>{{clueInfo.cluefollowname}}</em></span>
        <span class="title" v-if="clueInfo.nextvisitdate">计划回访时间：<em>{{clueInfo.nextvisitdate}}</em></span>
      </div>
    </div>
    <Button type="primary" style="width: 100px;" @click="addRecord">添加跟进记录</Button>
    <Button type="primary" style="margin-left: 10px;width: 80px;" @click="edit">编辑</Button>
    <Button type="primary" style="margin-left: 10px;width: 80px;" @click="distribute">分配</Button>
  </div>
</template>
<script>
export default {
  props: ['clueInfo'],
  methods: {
    // 添加跟进记录
    addRecord() {
      this.$emit('addRecord')
    },
    // 编辑
    edit() {
      this.$emit('edit')
    },
    // 分配
    distribute() {
      this.$emit('distribute')
    }
  }
}
</script>
<style scoped>
  .header-info{
    margin-top: 20px;
    height: 98px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #FFF9F9;
    border: 1px solid #FFD7D5;
    box-shadow: 0 -2px 5px 0 rgba(244,67,54,0.10);
    border-radius: 10px;
  }
  .header-info img{
    margin-right: 20px;
    width: 58px;
    height: 58px;
  }
  .info{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .user, .follow{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name{
    font-size: 20px;
    color: #17181A;
    line-height: 30px;
  }
  .user .tel{
    margin-left: 5px;
    font-size: 14px;
    color: #5C6066;
  }
  .follow{
    margin-top: 9px;
  }
  .follow .title{
    font-size: 12px;
    color: #5C6066;
    line-height: 20px;
  }
  .follow .title:first-child {
    position: relative;
  }
  .follow .title:first-child:after{
    content: "";
    position: absolute;
    top: 4px;
    height: 12px;
    width: 1px;
    right: -10px;
    background: #DFE3EB;
  }
  .follow .title:last-child {
    margin-left: 21px;
  }
  .follow .title em{
    color: #3A8DFF;
  }
</style>
