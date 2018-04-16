<template>
  <ul class="select-bar">
    <li :class="['li-bar', selectIndex == index ? 'select-li' : '']" v-for="(item,index) in titleArr" :key="index" @click="selectBar(index)">
      <span>{{item.name}}</span>
      <span v-if="item.num">({{item.num}})</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    titleArr: {
      type: Array
    },
    selectIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectBar(index) {
      this.$emit('selectBar', index)
      this.newSetStorage('selectBarIndex', index)
    }
  }
}
</script>
<style scoped>
  .select-bar{
    position: relative;
    margin-top: 20px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 10px;
  }
  .select-bar:after{
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #E4E5E6;
  }
  .li-bar{
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 0;
    margin: 0 20px;
  }
  .li-bar:first-child{
    margin-left: 0;
  }
  .li-bar:hover{
    cursor: pointer;
  }
  .li-bar:after{
    position: absolute;
    content: "";
    right: -20px;
    top: 7px;
    height: 16px;
    width: 1px;
    background-color: #E4E5E6;
  }
  .li-bar:last-child:after{
    width: 0;
  }
  .li-bar span{
    font-size: 14px;
    color: #17181A;
    line-height: 16px;
    font-weight: bold;
  }
  .select-li{
    position: relative;
  }
  .select-li span{
    color: #25A6FF;
  }
  .select-li span:before{
    position: absolute;
    content: "";
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #25A6FF;
  }
</style>
