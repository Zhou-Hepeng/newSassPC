<template>
  <div class="detail">
    <div class="title">
      抵扣卷
      <span>抵扣卷<i>>></i>{{fromTitle}}的订单线索<i>>></i><em>查看详情</em></span>
    </div>
    <!-- 用户信息 -->
    <div class="info order-info">
      <div class="item">
        <span class="item-name">订单编号：</span>
        <span>{{info.id}}</span>
      </div>
      <div class="item">
        <span class="item-name">订单状态：</span>
        <span>{{info.orderStatus}}</span>
      </div>
      <div class="item">
        <span class="item-name">订单归属：</span>
        <span>{{info.orderBelong}}</span>
      </div>
    </div>
    <!-- 意向车型 -->
    <div class="info">
      <span class="info-title">活动信息</span>
      <div class="content">
        <img src="https://s.kcimg.cn/gonggao/default90.jpg">
        <div class="content-info">
          <span class="car-info">1500马力奔驰牛逼牵引头售136.8万！ 七款牵引车团购会优惠在即！最高优惠5000元！</span>
          <span class="price">活动时间：2017-10-10至2017-12-12</span>
          <span class="order-price">活动形式：<em>1元 抵扣 2000元</em></span>
        </div>
      </div>
    </div>
    <!-- 客户信息 -->
    <div class="info">
      <span class="info-title">客户信息</span>
      <div class="item">
        <span class="item-name">客户姓名：</span>
        <span>{{info.name}}</span>
      </div>
      <div class="item">
        <span class="item-name">联系方式：</span>
        <span>{{info.tel}}</span>
      </div>
      <div class="item">
        <span class="item-name">备注信息：</span>
        <span>{{info.remark}}</span>
      </div>
      <div class="item">
        <span class="item-name">抵扣券有效期：</span>
        <span>2017-11-30</span>
      </div>
    </div>
    <!-- 支付信息 -->
    <div class="info no-bottom">
      <span class="info-title">支付信息</span>
      <div class="item">
        <span class="item-name">支付方式：</span>
        <span>{{info.name}}</span>
      </div>
      <div class="item">
        <span class="item-name">支付时间：</span>
        <span>{{info.tel}}</span>
      </div>
      <div class="item">
        <span class="item-name">退款时间：</span>
        <span>{{info.location}}</span>
      </div>
      <div class="item">
        <span class="item-name">完成退款时间：</span>
        <span>{{info.location}}</span>
      </div>
      <div class="item">
        <span class="item-name">完成提车时间：</span>
        <span>{{info.location}}</span>
      </div>
    </div>
    <div class="footer">
      <Button type="primary" class="give" @click="giveOther">转交订单</Button>
      <Button type="primary" class="delete" @click="deleteCode">卷码核销</Button>
      <Button type="ghost" class="back" style="margin-left: 10px;width: 100px;height: 40px" @click="goBack"><Icon type="chevron-left" style="margin-right: 4px;"></Icon>返回列表</Button>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    // 来源
    fromTitle: '',
    // 订单信息
    info: ''
  }),
  created() {
    this.fromTitle = this.$route.query.from
    this.info = JSON.parse(this.$route.query.info)
  },
  methods: {
    // 转交订单
    giveOther() {
      console.log('转交订单')
    },
    // 卷码核销
    deleteCode() {
      console.log('卷码核销')
    },
    // 返回列表
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
  .detail{
    display: flex;
    flex-direction: column;
  }
  .title{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding-bottom: 9px;
    font-size: 20px;
    color: #17181A;
    line-height: 30px;
    border-bottom: 1px solid #E4E5E6;
  }
  .title span{
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #5C6066;
    line-height: 22px;
  }
  .title i{
    margin: 0 4px;
  }
  .title em{
    color: #2397E8
  }
  .info{
    padding: 10px 0 19px;
    border-bottom: 1px solid #E4E5E6;
  }
  .info .item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #17181A;
    line-height: 20px;
  }
  .info .info-title{
    font-weight: bold;
    font-size: 14px;
    color: #17181A;
    line-height: 30px;
  }
  .item .item-name{
    color: #5C6066;
    width: 98px;
    text-align: left;
  }
  .order-info .item .item-name{
    font-size: 14px;
    color: #5C6066;
    width: auto;
  }
  .info .content{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
  .info .content img{
    width: 120px;
    height: 80px;
  }
  .content-info{
    margin-left: 11px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .car-info{
    font-size: 14px;
    color: #17181A;
    line-height: 30px;
  }
  .price{
    margin-top: 11px;
    font-size: 12px;
    color: #17181A;
    line-height: 20px;
  }
  .order-price{
    font-size: 12px;
    color: #17181A;
    line-height: 20px;
  }
  .order-price em{
    color: #FF6600;
  }
  .footer{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .footer button{
    width: 100px;
    height: 40px;
    border-radius: 4px;
  }
  .footer .give,.footer .delete{
    color: #fff;
    font-size: 16px;
  }
  .footer .delete{
    margin-left: 10px;
  }
  .footer .back{
    font-size: 14px;
    color: #25A6FF;
    border: 1px solid #25A6FF;
  }
  .no-bottom{
    padding: 10px 0 20px;
    border-bottom: 0;
  }
</style>
