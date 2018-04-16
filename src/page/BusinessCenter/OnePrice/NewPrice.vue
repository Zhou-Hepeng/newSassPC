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
    <Table class="clue-table" border :columns="columns" :data="clueList"></Table>
    <div class="page-bar">
      <Page :total="total" show-total show-sizer @on-change="changePage" @on-page-size-change="changeSize" placement="top"></Page>
    </div>
  </div>
</template>
<script>
import NewFilter from '@/components/BusinessCenter/OnePrice/NewFilter'

export default {
  components: {
    NewFilter
  },
  data() {
    return {
      clueList: [],
      // 筛选头部信息
      filterInfo: {
        // 排序选择
        sortType: 'Orderbylist',
        // 车辆品牌
        brandid: 0,
        // 车系
        seriesid: 0,
        // 车型
        carType: 0,
        // 提车地区
        location: '',
        // 查询信息
        searchValue: ''
      },
      // table columns
      columns: [
        {
          title: '订单ID',
          key: 'order_id',
          align: 'center',
          width: 150
        },
        {
          title: '订单标题',
          key: 'product_name',
          align: 'center'
        },
        {
          title: '客户姓名',
          key: 'user_name',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('span', params.row.user_name),
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
          key: 'user_tel',
          align: 'center',
          width: 120
        },
        {
          title: '期望上牌城市',
          key: 'location',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h(
              'span',
              `${params.row.province_name} ${params.row.city_name}`
            )
          }
        },
        {
          title: '挂断时间',
          key: 'cutTime',
          align: 'center',
          width: 90
        },
        {
          title: '等待时长',
          key: 'wait_time',
          align: 'center',
          width: 120,
          renderHeader: (h, params) => {
            return h(
              'div',
              {
                style: {
                  whiteSpace: 'nowrap'
                }
              },
              [
                h('span', {}, params.column.title),
                h('Icon', {
                  props: {
                    type: 'help-circled'
                  },
                  style: {
                    marginLeft: '2px',
                    color: '#A1A9B2'
                  }
                })
              ]
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 100,
          className: 'operation-padding',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  style: {
                    background: params.row.isNew ? '#FF6600' : '#FFCFAE',
                    border: params.row.isNew
                      ? '1px solid #FF6600'
                      : '1px solid #FFCFAE',
                    borderRadius: '4px',
                    width: '60px',
                    color: '#fff',
                    padding: '0'
                  },
                  on: {
                    click: () => {
                      if (!params.row.isNew) return
                      this.getOrder(params.index)
                    }
                  }
                },
                params.row.isNew ? '抢订单' : '已抢单'
              )
            ])
          }
        }
      ],
      // type 订单类型
      type: 1,
      // 总数
      total: 100,
      // 页数
      page: 1,
      // 每页条数
      size: 10,
      // 总提交数据
      submitData: {
        // 订单类型
        type: 1,
        // 最新 最早
        orderby: 1,
        // 当前页码
        currentPage: 1,
        // 每页条数
        pagesize: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取客户订单列表
    getData() {
      this.postData(`/bigchemall/Order/GetCustomerOrderList.aspx?`, this.submitData, ele => {
        if (ele.data.status === 1) {
          console.log(ele.data)
          this.clueList = ele.data.data.order
        } else if (ele.data.status === 901) {
          this.clearInfo()
        } else {

        }
      })
    },
    // 查询
    searchInfo() {
      // 点击查询按钮
      this.filterData()
    },
    // 点击导出
    enterClick() {},
    // 抢订单
    getOrder(index) {
      console.log('抢订单')
    },
    // 切换页数
    changePage(e) {
      this.page = e
      this.fetch()
    },
    // 切换每页条数
    changeSize(e) {
      this.size = e
      this.fetch()
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
