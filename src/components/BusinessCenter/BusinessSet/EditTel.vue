<template>
  <Modal :value="isShow" width="400" @on-cancel="hideAdd" :styles="{top: '300px'}">
    <p slot="header" class="title">
      <span>编辑号码</span>
    </p>
    <div class="item">
      <span>输入号码：</span>
      <i-input style="width: 300px;" placeholder="请输入号码" :value="telValue" @on-change="changeValue"></i-input>
    </div>
    <div slot="footer">
      <Button type="ghost" style="margin-left: 8px;width: 60px;" @click="hideAdd">取消</Button>
      <Button type="primary" style="width: 80px;" @click="saveEdit">保存</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['isShow', 'index', 'telValue'],
  data: () => ({
    outputValue: ''
  }),
  methods: {
    hideAdd() {
      this.$emit('hideAdd', false)
    },
    changeValue(e) {
      this.outputValue = e.target.value
    },
    saveEdit() {
      this.$emit('saveEdit', this.index, this.outputValue)
      this.hideAdd()
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
</style>
