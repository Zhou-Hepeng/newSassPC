<template>
  <div class="edit-tel">
    <div class="header">
      <span class="title">修改绑定手机号</span>
      <span class="back" @click="goBack">返回上一页 >></span>
    </div>
    <div class="tip">
      <div class="admin-tip">
        <Icon class="tip-icon" type="android-alert" size="14"></Icon>
        <span>系统提示：</span>
      </div>
      <div class="tip-text">
        <p>1. 每个400号码只能绑定3个转接号码；绑定号码可以是手机号或座机号，若是座机号请添加区号以免影响接通（区号和号码之间不能加符号，如01056156185）。</p>
        <p>2. 请确认要绑定的号码真实有效，且没有开通呼叫转移、高清网络通话等功能，否则可能影响400来电的正常转接。</p>
      </div>
    </div>
    <!-- 内容信息 -->
    <div class="info-content">
      <div class="item">
        <span class="item-name">店铺名称：</span>
        <span>遵义瑞东股份有限公司</span>
      </div>
      <div class="item">
        <span class="item-name">关联品牌：</span>
        <span>一汽解放</span>
      </div>
      <div class="item">
        <span class="item-name">400号码：</span>
        <span>4006751371 - 6666</span>
      </div>
      <div class="item">
        <span class="item-name">绑定号码：</span>
        <div class="input-content">
          <template v-for="(item, index) in list" v-if="list.length">
            <tel-item :list="item" :index="index" :key="index" @editTel="editTel" @removeTel="removeTel"></tel-item>
          </template>
          <div class="input-default" v-if="!list.length">
            <span class="default">点击添加按钮，输入手机号或座机号</span>
          </div>
          <Button type="ghost" class="add-tel" @click="addTel"><Icon type="plus" style="margin-right: 2px"></Icon>添加号码</Button>
        </div>
      </div>
      <div class="item">
        <span class="item-name">呼转顺序：</span>
        <Select v-model="transferValue" style="width: 160px;">
          <Option :value="0">随机</Option>
          <Option :value="1">顺序</Option>
          <Option :value="2">优先级</Option>
          <Option :value="3">全通达</Option>
        </Select>
      </div>
      <div class="item">
        <span class="item-name">短信接收：</span>
        <i-input v-model="codeTel" placeholder="请输入真实手机号用于接收漏接短信提醒" style="width: 330px"></i-input>
      </div>
      <div class="item">
        <span class="item-name">验证码：</span>
        <i-input v-model="codeTel" placeholder="请输入验证码" style="width: 160px"></i-input>
        <img src="" />
        <span class="change-other" @click="changeImg">看不清？换一张</span>
      </div>
      <Button type="primary" style="margin-left: 60px;margin-top: 30px;width: 200px;height: 40px;font-size: 16px;font-weight: bold;background: #2397E8" @click="saveInfo">保存</Button>
    </div>
    <!-- 400呼转顺序介绍： -->
    <div class="transfer-tip">
      <span class="info-tip-title">400呼转顺序介绍：</span>
      <Table border :columns="columns" :data="tableData"></Table>
    </div>
    <!-- 绑定多号码时转接规则介绍： -->
    <div class="more-transfer-tip">
      <span class="info-tip-title">绑定多号码时转接规则介绍：</span>
      <p>1. 第一个电话占线时，若为固话可立即转接，若为手机需等待30秒才可转接到第二个接听号码，以此类推。</p>
      <p>2. 第一个电话无应答，则无论固话还是手机都需要等待30秒才可转接到第二个接听号码，以此类推。</p>
      <p>3. 提示：因为用户拨打电话60秒后被叫未接听，运营商自动挂断，所以手机最多绑定2部，固话可遇忙即转，可随意绑定，最多绑定3个。</p>
    </div>
    <!-- 绑定手机号弹层 -->
    <add-tel :isShow="isShowAdd" :columns="addColumns" :tableData="addTableData" @hideAdd="hideAdd" @saveAdd="saveAdd" @saveAccount="saveAccount"></add-tel>
    <!-- 编辑弹层 -->
    <edit-tel :isShow="isShowEdit" :index="telIndex" :telValue="telValue" @hideAdd="hideEdit" @saveEdit="saveEdit"></edit-tel>
  </div>
</template>
<script>
import TelItem from '@/components/BusinessCenter/BusinessSet/TelItem'
import AddTel from '@/components/BusinessCenter/BusinessSet/AddTel'
import EditTel from '@/components/BusinessCenter/BusinessSet/EditTel'

export default {
  components: {
    TelItem,
    AddTel,
    EditTel
  },
  data() {
    return {
      // 呼转顺序
      transferValue: 0,
      // 短信接收手机号
      codeTel: '',
      // 当前修改的手机号
      telValue: '',
      // 当前点击的下标
      telIndex: '',
      // 循环绑定号码数组
      list: [
        {
          type: 'add',
          tel: 13466320670
        },
        {
          type: 'add',
          tel: 12345678910
        },
        {
          type: 'own',
          tel: '113466320670(xj.)'
        }
      ],
      // 是否显示添加手机号弹层
      isShowAdd: false,
      // 是否显示编辑弹层
      isShowEdit: false,
      // 添加号码中的table
      addColumns: [
        {
          type: 'selection',
          width: 36,
          align: 'center',
          className: 'table-ten-padding select-header'
        },
        {
          title: '用户姓名',
          key: 'userName',
          align: 'center',
          width: 110,
          className: 'table-ten-padding'
        },
        {
          title: '手机号',
          key: 'tel',
          align: 'center',
          width: 110,
          className: 'table-ten-padding'
        },
        {
          title: '角色',
          key: 'manager',
          align: 'center',
          width: 150,
          className: 'table-ten-padding'
        },
        {
          title: '品牌',
          key: 'brand',
          align: 'center',
          className: 'table-ten-padding'
        }
      ],
      // add tabledata
      addTableData: [
        {
          userName: '杨平',
          tel: 13300133000,
          manager: '网销顾问',
          brand: '一汽解放、福田欧曼',
          index: 0,
          _disabled: ''
        },
        {
          userName: '杨平1',
          tel: 13300133000,
          manager: '营销专员、网销顾问',
          brand: '一汽解放、福田欧曼',
          index: 1,
          _disabled: ''
        },
        {
          userName: '杨平2',
          tel: 13300133000,
          manager: '网销顾问',
          brand: '一汽解放、福田欧曼',
          index: 2,
          _disabled: ''
        },
        {
          userName: '杨平3',
          tel: 13300133000,
          manager: '网销顾问',
          brand: '一汽解放、福田欧曼',
          index: 3,
          _disabled: ''
        }
      ],
      // tip table
      columns: [
        {
          title: '呼转顺序',
          key: 'transfer',
          width: 150
        },
        {
          title: '品牌',
          key: 'brand'
        }
      ],
      tableData: [
        {
          transfer: '随机',
          brand: '每次来电，系统随机从用户绑定的呼转组中选取号码进行呼叫。'
        },
        {
          transfer: '顺序',
          brand:
            '每次来电，系统会按照号码排列顺序选择呼叫的号码，如上一通来电呼叫的是第一个号码，则本次来电呼叫第二个号码，以此类推。'
        },
        {
          transfer: '优先级',
          brand:
            '每次来电，系统对呼转组内的号码，按顺序进行呼叫，优先呼叫排在第一位的号码。'
        },
        {
          transfer: '全通达',
          brand:
            '每次来电，系统会同时呼叫呼转组内的所有号码（最多限三部），任意电话接起则其余电话停止响铃。'
        }
      ]
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 添加号码
    addTel() {
      this.isShowAdd = true
      console.log('添加号码')
    },
    // 编辑手机号
    editTel(index) {
      this.telIndex = index
      this.telValue = this.list[index].tel
      this.isShowEdit = true
    },
    // 删除手机号
    removeTel(index) {
      this.list.splice(index, 1)
      console.log('删除')
    },
    // 更换验证码图片
    changeImg() {
      console.log('更换验证码')
    },
    // 保存
    saveInfo(index, tel) {
      console.log('保存')
    },
    // 隐藏弹层
    hideAdd(e) {
      this.isShowAdd = e
    },
    // 保存添加手机号
    saveAdd() {
      console.log('保存添加手机号')
    },
    // 保存添加账号
    saveAccount() {
      console.log('保存添加账号')
    },
    // 隐藏编辑弹层
    hideEdit(e) {
      this.isShowEdit = e
    },
    // 保存编辑
    saveEdit(index, tel) {
      this.list[index].tel = tel
      console.log(this.list)
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
  .tip{
    margin: 20px 0;
    padding: 9px 10px;
    display: flex;
    flex-direction: column;
    background: #FFF9F9;
    border: 1px solid #FFD7D5;
  }
  .admin-tip{
    display: flex;
    flex-direction: row;
    color: #F44336;
  }
  .tip-icon{
    line-height: 18px;
  }
  .admin-tip span{
    margin-left: 6px;
  }
  .tip-text{
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }
  .tip-text p{
    font-size: 12px;
    line-height: 18px;
    color: #5C6066;
  }
  .info-content{
    display: flex;
    flex-direction: column;
    padding-bottom: 29px;
    border-bottom: 1px solid #E4E5E6;
  }
  .item{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
  .item span{
    font-size: 12px;
    color: #17181A;
    line-height: 30px;
  }
  .item-name{
    width: 60px;
    text-align: right;
  }
  .input-content{
    display: flex;
    flex-direction: column;
  }
  .input-default{
    padding-left: 10px;
    width: 330px;
    height: 30px;
    border: 1px solid #E4E5E6;
    border-radius: 3px;
    background: #fff;
  }
  .input-default .default{
    color: #A1A9B2;
  }
  .add-tel{
    margin-top: 10px;
    width: 80px;
    color: #25A6FF;
    border: 1px solid #25A6FF;
    padding-right: 0;
    padding-left: 0;
  }
  .item img{
    width: 78px;
    height: 30px;
    margin-left: 5px;
  }
  .item .change-other{
    margin-left: 5px;
    font-size: 12px;
    color: #3A8DFF;
    cursor: pointer;
  }
  .transfer-tip{
    padding: 10px 0;
  }
  .info-tip-title{
    font-size: 14px;
    color: #17181A;
    line-height: 30px;
    font-weight: bold;
  }
  .more-transfer-tip{
    padding-top: 10px;
  }
  .more-transfer-tip p{
    font-size: 12px;
    color: #17181A;
    line-height: 20px;
  }
  .more-transfer-tip p:first-child{
    margin-top: 10px;
  }
</style>
