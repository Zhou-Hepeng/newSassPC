<template>
  <div class="tip">
    <Icon class="tip-icon" type="android-alert" size="14"></Icon>
    <div class="tip-text">{{tipText}}<span v-if="ruleText" @click="showClueRule">(<em>{{ruleText}}</em>)</span>。</div>
  </div>
</template>
<script>
export default {
  props: ['tipText', 'ruleText'],
  data: () => ({}),
  methods: {
    showClueRule() {
      this.$emit('showClueRule', true)
    }
  }
}
</script>
<style scoped>
  .tip{
    margin: 20px 0 16px;
    padding: 9px 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background: #FFF9F9;
    border: 1px solid #FFD7D5;
  }
  .tip-icon{
    margin-left: 10px;
    color: #F44336;
    line-height: 18px;
  }
  .tip-text{
    margin-left: 5px;
    font-size: 12px;
    line-height: 18px;
    color: #5C6066;
  }
  .tip-text em{
    color: #3A8DFF;
    cursor: pointer;
  }
</style>
