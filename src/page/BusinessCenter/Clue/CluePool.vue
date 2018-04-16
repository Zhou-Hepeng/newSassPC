<template>
  <div class="clue-pool">
    <!-- 提示考核处理率计算 -->
    <clue-exam-tip :tipText="tipText"></clue-exam-tip>
    <!-- 筛选头部 -->
    <all-pool-header :filterInfo="filterInfo" @search="search"></all-pool-header>
    <!-- table表格 -->
    <div class="total">
      <span>
        共<em>{{total}}</em>条新线索，
      </span>
      <span>今天还可以抢<em class="left-num">{{robClueNum}}</em>条</span>
    </div>
    <Table class="clue-table" :loading="loading" height="500" border :columns="columns" :data="clueList"></Table>
    <div class="page-bar">
      <Page :total="total" show-total show-sizer @on-change="changePage" placement="top" @on-page-size-change="changeSize"></Page>
    </div>
    <!-- 查看接收人 -->
    <recipient :isShow="showRecipient" :person="personList" @hideRecipient="hideRecipient"></recipient>
  </div>
</template>
<script>
import ClueExamTip from '@/components/ClueExamTip'
import AllPoolHeader from '@/components/BusinessCenter/Clue/AllPoolHeader'
import Recipient from '@/components/BusinessCenter/Clue/Recipient'

export default {
  components: {
    ClueExamTip,
    AllPoolHeader,
    Recipient
  },
  data() {
    return {
      // 用户级别权限
      level: 0,
      // 线索列表
      clueList: [],
      // 还可以抢的线索条数
      robClueNum: '',
      // 规则提示
      tipText: '您可以从公共池中抢得经销商销售区域内所有可销售的类别的车型线索',
      // 筛选信息
      filterInfo: {
        nowpage: 1,
        // 卡车级别列表
        tonnageid: '',
        // 意向车型列表
        brandid: '',
        // 用途类别列表
        subcategoryid: '',
        // 省份
        provincesn: '',
        // 城市
        citysn: '',
        size: 10
      },
      // 查看接收人
      showRecipient: false,
      // 接收人名字显示数组
      personList: [
        {
          name: 'li'
        },
        {
          name: 'wang'
        },
        {
          name: 'k'
        }
      ],
      // table columns
      columns: [
        {
          title: '联系人',
          key: 'name',
          align: 'center',
          width: 130,
          renderHeader: (h, params) => {
            return h('div', [
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
            ])
          },
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {}
                },
                params.row.realname
              ),
              h(
                'span',
                {
                  class: 'is-get',
                  style: {
                    marginLeft: '5px',
                    display: params.row.isGet ? '' : 'none'
                  }
                },
                '已获取'
              )
            ])
          }
        },
        {
          title: '联系方式',
          key: 'tel',
          align: 'center',
          width: 130
        },
        {
          title: '提车地区',
          key: 'location',
          align: 'center',
          width: 130,
          render: (h, params) => {
            return h(
              'span',
              params.row.provincename + ' ' + params.row.cityname
            )
          }
        },
        {
          title: '意向车型',
          key: 'truckname',
          align: 'center'
        },
        {
          title: '询价时间',
          key: 'getTime',
          align: 'center',
          width: 150
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 100,
          className: 'operation-padding',
          renderHeader: (h, params) => {
            return h('div', [
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
            ])
          },
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: this.level === '2' ? 'text' : 'primary',
                  size: 'default'
                },
                style: {
                  height: '30px',
                  boxShadow: 'none',
                  border: '1px solid #D75803',
                  backgroundColor: '#f60',
                  color: '#fff'
                },
                on: {
                  click: () => {
                    if (this.level !== 2) {
                      // 枪线索
                      console.log('抢线索')
                      this.robClue(params)
                    } else {
                      // 查看接收人
                      this.lookRecipient()
                    }
                  }
                }
              },
              '抢线索'
            )
          }
        }
      ],
      // 总数
      total: 100,
      loading: true
    }
  },
  created() {
    // 获取用户级别权限
    this.level = this.getLevel()
    console.log(this.level, 'this.level')
    // 请求数据
    this.getData()
  },
  methods: {
    // 请求数据
    getData() {
      this.loading = true
      this.postData('/newsaasapi/PublicClues/GetCluesList.aspx?', this.filterInfo, ele => {
        this.loading = false
        if (ele.data.status === 1) {
          this.clueList = ele.data.listdata
          this.total = ele.data.reccount
          this.robClue = ele.data.maxrobnum
        }
      })
    },
    // 点击查询
    search() {
      console.log('查询')
      this.getData()
    },
    // 查看接收人
    lookRecipient() {
      this.showRecipient = true
    },
    // 关闭查看接收人
    hideRecipient() {
      this.showRecipient = false
    },
    // 切换页数
    changePage(e) {
      // 更改页数
      this.filterInfo.nowpage = e
      // 请求数据
      this.getData()
    },
    // 切换每页条数
    changeSize(e) {
      // 更改页数
      this.filterInfo.nowpage = 1
      // 更改每页显示的数量
      this.filterInfo.size = e
      // 请求数据
      this.getData()
    },
    // 点击抢线索
    robClue(params) {
      console.log(params)
      // 请求线索详细信息 || 抢线索
      this.ajax(`/newsaasapi/PublicClues/RobCustomer.aspx?cluesid=${params.row.maincluesid}`, ele => {
        // 抢线索成功
        if (ele.data.status === 1) {
          // 删除当前线索内容
          this.clueList.split(params.index, 1)
          // 提示
          this.$Message.success('抢线索成功')
          // 可抢的条数减一
          this.robClueNum--
        } else if (ele.data.status === 901) {
          this.clearInfo()
        } else {
          // 抢线索失败
          this.$Message.error(ele.data.msg)
        }
      }, () => {
        alert('网络错误')
      })
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
  .total em.left-num{
    color: #F44336
  }
  .page-bar{
    margin-top: 10px;
    text-align: right;
  }
</style>
