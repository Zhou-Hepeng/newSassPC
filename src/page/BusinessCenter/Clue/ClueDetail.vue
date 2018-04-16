<template>
  <div class="clue-detail">
    <div class="header">
      <span class="title">线索详情</span>
      <span class="back" @click="goBack">返回上一页 >></span>
    </div>
    <!-- user header -->
    <user-info :clueInfo="clueInfo" @addRecord="addRecord" @distribute="distribute"></user-info>
    <!-- info body -->
    <div class="detail-body">
      <!-- 基本信息 -->
      <default-info :clueInfo="clueInfo"></default-info>
      <!-- 线索处理记录 -->
      <clue-record :followRecord="followRecord"></clue-record>
    </div>
    <!-- 添加跟进记录 -->
    <add-follow :isShowFollow="showAddFollow" @hideAddFollow="hideAddFollow" :cluesextendid="clueInfo.cluesextendid"></add-follow>
    <!-- 分配弹层 -->
    <allot :isShow="showAllotModal" :clueInfo="clueInfo" @hide="hide"></allot>
  </div>
</template>
<script>
import UserInfo from '@/components/BusinessCenter/ClueDetail/UserInfo'
import DefaultInfo from '@/components/BusinessCenter/ClueDetail/DefaultInfo'
import ClueRecord from '@/components/BusinessCenter/ClueDetail/ClueRecord'
import AddFollow from '@/components/BusinessCenter/Clue/AddFollow'
import Allot from '@/components/BusinessCenter/Clue/Allot'

export default {
  components: {
    UserInfo,
    DefaultInfo,
    ClueRecord,
    AddFollow,
    Allot
  },
  data() {
    return {
      // 线索信息
      clueInfo: {},
      // 跟进记录列表
      followRecord: [],
      // 添加跟进记录弹层
      showAddFollow: false,
      // 分配弹层
      showAllotModal: false
    }
  },
  created() {
    let clueInfo = this.getStorage('clueInfo')
    if (clueInfo) {
      this.clueInfo = clueInfo
    }
    console.log(this.clueInfo)
    // 请求跟进记录
    this.getRecord()
  },
  methods: {
    getRecord() {
      // 请求跟进记录列表
      this.ajax(
        `/newsaasapi/Clues/GetClueFollowUpList.aspx?cluesextendid=${
          this.clueInfo.cluesextendid
        }`,
        ele => {
          if (ele.data.status === 1) {
            this.followRecord = ele.data.listdata
            console.log(this.followRecord, 'this.followRecord')
            // this.setStorage('clurInfoFollowRecord', ele.data.listdata)
          } else if (ele.data.status === 901) {
            this.clearInfo()
          } else {
            alert(ele.data.msg)
          }
        },
        () => {
          alert('网络错误')
        }
      )
    },
    goBack() {
      this.$router.go(-1)
    },
    // 添加跟进记录
    addRecord() {
      this.showAddFollow = true
    },
    // 关闭添加跟进记录弹层
    hideAddFollow(e) {
      this.showAddFollow = e
    },
    // 分配
    distribute() {
      this.showAllotModal = true
    },
    // 隐藏分配弹层
    hide() {
      this.showAllotModal = false
    }
  }
}
</script>
<style scoped>
  .header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .title{
    font-size: 20px;
    color: #17181A;
    line-height: 30px;
  }
  .back{
    font-size: 12px;
    color: #3A8DFF;
    line-height: 22px;
    cursor: pointer;
  }
  .detail-body{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
