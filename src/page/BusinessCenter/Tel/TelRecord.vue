<template>
  <div>
    <!-- 提示考核处理率计算 -->
    <clue-exam-tip :ruleText="ruleText" :tipText="tipText" @showClueRule="showClueRule"></clue-exam-tip>
    <!-- 筛选头部 -->
    <tel-filter :filterInfo="filterInfo" @searchInfo="searchInfo" @searchAll="searchAll" @changeStart="changeStart" @changeEnd="changeEnd"></tel-filter>
    <!-- table表格 -->
    <div class="total">
      <span>
        共<em>{{total}}</em>条新线索
      </span>
      <div class="table-btn">
        <div class="enter" @click="enterClick">
          <span>导出</span>
        </div>
      </div>
    </div>
    <Table :height="bodyHeight" ref="table" class="clue-table" border :columns="columns" :data="tableData"></Table>
    <div class="page-bar">
      <Page :total="total" show-total show-sizer @on-change="changePage" @on-page-size-change="changeSize" placement="top"></Page>
    </div>
    <!-- 考核详情 -->
    <tel-info :isShow="showInfo" @hide="hide" :info="tableData[index]"></tel-info>
  </div>
</template>
<script>
import ClueExamTip from '@/components/ClueExamTip'
import TelFilter from '@/components/BusinessCenter/Tel/TelFilter'
import TelInfo from '@/components/BusinessCenter/Tel/TelInfo'
export default {
  components: {
    ClueExamTip,
    TelFilter,
    TelInfo
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
        // 通话状态
        telStatus: 1,
        // 考核状态
        examStatus: 0,
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: '',
        // 来电搜索
        searchValue: ''
      },
      // table columns
      columns: [
        {
          title: '主叫号码',
          key: 'callertel',
          align: 'center',
          width: 120,
          padding: 0
        },
        {
          title: '品牌',
          key: 'brandname',
          align: 'center',
          width: 152
        },
        {
          title: '400号码',
          key: 'tel400',
          align: 'center',
          width: 100
        },
        {
          title: '呼转号码',
          key: 'calleetel',
          align: 'center',
          width: 110
        },
        {
          title: '来电时间',
          key: 'starttime',
          align: 'center',
          width: 90
        },
        {
          title: '挂断时间',
          key: 'endtime',
          align: 'center',
          width: 90
        },
        {
          title: '通话状态',
          key: 'ispickup',
          align: 'center',
          width: 90,
          render: (h, paramas) => {
            // let color = ['#A1A9B2', '#F44336', '#17AF38']
            // let text = ['不计入考核', '未接听', '已结听']
            return h(
              'span',
              {
                style: ''
              },
              paramas.row.ispickup
            )
          }
        },
        {
          title: '录音',
          key: 'personFrom',
          align: 'center',
          width: 58,
          className: 'operation-padding'
        },
        {
          title: '接听考核',
          key: 'personFrom',
          align: 'center',
          width: 90
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 139,
          className: 'operation-padding',
          render: (h, params) => {
            let isTrun = params.row.istrunclue === '是'
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: isTrun ? '#ccc' : '#3A8DFF'
                  },
                  on: {
                    click: () => {
                      if (isTrun) return
                      this.showEnter = true
                    }
                  }
                },
                isTrun ? '已转化' : '转线索'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#3A8DFF'
                  },
                  on: {
                    click: () => {
                      this.showExamInfo(params.index)
                    }
                  }
                },
                '考核情况'
              )
            ])
          }
        }
      ],
      // table数据
      tableData: [],
      // table高度
      bodyHeight: '',
      // 总数
      total: 0,
      // 页数
      page: 1,
      // 每页条数
      size: 10,
      // 录入弹层
      showEnter: false,
      // 显示考核详情
      showInfo: false,
      // 点击按钮的index
      index: ''
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    // 获取列表数据
    fetch() {
      this.ajax(
        `/newsaasapi/Clues400/GetClues400List.aspx?size=${this.size}&nowpage=${
          this.page
        }&telStatus=${this.filterInfo.telStatus}`,
        res => {
          let { status, reccount, listdata } = res.data
          if (status === '1') {
            this.total = reccount
            this.tableData = listdata
            this.$nextTick(() => {
              setTimeout(() => {
                let h = this.$refs.table.bodyRealHeight
                if (h > 448) {
                  this.bodyHeight = 448
                } else {
                  this.bodyHeight = h + 16
                }
              }, 100)
            })
          }
        }
      )
    },
    // 显示计算细则
    showClueRule(show) {
      console.log(show)
    },
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
      this.page = 1
      this.fetch()
    },
    // 查询所有
    searchAll() {
      this.filterInfo = {
        // 品牌店铺
        brand: 0,
        // 通话状态
        telStatus: 1,
        // 考核状态
        examStatus: 0,
        // 开始时间
        startTime: '',
        // 结束时间
        endTime: '',
        // 来电搜索
        searchValue: ''
      }
      this.page = 1
      this.fetch()
    },
    // 点击导出
    enterClick() {
      this.$refs.table.exportCsv({
        filename: '400数据',
        data: String(this.tableData)
      })
    },
    // 考核情况
    showExamInfo(index) {
      this.showInfo = true
      this.index = index
      console.log('考核情况')
    },
    // 隐藏考核详情
    hide() {
      this.showInfo = false
    },
    // 切换页数
    changePage(e) {
      this.page = e
      this.fetch()
    },
    // 切换每页条数
    changeSize(e) {
      this.page = 1
      this.size = e
      this.fetch()
    },
    // 关闭添加弹层
    hideAdd(e) {
      this.showEnter = e
    }
  }
}
</script>
<style scoped>
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
