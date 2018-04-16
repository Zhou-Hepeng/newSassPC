<template>
  <Modal :value="isShow" width="400" @on-cancel="hide" :styles="{top: '300px'}">
    <p slot="header" class="title">
      <span>分配</span>
    </p>
    <div class="content">
      <span>将<em>客户：
        <template v-if="clueInfo.length" v-for="item in clueInfo">{{item.realname}}   </template>
        <template>{{clueInfo.realname}}</template>
        </em>的线索分配给
      </span>
    </div>
    <div class="ali-item">
      <span>负责人：</span>
        <Select v-model="accountId" style="width: 160px;" placeholder="选择账号">
          <Option :value="item.id" v-for="(item,index) in accountList" :key="index">{{item.realname}}</Option>
        </Select>
      </div>
    <div slot="footer">
      <Button type="primary" style="width: 80px;" @click="confirm">确定</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: ['isShow', 'clueInfo'],
  data: () => ({
    accountId: '',
    accountList: ''
  }),
  created() {
    // 获取转交列表
    this.ajax(
      '/newsaasapi/Clues/GetCluesTransmitList.aspx?',
      ele => {
        if (ele.data.status === 1) {
          this.accountList = ele.data.data.accountlist
          console.log(this.accountList)
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
  methods: {
    // 关闭弹层
    hide() {
      this.$emit('hide')
    },
    // 确定
    confirm() {
      let cluesextendid = []
      if (this.clueInfo.length) {
        this.clueInfo.foreach(function(ele) {
          cluesextendid.push(ele.cluesextendid)
        })
      } else {
        cluesextendid.push(this.clueInfo.cluesextendid)
      }
      this.postData(
        `/newsaasapi/Clues/TransmitClues.aspx?`,
        {
          cluesextendid: cluesextendid.join('-'),
          id: this.accountId
        },
        ele => {
          // 转交成功
          if (ele.data.status === 1) {
            this.$Message.success('转交成功')
            this.$emit('hide')
          } else if (ele.data.status === 901) {
            this.clearInfo()
          } else {
            // 转交 成功 || 失败 弹出提示层
            this.$Message.error(ele.data.msg)
          }
        },
        () => {
          alert('网络错误')
        }
      )
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
  .content{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #0B0C00;
    line-height: 20px;
  }
  .content em{
    color: #F44336;
  }
  .ali-item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .ali-item span{
    color: #17181A;
  }
</style>
