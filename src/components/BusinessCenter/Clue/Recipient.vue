<template>
  <Modal :value="isShow" width="400" @on-cancel="hideRecipient">
    <p slot="header" class="title">
      <span>接收人</span>
    </p>
    <div class="content">
      <div class="content-header">
        <span class="person-name" v-for="(item, index) in person" :key="index">{{item.name}};</span>
      </div>
      <div class="content-tip">
        <Icon class="tip-icon" type="information-circled"></Icon>
        <span>卡友提交多条线索，系统会分配给之前已获取该卡有线索的网销顾问。</span>
      </div>
    </div>
    <div slot="footer">
      <Button type="ghost" style="margin-left: 8px;width: 60px;" @click="hideRecipient">取消</Button>
      <Button type="primary" style="width: 80px;" @click="hideRecipient">知道了</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['isShow', 'person'],
  data: () => ({}),
  methods: {
    // 关闭弹层
    hideRecipient() {
      this.$emit('hideRecipient')
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
  .content{
    display: flex;
    flex-direction: column;
  }
  .content-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    line-height: 20px;
  }
  .person-name{
    font-size: 14px;
    color: #17181A;
  }
  .person-name:not(:first-child){
    margin-left: 4px;
  }
  .content-tip{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .tip-icon{
    margin-top: 4px;
    color: #F44336;
    transform: rotate(180deg);
  }
  .content-tip span{
    margin-left: 5px;
    font-size: 12px;
    line-height: 20px;
    color: #F44336;
  }
</style>
