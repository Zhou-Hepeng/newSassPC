<template>
  <div class="level-set">
    <!-- 提示考核处理率计算 -->
    <clue-exam-tip :tipText="tipText"></clue-exam-tip>
    <div class="time-item">
      <span>A重点:</span>
      <InputNumber :max="365" :min="1" v-model="importValue" @on-change="changeImport" style="width: 160px;"></InputNumber>
      <span>天后回访</span>
    </div>
    <div class="time-item">
      <span>B一般:</span>
      <InputNumber :max="365" :min="1" v-model="normalValue" @on-change="changeNormal" style="width: 160px;"></InputNumber>
      <span>天后回访</span>
    </div>
    <div class="time-item">
      <span>C潜在:</span>
      <InputNumber :max="365" :min="1" v-model="latentValue" @on-change="changeLatent" style="width: 160px;"></InputNumber>
      <span>天后回访</span>
    </div>
    <Button type="primary" style="margin-top: 30px;width: 200px;height: 40px;font-size: 16px;font-weight: bold;background: #2397E8" @click="saveInfo">保存</Button>
  </div>
</template>
<script>
import ClueExamTip from '@/components/ClueExamTip'

export default {
  components: {
    ClueExamTip
  },
  data() {
    return {
      // 规则提示
      tipText:
        '您可根据实际情况设置不同客户级别的默认下次回访时间，设置区间为1-365天',
      // 重点
      importValue: 1,
      // 一般
      normalValue: 1,
      // 潜在
      latentValue: 1
    }
  },
  methods: {
    // 改变重点
    changeImport(e) {
      console.log(e)
    },
    // 改变普通
    changeNormal(e) {
      console.log(e)
    },
    // 改变潜在
    changeLatent(e) {
      console.log(e)
    },
    // 保存
    saveInfo() {
      console.log(this.importValue, this.normalValue, this.latentValue)
    }
  }
}
</script>
<style scoped>
  .time-item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .time-item span{
    font-size: 12px;
    color: #333;
    line-height: 20px;
  }
  .time-item span:first-child{
    margin-right: 5px;
  }
  .time-item span:last-child{
    margin-left: 5px;
  }
</style>
