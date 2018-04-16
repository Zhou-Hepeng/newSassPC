<template>
  <Modal :value="isShow" width="400" @on-cancel="hide" :styles="{top: '300px'}">
    <p slot="header" class="title">
      <span>分配</span>
    </p>
    <div class="content">
      <span>将<em>客户：{{info.name}}</em>的订单{{info.id}}分配给</span>
    </div>
    <div class="ali-item">
      <span>负责人：</span>
        <Select v-model="account" style="width: 160px;" placeholder="选择账号">
          <Option :value="0">xxxx</Option>
          <Option :value="1">xxxx1</Option>
          <Option :value="2">xxxx2</Option>
        </Select>
      </div>
    <div slot="footer">
      <Button type="primary" style="width: 80px;" @click="confirm">确定</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['isShow', 'info'],
  data: () => ({
    account: ''
  }),
  methods: {
    // 关闭弹层
    hide() {
      this.$emit('hide')
    },
    // 确定
    confirm() {
      this.$emit('confirm')
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
    font-size: 14px;
    color: #0B0C00;
    line-height: 20px;
  }
  .content em{
    color: #F44336;
  }
  .ali-item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .ali-item span{
    color: #17181A;
  }
</style>
