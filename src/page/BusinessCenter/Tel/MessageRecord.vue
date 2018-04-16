<template>
  <div>
    <!-- 筛选头部 -->
    <message-filter :filterInfo="filterInfo" @searchInfo="searchInfo" @searchAll="searchAll" @changeStart="changeStart" @changeEnd="changeEnd"></message-filter>
    <!-- table表格 -->
    <div class="total">
      <span>
        共<em>4</em>条新线索
      </span>
      <div class="table-btn">
        <div class="enter" @click="enterClick">
          <span>导出</span>
        </div>
      </div>
    </div>
    <Table class="clue-table" border :columns="columns" :data="tableData"></Table>
    <div class="page-bar">
      <Page :total="total" show-total show-sizer @on-change="changePage" @on-page-size-change="changeSize" placement="top"></Page>
    </div>
  </div>
</template>
<script>
import MessageFilter from '@/components/BusinessCenter/Tel/MessageFilter'

export default {
  components: {
    MessageFilter
  },
  data() {
    return {
      // 规则提示
      tipText:
        '在获取未接来电1小时之内转化为线索、或在微信端卡商宝内操作回拨，即可将该来电计为接听，有效提高您的考核接听率',
      // 规则文字点击
      ruleText: '查看400考核接听率计算细则',
      // 筛选头部信息
      filterInfo: {
        // 品牌店铺
        brand: 0,
        // 短信类型
        codeType: 0,
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: '',
        // 查询信息
        searchValue: ''
      },
      // table columns
      columns: [
        {
          title: '品牌店铺',
          key: 'location',
          align: 'center',
          width: 150,
          padding: 0
        },
        {
          title: '短信类型',
          key: 'carType',
          align: 'center',
          width: 110
        },
        {
          title: '400号码',
          key: 'getTime',
          align: 'center',
          width: 150
        },
        {
          title: '接收号码',
          key: 'clueFrom',
          align: 'center',
          width: 110
        },
        {
          title: '发送时间',
          key: 'personFrom',
          align: 'center',
          width: 150
        },
        {
          title: '短信内容',
          key: 'personFrom',
          align: 'center'
        }
      ],
      // table数据
      tableData: [
        {
          level: 0,
          name: '王二小',
          tel: 13466320670,
          isNew: 1,
          location: '浙江-杭州',
          carType: '漏接短信',
          getTime: '2017-11-20 12:22:22',
          clueFrom: '定向查询',
          personFrom: '路飞'
        },
        {
          level: 2,
          name: '王小',
          tel: '',
          isNew: 0,
          location: '浙江-杭州',
          carType: '挂机短信',
          getTime: '2017-11-20 12:22:22',
          clueFrom: '定向查询',
          personFrom: '路飞'
        }
      ],
      // 总数
      total: 100,
      // 页数
      page: 1,
      // 每页条数
      size: 10,
      // 录入弹层
      showEnter: false
    }
  },
  methods: {
    // 改变筛选开始时间
    changeStart(time) {
      this.filterInfo.startTime = time
    },
    // 改变筛选结束时间
    changeEnd(time) {
      this.filterInfo.endTime = time
    },
    // 查询
    searchInfo() {
      console.log('查询')
      console.log(this.filterInfo.searchValue)
    },
    // 查询所有
    searchAll() {
      console.log('查询全部')
      console.log(this.filterInfo)
    },
    // 点击导出
    enterClick() {},
    // 切换页数
    changePage(e) {
      console.log(e, '切换页数')
    },
    // 切换每页条数
    changeSize(e) {
      console.log(e, '切换每页条数')
    }
  }
}
</script>
<style scoped>
.clue-table .main-tel{
  width:200px;
}

  .total{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .total span{
    font-size: 12px;
    color: #A1A9B2;
    line-height: 18px;
  }
  .total em{
    color: #0B0C00;
    margin: 0 2px;
  }
  .table-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .enter{
    margin-left: 10px;
    width: 80px;
    height: 30px;
    border: 1px solid #25A6FF;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .enter span{
    font-size: 12px;
    color: #25A6FF;
    font-weight: bold;
    cursor: pointer;
  }
  .page-bar{
    margin-top: 10px;
    text-align: right;
  }
  .ivu-table-cell{
    padding-left:15px;
    padding-right:15px;
  }
</style>
