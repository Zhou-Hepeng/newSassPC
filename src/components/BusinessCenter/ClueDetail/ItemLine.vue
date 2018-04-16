<template>
  <div>
    <div v-if="item.followtypename === '跟进'">
      <span class="item-title">{{item.followtypename}}</span>
      <div class="item">
        <div class="time-line-info">
          <span class="time">2017-10-25</span>
          <span class="name">{{type}}</span>
        </div>
        <div class="item-content">
          <span class="content-title">电话联系</span>
          <div class="content-detail content-detail-line">
            <span>设置客户级别为<img :src="`https://s.kcimg.cn/newBusiness/newSass/images/level-${item.clueslevelid}.png`">{{item.clueslevelname}}，计划于<em>{{item.nextvisitdate}}</em>回访</span>
          </div>
          <div class="content-text">
            {{item.remark}}
          </div>
          <div class="content-img">
            <div class="demo-upload-list" v-for="(ele, index) in item.imglist" :key="index">
              <img :src="ele" />
              <div class="demo-upload-list-cover" @click="handleView(ele)">
                <Icon type="ios-search"></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.followtypename === '编辑'">
      <span class="item-title">编辑</span>
      <div class="item">
        <div class="time-line-info">
          <span class="time">{{item.createdate}}</span>
          <span class="name">{{item.followname}}</span>
        </div>
        <div class="item-content">
          <span class="content-title">奥铃CTS 载货车</span>
          <div class="content-detail" v-if="item.clueslevelid === 7">
            <span>设置客户级别为<img :src="`https://s.kcimg.cn/newBusiness/newSass/images/level-${item.clueslevelid}.png`">{{item.clueslevelname}} <span v-if="item.invalcasename">，{{item.clueslevelname}}原因为<em class="default">“{{item.invalcasename}}”</em>。</span></span>
          </div>
          <div class="content-detail" v-if="item.clueslevelid === 2 || item.clueslevelid === 3 || item.clueslevelid === 4">
            <span>设置客户级别为<img :src="`https://s.kcimg.cn/newBusiness/newSass/images/level-${item.clueslevelid}.png`">{{item.clueslevelname}}，计划于<em>{{item.nextvisitdate}}</em>回访</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.followtypename === '转交'">
      <span class="item-title">转交</span>
      <div class="item">
        <div class="time-line-info">
          <span class="time">{{item.createdate}}</span>
          <span class="name">{{item.followname}}</span>
        </div>
        <div class="item-content">
          <div class="content-detail">
            <span>{{item.followname}}将线索<em class="default">转交给：{{item.tousername}}</em>原归属于{{item.followname}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.followtypename === '查看'">
      <span class="item-title">查看</span>
      <div class="item">
        <div class="time-line-info">
          <span class="time">{{item.createdate}}</span>
          <span class="name">{{item.followname}}</span>
        </div>
        <div class="item-content">
          <div class="content-detail">
            <span>{{item.followname}}于<em class="default">{{item.createdate}}</em>首次查看该线索</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item', 'type', 'imgList'],
  data: () => ({}),
  methods: {
    handleView(img) {
      this.$emit('handleView', img)
    }
  }
}
</script>
<style scoped>
  .item{
    display: flex;
    flex-direction: column;
  }
  .item-title{
    position: absolute;
    left: -54px;
    top: 2px;
    font-size: 12px;
    line-height: 12px;
    background: #FAFAFA;
    color: #5C6066;
    padding: 3px 5px;
    border-radius: 2px;
  }
  .time-line-item:first-child .item-title{
    background: #25A6FF;
    color: #fff;
  }
  .time-line-info{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .time{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 20px;
  }
  .name{
    margin-left: 5px;
    font-size: 12px;
    color: #17181A;
    line-height: 20px;
  }
  .item-content{
    margin-top: 10px;
    padding: 10px;
    background: #FAFAFA;
    border: 1px solid #E4E5E6;
    border-radius: 4px;
  }
  .content-title{
    font-size: 12px;
    font-weight: bold;
    color: #17181A;
    line-height: 20px;
  }
  .content-detail{
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .content-detail-line{
    padding-bottom: 9px;
    border-bottom: 1px solid #E4E5E6;
  }
  .content-detail span{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 12px;
    color: #5C6066;
    line-height: 20px;
  }
  .content-detail img{
    margin: 0 2px;
    width: 16px;
    height: 16px;
    border-radius: 2px;
  }
  .content-detail em{
    margin: 0 4px;
    color: #F44336;
  }
  .content-detail em.default{
    color: #0B0C00;
  }
  .content-text{
    margin-top: 10px;
  }
  .content-img{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .content-img img{
    width: 87px;
    height: 58px;
  }
  .demo-upload-list{
    margin-top: 10px;
    position: relative;
    text-align: center;
    width: 87px;
    height: 58px;
    line-height: 58px;
    margin-left: 10px;
  }
  .demo-upload-list:nth-of-type(4n-3){
    margin-left: 0;
  }
  .demo-upload-list-cover{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,.6);
    cursor: pointer;
  }
  .demo-upload-list-cover i{
    position: absolute;
    top: 3px;
    left: 3px;
    color: #fff;
    font-size: 14px;
    margin: 0 2px;
  }
</style>
