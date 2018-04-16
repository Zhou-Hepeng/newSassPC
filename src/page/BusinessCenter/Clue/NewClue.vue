<template>
  <div class="new-clue">
    <!-- 提示考核处理率计算 -->
    <clue-exam-tip :ruleText="ruleText" :tipText="tipText" @showClueRule="showClueRule"></clue-exam-tip>
    <!-- table -->
    <div class="total">
      <span>
        共<em>{{total}}</em>条新线索
      </span>
      <div class="enter" @click="enterClick">
        <span>录入</span>
      </div>
    </div>
    <Table class="clue-table" :loading="loading" border :columns="columns" :data="clueList"></Table>
    <div class="page-bar">
      <Page :total="total" show-total show-sizer @on-change="changePage" placement="top" @on-page-size-change="changeSize"></Page>
    </div>
    <!-- 录入信息弹层 -->
    <add-info :isShow="showEnter" @hideAdd="hideAdd"></add-info>
    <!-- 查看接收人 -->
    <recipient :isShow="showRecipient" :person="personList" @hideRecipient="hideRecipient"></recipient>
  </div>
</template>
<script>
import ClueExamTip from '@/components/ClueExamTip'
import AddInfo from '@/components/BusinessCenter/Clue/AddInfo'
import Recipient from '@/components/BusinessCenter/Clue/Recipient'

export default {
  components: {
    ClueExamTip,
    AddInfo,
    Recipient
  },
  data() {
    return {
      // 用户级别权限
      level: 0,
      // 线索列表
      clueList: [],
      // table columns
      columns: [
        {
          title: '联系人',
          key: 'name',
          align: 'center',
          width: 170,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                params.row.realname
              ),
              h('Icon', {
                props: {
                  type: 'information-circled',
                  color: '#FFBB00'
                },
                style: {
                  display: params.row.isNew ? '' : 'none'
                }
              }),
              h(
                'span',
                {
                  style: {
                    marginLeft: '5px',
                    display: params.row.tel ? '' : 'none'
                  }
                },
                `(${params.row.tel})`
              )
            ])
          }
        },
        {
          title: '提车地区',
          key: 'location',
          align: 'center',
          width: 110,
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
          title: '获取时间',
          key: 'listshowdate',
          align: 'center',
          width: 150
        },
        {
          title: '线索来源',
          key: 'clueresourcename',
          align: 'center',
          width: 90
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 110,
          className: 'operation-padding',
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
                  border: this.level !== 2 ? '1px solid #D75803' : '',
                  backgroundColor: this.level !== 2 ? '#f60' : '',
                  color: this.level !== 2 ? '#fff' : '#3A8DFF'
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
              this.level === '2' ? '查看接收人' : '抢线索'
            )
          }
        }
      ],
      // 规则提示
      tipText:
        '请在线索获取时间后的24小时之内及时处理（编辑或添加跟进记录），否则将会影响您的线索处理率和信誉值',
      // 规则文字点击
      ruleText: '查看线索考核处理率计算细则',
      // 总数
      total: 0,
      // 页数
      page: 1,
      // 每页条数
      size: 10,
      // 录入弹层
      showEnter: false,
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
      // 是否正在加载
      loading: true
    }
  },
  created() {
    // 获取用户级别权限
    this.level = this.getLevel()
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.ajax(`/newsaasapi/Clues/GetRobCluesList.aspx?size=${this.size}&nowpage=${this.nowpage}`, ele => {
        this.loading = false
        if (ele.data.status === 1) {
          this.clueList = ele.data.listdata
          this.total = ele.data.reccount
        } else if (ele.data.status === 901) {
          this.clearInfo()
        } else {
          alert(ele.data.msg)
        }
      }, e => {
        alert('网络错误')
      })
    },
    // 显示计算细则
    showClueRule(show) {
      console.log(show)
    },
    // 切换页数
    changePage(e) {
      console.log(e, '切换页数')
      // 更改页数
      this.nowpage = e
      // 请求数据
      this.getData()
    },
    // 切换每页条数
    changeSize(e) {
      console.log(e, '切换每页条数')
      // 更改页数
      this.nowpage = 1
      this.size = e
      // 请求数据
      this.getData()
    },
    // 点击录入显示录入弹层
    enterClick() {
      this.showEnter = true
    },
    // 关闭添加弹层
    hideAdd(e) {
      this.showEnter = e
    },
    // 查看接收人
    lookRecipient() {
      this.showRecipient = true
    },
    // 关闭查看接收人
    hideRecipient() {
      this.showRecipient = false
    },
    // 点击抢线索
    robClue(params) {
      console.log(params)
      // 请求线索详细信息 || 抢线索
      this.ajax(`/newsaasapi/PublicClues/RobCustomer.aspx?cluesid=${params.row.maincluesid}`, ele => {
        // 抢线索成功
        if (ele.data.status === 1) {
          this.clueList.split(params.index, 1)
          this.$Message.success('抢线索成功')
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
  .enter{
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
  .enter span:before{
    content: "+";
    color: #25A6FF;
    font-size: 14px;
    margin-right: 2px;
  }
  .page-bar{
    margin-top: 10px;
    text-align: right;
  }
</style>
