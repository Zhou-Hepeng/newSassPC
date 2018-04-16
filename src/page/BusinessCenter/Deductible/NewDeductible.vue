<template>
  <div class="filter">
    <!-- 筛选头部 -->
    <new-filter :filterInfo="filterInfo" @searchInfo="searchInfo"></new-filter>
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
  </div>
</template>
<script>
import NewFilter from '@/components/BusinessCenter/Deductible/NewFilter'

export default {
  components: {
    NewFilter
  },
  data() {
    return {
      // 筛选头部信息
      filterInfo: {
        // 选择排序
        sort: 0,
        // 车辆品牌
        brandid: 0,
        // 车系
        seriesid: 0,
        // 车型
        carType: 0,
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
          width: 120,
          render: (h, params) => {
            return h(
              'span',
              params.row.tel ? '****'.padStart(11, params.row.tel) : '/'
            )
          }
        },
        {
          title: '等待时长',
          key: 'waitTime',
          align: 'center',
          width: 120
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 100,
          className: 'operation-padding',
          render: (h, params) => {
            return h(
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
                    this.showCheckInfo = true
                  }
                }
              },
              '抢订单'
            )
          }
        }
      ],
      // table数据
      tableData: [],
      // 总数
      total: 100,
      // 页数
      page: 1,
      // 每页条数
      size: 10
    }
  },
  methods: {
    // 查询
    searchInfo() {
      console.log('查询')
    },
    // 点击导出
    enterClick() {},
    // 切换页数
    changePage(e) {
      this.page = e
      console.log(e, '切换页数')
    },
    // 切换每页条数
    changeSize(e) {
      this.size = e
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
