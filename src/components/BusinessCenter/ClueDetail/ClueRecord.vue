<template>
  <div class="clue-record">
    <div class="title">线索处理记录</div>
    <div class="record-body">
      <Timeline class="time-line">
        <!-- 循环时间轴 -->
        <TimelineItem class="time-line-item" v-for="(item, index) in followRecord" :key="index">
          <item-line :item="item" @handleView="handleView"></item-line>
        </TimelineItem>
      </Timeline>
    </div>
    <Modal title="View Image" v-model="visible">
        <img :src="viewImg" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import ItemLine from './ItemLine'

export default {
  props: ['followRecord'],
  components: {
    ItemLine
  },
  data: () => ({
    visible: false, // 大图弹层
    viewImg: '', // 查看大图
    list: [
      {
        type: 'follow'
      },
      {
        type: 'look'
      },
      {
        type: 'distribute'
      },
      {
        type: 'look'
      },
      {
        type: 'distribute'
      },
      {
        type: 'look'
      },
      {
        type: 'distribute'
      },
      {
        type: 'look'
      }
    ],
    imgList: [
      {
        img: 'https://s.kcimg.cn/newBusiness/newSass/images/level-0.png'
      }
    ]
  }),
  created() {},
  methods: {
    handleView(img) {
      this.viewImg = img
      this.visible = true
    }
  }
}
</script>
<style scoped>
  .clue-record{
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
  .record-body{
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  .item{
    display: flex;
    flex-direction: column;
  }
  .time-line{
    padding-left: 54px;
  }
  .time-line-item{
    position: relative;
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
