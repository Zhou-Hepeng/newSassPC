<template>
  <Modal :value="isShow" width="600" @on-cancel="hideAdd" :styles="{top: '200px'}">
    <p slot="header" class="title">
      <span>添加号码</span>
    </p>
    <div class="item">
      <span>添加方式：</span>
      <RadioGroup v-model="type">
        <Radio label="own"><span>已有账号</span></Radio>
        <Radio label="add"><span>其他号码</span></Radio>
      </RadioGroup>
    </div>
    <!-- 添加账号 -->
    <div class="follow" v-if="type === 'add'">
      <span>跟进方式：</span>
      <i-input style="width: 500px;" placeholder="请输入正确的手机号或座机号" v-model="addTelValue"></i-input>
    </div>
    <!-- 已有账号 -->
    <div class="own-account" v-else>
      <span class="tip">*只能选择添加本关联本品牌的网销顾问或销售顾问</span>
      <!-- table -->
      <Table height="200" style="margin-top: 10px;" @on-select="selectChange" @on-select-cancel="selectCancel" border :columns="columns" :data="tableData"></Table>
    </div>
    <div slot="footer">
      <Button type="ghost" style="margin-left: 8px;width: 60px;" @click="hideAdd">取消</Button>
      <Button type="primary" style="width: 80px;" @click="saveAdd">保存</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['isShow', 'columns', 'tableData'],
  data: () => ({
    // 账号类型 'own'为已有账号  'add' 为添加
    type: 'add',
    // 添加手机号
    addTelValue: ''
  }),
  methods: {
    hideAdd() {
      this.$emit('hideAdd', false)
    },
    // checkbox选择
    selectChange(selection, row) {
      this.tableData.map((item, index) => {
        if (row.index !== index) {
          return (item._disabled = true)
        }
        return (item._checked = true)
      })
      console.log(selection)
    },
    // 取消选择
    selectCancel(selection, row) {
      this.tableData.map((item, index) => {
        if (row.index !== index) {
          return (item._disabled = false)
        }
        return (item._checked = false)
      })
    },
    // 保存添加
    saveAdd() {
      if (this.type === 'add') {
        this.$emit('saveAdd')
      } else {
        this.$emit('saveAccount')
      }
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
  .follow, .own-account{
    margin-top: 15px;
  }
  .tip{
    font-size: 12px;
    color: #F44336;
    line-height: 20px;
  }
</style>
