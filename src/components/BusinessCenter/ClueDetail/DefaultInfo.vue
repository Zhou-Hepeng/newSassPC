<template>
  <div class="default-info">
    <div class="title">基本信息</div>
    <div class="info-body">
      <div class="tip" v-if="clueInfo.cluebehavior">
        <Icon type="android-alert" class="icon"></Icon>
       {{clueInfo.cluebehavior}}
      </div>
      <div class="item">
        <span class="item-title">意向车型：</span>
        <span class="item-content">{{clueInfo.truckname}}</span>
      </div>
      <div class="item">
        <span class="item-title">所属品牌：</span>
        <span class="item-content">{{clueInfo.brandname}}</span>
      </div>
      <div class="item item-bottom">
        <span class="item-title">所属系列：</span>
        <span class="item-content">{{clueInfo.seriesname + clueInfo.subcategoryname}}</span>
      </div>
      <div class="item item-top">
        <span class="item-title">线索来源：</span>
        <span class="item-content">{{clueInfo.clueresourcename}}</span>
      </div>
      <div class="item">
        <span class="item-title">询价时间：</span>
        <span class="item-content">{{clueInfo.cluecreatedatetime}}</span>
      </div>
      <div class="item">
        <span class="item-title">获取时间：</span>
        <span class="item-content">{{clueInfo.cluecreatedatetime}}</span>
      </div>
      <div class="item">
        <span class="item-title">通话录音：</span>
        <span class="item-content">车型名称车型名称车型名称车型名称车型名称车型名称车型名称</span>
      </div>
      <div class="item">
        <span class="item-title">首次处理：</span>
        <span class="item-content">{{clueInfo.followupdtime}}</span>
      </div>
      <div class="item">
        <span class="item-title">考核状态：</span>
        <span class="item-content" :style="`color: ${examColor}`">{{clueInfo.state}}</span>
      </div>
      <div class="item" v-if="clueInfo.dealtdate">
        <span class="item-title">成交时间：</span>
        <span class="item-content">{{clueInfo.dealtdate}}</span>
      </div>
      <div class="item" v-if="clueInfo.transactionprice">
        <span class="item-title">成交价格：</span>
        <span class="item-content price">{{clueInfo.transactionprice}} 万元</span>
      </div>
      <div class="item" v-if="clueInfo.faildate">
        <span class="item-title">战败时间：</span>
        <span class="item-content">{{clueInfo.faildate}}</span>
      </div>
      <div class="item" v-if="clueInfo.failname">
        <span class="item-title">战败原因：</span>
        <span class="item-content">{{clueInfo.failname}}</span>
      </div>
      <div class="item item-bottom" v-if="clueInfo.invalidname">
        <span class="item-title">无效原因：</span>
        <span class="item-content">{{clueInfo.invalidname}}</span>
      </div>
      <div class="item item-top">
        <span class="item-title">购车数量：</span>
        <span class="item-content">{{clueInfo.expectedbycarnum}}</span>
      </div>
      <div class="item">
        <span class="item-title">车辆用途：</span>
        <span class="item-content">{{clueInfo.cheliangyongtuname}}</span>
      </div>
      <div class="item">
        <span class="item-title item-remark">备注：</span>
        <span class="item-content">{{clueInfo.remark}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['clueInfo'],
  computed: {
    examColor() {
      let color = ['#A1A9B2', '#17AF38', '#F44336']
      return color[this.clueInfo.state]
    }
  },
  data: () => ({})
}
</script>
<style scoped>
  .default-info{
    display: flex;
    flex-direction: column;
    width: 515px;
    height: 671px;
    border: 1px solid #E4E5E6;
    overflow: hidden;
  }
  .title{
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #E4E5E6;
    font-size: 14px;
    color: #17181A;
    font-weight: bold;
  }
  .info-body{
    flex: 1;
    padding: 10px 20px 20px;
    overflow-y: auto;
  }
  .tip{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #F44336;
    line-height: 20px;
  }
  .tip .icon{
    font-size: 14px;
    margin-right: 5px;
  }
  .info-body .item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .info-body .item .item-title{
    width: 70px;
    text-align: right;
    font-size: 14px;
    line-height: 20px;
    color: #5C6066;
  }
  .info-body .item .item-content{
    flex: 1;
    font-size: 14px;
    color: #17181A;
    line-height: 20px;
  }
  .info-body .item .price{
    color: #FF6600;
  }
  .info-body .item-bottom{
    padding-bottom: 15px;
    border-bottom: 1px solid #E4E5E6;
  }
  .info-body .item-top{
    margin-top: 15px;
  }
</style>
