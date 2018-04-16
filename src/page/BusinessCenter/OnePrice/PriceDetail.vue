<template>
  <div class="detail">
    <div class="title">
      一口价
      <span>一口价<i>>></i>{{fromTitle}}的订单线索<i>>></i><em>查看详情</em></span>
    </div>
    <!-- 用户信息 -->
    <div class="info order-info">
      <div class="item">
        <span class="item-name">订单编号：</span>
        <span>{{info.order_id}}</span>
      </div>
      <div class="item">
        <span class="item-name">订单状态：</span>
        <span>{{info.status_name}}</span>
      </div>
      <div class="item">
        <span class="item-name">订单归属：</span>
        <span>{{info.sale_name}}</span>
      </div>
    </div>
    <!-- 意向车型 -->
    <div class="info">
      <span class="info-title">意向车型</span>
      <div class="content">
        <img :src="info.main_img">
        <div class="content-info">
          <span class="car-info">{{info.product_name}}</span>
          <span class="price">裸车价：{{info.margin}}万元</span>
          <span class="order-price">订金：<em>{{info.paymoney}}元</em></span>
        </div>
      </div>
    </div>
    <!-- 客户信息 -->
    <div class="info">
      <span class="info-title">客户信息</span>
      <div class="item">
        <span class="item-name">客户姓名：</span>
        <span>{{info.user_name}}</span>
      </div>
      <div class="item">
        <span class="item-name">联系方式：</span>
        <span>{{info.user_tel}}</span>
      </div>
      <div class="item">
        <span class="item-name">期望上牌城市：</span>
        <span>{{info.province_name}} {{info.city_name}}</span>
      </div>
    </div>
    <!-- 支付信息 -->
    <div class="info no-bottom">
      <span class="info-title">支付信息</span>
      <div class="item">
        <span class="item-name">支付方式：</span>
        <span>{{info.pay_type_name}}</span>
      </div>
      <div class="item">
        <span class="item-name">支付时间：</span>
        <span>{{info.pay_time}}</span>
      </div>
      <div class="item" v-if="info.apply_refund_time">
        <span class="item-name">退款时间：</span>
        <span>{{info.apply_refund_time}}</span>
      </div>
      <div class="item" v-if="info.refund_time">
        <span class="item-name">完成退款时间：</span>
        <span>{{info.refund_time}}</span>
      </div>
      <div class="item">
        <span class="item-name">完成提车时间：</span>
        <span>????</span>
      </div>
    </div>
    <div class="footer">
      <Button type="primary" class="give" @click="giveOther">转交订单</Button>
      <Button type="ghost" class="back" style="margin-left: 10px;width: 100px;height: 40px" @click="goBack"><Icon type="chevron-left" style="margin-right: 4px;"></Icon>返回列表</Button>
    </div>
    <Modal v-model="tip" width="360" @on-cancel="hide">
        <p slot="header">
          <span>错误提示</span>
        </p>
        <div class="model-body">
          <Icon class="icon" type="close-circled"></Icon>
          <span class="content">{{msg}}</span>
        </div>
        <div slot="footer">
          <Button type="primary" @click="hide">确定</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data: () => ({
    // 来源
    fromTitle: '',
    // 订单号
    order_code: '',
    // 详情数据
    info: {},
    // 错误提示
    tip: false,
    // 提示内容
    msg: ''
  }),
  created() {
    this.fromTitle = this.$route.query.from
    this.order_code = this.$route.query.order_code
    this.fetch()
  },
  methods: {
    // 订单详情
    fetch() {
      const json = {
        order_code: this.order_code
      }
      this.get(`/bigchemall/Order/GetOrderDetail.aspx`, json)
        .then(res => {
          let { data, status } = res.data
          if (!status) {
            this.tip = true
            this.msg = res.data.msg
            return
          }
          this.info = data.order
          console.log(data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 点击弹层确定
    hide() {
      this.$router.go(-1)
    },
    // 转交订单
    giveOther() {
      console.log('转交订单')
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
    object-fit: cover;
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
  .footer .give{
    color: #fff;
    font-size: 16px;
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
  .model-body{
    padding-top: 10px;
    padding-left: 36px;
    position: relative;
  }
  .model-body .icon{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 36px;
    color: #ed3f14;
  }
  .model-body .content{
    font-size: 16px;
    color: #1c2438;
  }
</style>
