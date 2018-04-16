<template>
  <Modal :value="isShow" width="400" @on-cancel="hide" :styles="{top: '300px'}">
    <p slot="header" class="title">
      <span>考核情况</span>
    </p>
    <div class="body">
      <div class="item">
        <span>获取时间</span>
        <span>{{info && info.starttime}}</span>
      </div>
      <div class="item">
        <span>首次回拨</span>
        <span>没有</span>
      </div>
      <div class="item">
        <span>首次回拨</span>
        <span>没有</span>
      </div>
    </div>
    <div slot="footer">
      <Button type="primary" style="width: 80px;" @click="hide">确定</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['isShow', 'info'],
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>
<style scoped>
  .title{
    font-size: 16px;
    color: #17181A;
    text-align: left;
    height: 22px;
    line-height: 22px
  }
  .body{
    border: 1px solid #E4E5E6;
  }
  .item{
    height: 40px;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #E4E5E6;
  }
  .item:last-child{
    border-bottom: none;
  }
  .item span{
    font-size: 12px;
    color: #17181A;
  }
  .item span:first-child{
    flex: 1;
    border-right: 1px solid #E4E5E6;
  }
  .item span:last-child{
    flex: 2;
  }
</style>
