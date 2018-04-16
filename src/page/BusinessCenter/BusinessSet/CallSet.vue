<template>
  <div class="call-set">
    <!-- 筛选头 -->
    <call-header :filterInfo="filterInfo" @searchInfo="searchInfo"></call-header>
    <!-- table -->
    <Table class="call-set" border :columns="columns" :data="tableData"></Table>
  </div>
</template>
<script>
import CallHeader from '@/components/BusinessCenter/BusinessSet/CallHeader'

export default {
  components: {
    CallHeader
  },
  data() {
    return {
      // 筛选信息
      filterInfo: {
        // 品牌店铺
        brand: 0,
        // 使用状态
        usedStatus: 0,
        // 号码搜索
        tel: ''
      },
      // table columns
      columns: [
        {
          title: '品牌',
          key: 'brand',
          align: 'center',
          width: 130
        },
        {
          title: '400号码',
          key: 'tel',
          align: 'center',
          width: 100,
          className: 'operation-padding'
        },
        {
          title: '分机号',
          key: 'nextTel',
          align: 'center',
          width: 80
        },
        {
          title: '使用状态',
          key: 'usedStatus',
          align: 'center',
          width: 80,
          className: 'operation-padding',
          render: (h, params) => {
            let status = ['已停用', '正常使用']
            let color = ['#A1A9B2', '#17AF38']
            return h(
              'span',
              {
                style: {
                  color: color[params.row.usedStatus]
                }
              },
              status[params.row.usedStatus]
            )
          }
        },
        {
          title: '绑定号码',
          key: 'bindTel',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('span', {}, params.row.bindTel),
              h(
                'span',
                {
                  style: {
                    display: params.row.owner ? 'inline-block' : 'none'
                  }
                },
                `(${params.row.owner})`
              )
            ])
          }
        },
        {
          title: '呼转顺序',
          key: 'transfer',
          align: 'center',
          width: 90
        },
        {
          title: '接收短信',
          key: 'getCode',
          align: 'center',
          width: 100,
          className: 'operation-padding'
        },
        {
          title: '开通时间',
          key: 'startTime',
          align: 'center',
          width: 110
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 122,
          className: 'operation-padding',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#3A8DFF'
                },
                on: {
                  click: () => {
                    this.editBindTel(params.index)
                  }
                }
              },
              '修改绑定号码'
            )
          }
        }
      ],
      // table数据
      tableData: [
        {
          owner: '张三 销售顾问',
          brand: '一汽解放',
          tel: 4006751371,
          nextTel: '1234',
          usedStatus: 1,
          bindTel: '013400134000',
          transfer: '随机',
          getCode: '13200132000',
          startTime: '2017-11-20 12:22:22'
        },
        {
          brand: '一汽解放',
          tel: 4006751371,
          nextTel: '1234',
          usedStatus: 0,
          bindTel: '013400134000',
          transfer: '随机',
          getCode: '13200132000',
          startTime: '2017-11-20 12:22:22'
        }
      ]
    }
  },
  methods: {
    // 点击查询
    searchInfo() {
      console.log('查询')
    },
    // 修改绑定号码
    editBindTel(index) {
      this.$router.push('/edit-tel')
    }
  }
}
</script>
<style scoped>
</style>
