<template>
  <div class="to-follow">
    <!-- 提示考核处理率计算 -->
    <clue-exam-tip :ruleText="ruleText" :tipText="tipText" @showClueRule="showClueRule"></clue-exam-tip>
    <!-- 筛选头部 -->
    <follow-header :filterInfo="filterInfo" @searchInfo="searchInfo" @searchAll="searchAll" @changeStart="changeStart" @changeEnd="changeEnd" @searchData="getData"></follow-header>
    <!-- table表格 -->
    <div class="total">
      <span>
        共<em>{{total}}</em>条线索
      </span>
      <div class="table-btn">
        <Button type="primary" style="width: 80px;height: 30px;" @click="upAll">批量分配</Button>
        <div class="enter" @click="enterClick">
          <span>录入</span>
        </div>
      </div>
    </div>
    <Table :loading="loading" @on-selection-change="selectChange" class="clue-table" border :columns="columns" :data="clueList"></Table>
    <div class="page-bar">
      <Page :total="total" show-total show-sizer @on-change="changePage" placement="top" @on-page-size-change="changeSize"></Page>
    </div>
    <!-- 录入信息弹层 -->
    <add-info :isShow="showEnter" @hideAdd="hideAdd"></add-info>
    <!-- 添加跟进记录 -->
    <add-follow :isShowFollow="showAddFollow" @hideAddFollow="hideAddFollow" :cluesextendid="clueInfo.cluesextendid"></add-follow>
    <!-- 分配弹层 -->
    <allot :isShow="showAllotModal" :clueInfo="clueInfo" @hide="hide"></allot>
  </div>
</template>
<script>
import ClueExamTip from '@/components/ClueExamTip'
import FollowHeader from '@/components/BusinessCenter/Clue/ToFollowHeader'
import AddInfo from '@/components/BusinessCenter/Clue/AddInfo'
import AddFollow from '@/components/BusinessCenter/Clue/AddFollow'
import Allot from '@/components/BusinessCenter/Clue/Allot'

export default {
  components: {
    ClueExamTip,
    FollowHeader,
    AddInfo,
    AddFollow,
    Allot
  },
  data() {
    return {
      // 用户级别权限
      level: 0,
      // 线索信息
      clueInfo: {},
      // 待跟进线索列表
      clueList: [],
      // 选中的列表
      selectClueList: [],
      // 规则提示
      tipText:
        '请在线索获取时间后的24小时之内及时处理（编辑或添加跟进记录），否则将会影响您的线索处理率和信誉值',
      // 规则文字点击
      ruleText: '查看线索考核处理率计算细则',
      // 筛选头部信息
      filterInfo: {
        // 线索来源
        s_clueresource: '',
        // 跟进人员
        s_followId: '',
        // 车辆品牌
        s_brandids: '',
        // 车系
        seriesid: '',
        // 开始时间
        s_inquirytimemin: '',
        // 结束时间
        s_inquirytimemax: '',
        // 查询信息
        s_keyword: '',
        // 页数
        nowpage: 1,
        // 每页条数
        size: 10
      },
      // table columns
      columns: [
        {
          type: 'selection',
          width: 56,
          align: 'center'
        },
        {
          title: '联系人',
          key: 'name',
          align: 'center',
          width: 110,
          render: (h, params) => {
            return h('div', [
              h('Avatar', {
                props: {
                  shape: 'square',
                  src: `https://static-test.360che.com/newBusiness/newSass/images/level-${
                    params.row.clueslevel
                  }.png`
                },
                style: {
                  width: '16px',
                  height: '16px',
                  fontSize: 0,
                  borderRadius: '0',
                  marginTop: '-2px',
                  marginRight: '5px'
                }
              }),
              h(
                'span',
                {
                  style: {}
                },
                params.row.realname
              ),
              h('Icon', {
                props: {
                  type: 'information-circled',
                  color: '#FFBB00'
                },
                style: {
                  marginLeft: '2px',
                  display: params.row.isNew ? '' : 'none'
                }
              }),
              h(
                'div',
                {
                  style: {
                    marginLeft: '5px',
                    display: params.row.tel ? '' : 'none'
                  }
                },
                `${params.row.tel}`
              )
            ])
          }
        },
        {
          title: '提车地区',
          key: 'location',
          align: 'center',
          width: 90,
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
          width: 90
        },
        {
          title: '线索来源',
          key: 'clueresourcename',
          align: 'center',
          width: 90
        },
        {
          title: '跟进人员',
          key: 'cluefollowname',
          align: 'center',
          width: 80
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 250,
          render: (h, params) => {
            return h('div', [
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
                      this.$router.push('/clue-detail')
                      this.setStorage('clueInfo', params.row)
                      console.log(params.row, 'params.row')
                      console.log('详情')
                    }
                  }
                },
                '详情'
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
                      // 赋值线索信息
                      this.clueInfo = params.row
                      // 显示弹层
                      this.showAddFollow = true
                    }
                  }
                },
                '添加跟进记录'
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
                      console.log('编辑')
                    }
                  }
                },
                '编辑'
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
                      console.log('分配')
                      // 赋值线索信息
                      this.clueInfo = params.row
                      // 显示弹层
                      this.showAllotModal = true
                    }
                  }
                },
                '分配'
              )
            ])
          }
        }
      ],
      // 总数
      total: 100,
      // 录入弹层
      showEnter: false,
      // 添加跟进记录弹层
      showAddFollow: false,
      // 是否正在加载
      loading: true,
      // 分配弹层
      showAllotModal: false
    }
  },
  created() {
    // 获取用户级别权限
    this.level = this.getLevel()
    // 请求待跟进线索列表
    this.getData()
  },
  methods: {
    // 请求数据
    getData() {
      this.loading = true
      this.postData(
        `/newsaasapi/Clues/GetCluesList.aspx?cluesstatus=0`,
        this.filterInfo,
        ele => {
          this.loading = false
          if (ele.data.status === 1) {
            console.log(ele.data)
            // 线索列表
            this.clueList = ele.data.listdata

            // 总数量
            this.total = ele.data.reccount
          } else if (ele.data.status === 1) {
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
    // 显示计算细则
    showClueRule(show) {
      console.log(show)
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
    // 批量上架
    upAll() {
      console.log('批量分配')
      // 显示弹层
      this.showAllotModal = true
    },
    // 点击录入显示录入弹层
    enterClick() {
      this.showEnter = true
    },
    // 关闭添加弹层
    hideAdd(e) {
      this.showEnter = e
    },
    // 关闭添加跟进记录弹层
    hideAddFollow(e) {
      this.showAddFollow = e
    },
    // 改变筛选开始时间
    changeStart(time) {
      this.filterInfo.s_inquirytimemin = time
    },
    // 改变筛选结束时间
    changeEnd(time) {
      this.filterInfo.s_inquirytimemax = time
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
    // 多选
    selectChange(list) {
      this.clueInfo = list
    },
    // 隐藏分配弹层
    hide() {
      this.showAllotModal = false
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
