<template>
  <div class="filter">
    <!-- 提示考核处理率计算 -->
    <clue-exam-tip :tipText="tipText"></clue-exam-tip>
    <!-- 筛选头部 -->
    <all-filter :filterInfo="filterInfo" @searchInfo="searchInfo"></all-filter>
    <!-- table表格 -->
    <div class="total">
      <span>
        共<em>{{total}}</em>条符合条件的线索
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
    <!-- 分配弹层 -->
    <allot :isShow="showAllotModal" :info="params" @hide="hide" @confirm="confirm"></allot>
  </div>
</template>
<script>
import ClueExamTip from '@/components/ClueExamTip'
import AllFilter from '@/components/BusinessCenter/OnePrice/AllFilter'
import Allot from '@/components/BusinessCenter/Deductible/Allot'

export default {
  components: {
    ClueExamTip,
    AllFilter,
    Allot
  },
  data() {
    return {
      // 规则提示
      tipText:
        '已提车、已使用、已退款的订单将在48小时后清除，历史数据可在全部一口价线索中查看',
      // 筛选头部信息
      filterInfo: {
        // 选择排序
        sort: 0,
        // 地区
        location: 0,
        // 车辆品牌
        brandid: 0,
        // 车系
        seriesid: 0,
        // 车型
        carType: 0,
        // 订单归属
        orderBelong: 0,
        // 订单状态
        orderStatus: 0,
        // 查询信息
        searchValue: ''
      },
      // table columns
      columns: [
        {
          title: '订单ID',
          key: 'id',
          align: 'center',
          width: 150
        },
        {
          title: '订单标题',
          key: 'orderTitle',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'name',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('span', params.row.name),
              h('Icon', {
                props: {
                  type: 'information-circled',
                  color: '#FFBB00'
                },
                style: {
                  display: params.row.isNew ? '' : 'none',
                  marginLeft: '2px'
                }
              })
            ])
          }
        },
        {
          title: '联系方式',
          key: 'tel',
          align: 'center',
          width: 110
        },
        {
          title: '订单归属',
          key: 'orderBelong',
          align: 'center',
          width: 90
        },
        {
          title: '订单状态',
          key: 'orderStatus',
          align: 'center',
          width: 80,
          render: (h, params) => {
            let color = {
              进行中: '#FF9E00',
              退款中: '#F44336',
              已退款: '#A1A9B2',
              已提车: '#17AF38',
              未抢单: '#A1A9B2'
            }
            return h(
              'span',
              {
                style: {
                  color: color[`${params.row.orderStatus}`]
                }
              },
              params.row.orderStatus
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 130,
          className: 'operation-padding',
          render: (h, params) => {
            return h('div', [
              h(
                'div',
                {
                  style: {
                    display: params.row.orderStatus === '未抢单' ? 'none' : ''
                  }
                },
                [
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
                          this.toDetail(params.row)
                        }
                      }
                    },
                    '查看详情'
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
                          this.showAllot(params.row)
                        }
                      }
                    },
                    '分配'
                  )
                ]
              ),
              h(
                'div',
                {
                  style: {
                    display: params.row.orderStatus !== '未抢单' ? 'none' : ''
                  }
                },
                [
                  h(
                    'Button',
                    {
                      style: {
                        background: '#FF6600',
                        border: '1px solid #FF6600',
                        borderRadius: '4px',
                        width: '60px',
                        color: '#fff',
                        padding: '0'
                      },
                      on: {
                        click: () => {
                          this.getClue(params.index)
                        }
                      }
                    },
                    '抢线索'
                  )
                ]
              )
            ])
          }
        }
      ],
      // table数据
      tableData: [
        {
          id: 2017122094827567,
          name: '王二小',
          tel: 13466320670,
          isNew: 1,
          location: '浙江-杭州',
          orderTitle: '中国重汽 汕德卡SITRAK C7H重卡 540马力 6X4牵引车',
          orderBelong: '校长',
          orderStatus: '进行中'
        },
        {
          id: 2017122094827567,
          name: '王小',
          tel: '1111',
          isNew: 0,
          location: '浙江-杭州',
          orderTitle: '中国重汽 汕德卡SITRAK C7H重卡 540马力 6X4牵引车',
          orderBelong: '校长',
          orderStatus: '退款中'
        },
        {
          id: 2017122094827567,
          name: '王小',
          tel: '1111',
          isNew: 0,
          location: '浙江-杭州',
          orderTitle: '中国重汽 汕德卡SITRAK C7H重卡 540马力 6X4牵引车',
          orderBelong: '校长',
          orderStatus: '未抢单'
        }
      ],
      // 总数
      total: 100,
      // 页数
      page: 1,
      // 每页条数
      size: 10,
      // 分配弹层
      showAllotModal: false,
      // 点击获取数据
      params: {}
    }
  },
  methods: {
    // 查询
    searchInfo() {
      console.log('查询')
      console.log(this.filterInfo.searchValue)
    },
    // 查看详情
    toDetail(params) {
      this.$router.push({
        path: '/deductible/detail',
        query: { from: '全部线索', info: JSON.stringify(params) }
      })
      console.log('查看详情')
    },
    // 分配
    showAllot(params) {
      this.params = params
      this.showAllotModal = true
    },
    // 确认分配
    confirm() {
      console.log('确认')
      this.hide()
    },
    // 隐藏分配弹层
    hide() {
      this.showAllotModal = false
    },
    // 抢线索
    getClue() {
      console.log('抢线索')
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
    },
    // 关闭添加弹层
    hideAdd(e) {
      this.showEnter = e
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
