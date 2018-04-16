<template>
  <div class="tel-item">
    <div class="input-tel" v-if="type === 'add'">
      <span>{{list.tel}}</span>
      <Icon type="compose" @click.native="editTel"></Icon>
      <Icon type="trash-a" @click.native="removeTel"></Icon>
    </div>
    <div class="input-tel" v-if="type === 'own'">
      <span>{{list.tel}}</span>
      <Icon type="trash-a" @click.native="removeTel"></Icon>
    </div>
    <div class="input-tel" v-if="type === 'default'">
      <span class="default">点击添加按钮，输入手机号或座机号</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['list', 'index'],
  computed: {
    type() {
      let type = this.list.type
      if (type === 'add') {
        return 'add'
      } else if (type === 'own') {
        return 'own'
      }
      return 'default'
    }
  },
  data: () => ({}),
  methods: {
    // 编辑手机号
    editTel() {
      this.$emit('editTel', this.index)
    },
    // 删除手机号
    removeTel() {
      this.$emit('removeTel', this.index)
    }
  }
}
</script>
<style scoped>
  .input-tel{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    width: 330px;
    height: 30px;
    border: 1px solid #E4E5E6;
    border-radius: 3px;
    background: #fff;
  }
  .tel-item:not(:first-child){
    margin-top: 10px;
  }
  .input-tel span{
    flex: 1;
  }
  .input-tel i{
    line-height: 30px;
    padding: 0 5px;
    font-size: 16px;
    color: #25A6FF;
    cursor: pointer;
  }
  .default{
    color: #A1A9B2;
  }
</style>
