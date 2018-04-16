import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Home from '@/page/Home'
import Clue from '@/page/BusinessCenter/Clue'
import BusinessSet from '@/page/BusinessCenter/BusinessSet'
// 首页
import HomePage from '@/page/Home/Home'
// Clue
import NewClue from '@/page/BusinessCenter/Clue/NewClue'
import ToFollow from '@/page/BusinessCenter/Clue/ToFollow'
import Following from '@/page/BusinessCenter/Clue/Following'
import AllClue from '@/page/BusinessCenter/Clue/AllClue'
import CluePool from '@/page/BusinessCenter/Clue/CluePool'
import ClueDetail from '@/page/BusinessCenter/Clue/ClueDetail'

// 400电话
import Tel from '@/page/BusinessCenter/Tel'
import TelRecord from '@/page/BusinessCenter/Tel/TelRecord'
import MessageRecord from '@/page/BusinessCenter/Tel/MessageRecord'

// 一口价
import OnePrice from '@/page/BusinessCenter/OnePrice'
import NewPrice from '@/page/BusinessCenter/OnePrice/NewPrice'
import FollowPrice from '@/page/BusinessCenter/OnePrice/FollowPrice'
import AllPrice from '@/page/BusinessCenter/OnePrice/AllPrice'
import PriceDetail from '@/page/BusinessCenter/OnePrice/PriceDetail'

// 抵扣券
import Deductible from '@/page/BusinessCenter/Deductible'
import NewDeductible from '@/page/BusinessCenter/Deductible/NewDeductible'
import FollowDeductible from '@/page/BusinessCenter/Deductible/FollowDeductible'
import AllDeductible from '@/page/BusinessCenter/Deductible/AllDeductible'
import DeductibleDetail from '@/page/BusinessCenter/Deductible/DeductibleDetail'

// 商机中心
import CallSet from '@/page/BusinessCenter/BusinessSet/CallSet'
import LevelSet from '@/page/BusinessCenter/BusinessSet/LevelSet'
import EditTel from '@/page/BusinessCenter/BusinessSet/EditTel'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    // { path: '/', redirect: '/home' },
    // 登陆
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 主Container
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        // 首页
        {
          path: '/homepage',
          name: 'HomePage',
          component: HomePage
        },
        // 商机中心，询价线索
        {
          path: '/clue',
          name: 'Clue',
          component: Clue,
          children: [
            // 新线索
            {
              path: '/clue/newclue',
              name: 'NewClue',
              component: NewClue
            },
            // 待跟进
            {
              path: '/clue/tofollow',
              name: 'ToFollow',
              component: ToFollow
            },
            // 跟进中
            {
              path: '/clue/following',
              name: 'Following',
              component: Following
            },
            // 全部线索
            {
              path: '/clue/allclue',
              name: 'AllClue',
              component: AllClue
            },
            // 公共池
            {
              path: '/clue/cluepool',
              name: 'CluePool',
              component: CluePool
            }
          ]
        },
        // 线索详情
        {
          path: '/clue-detail',
          name: 'ClueDetail',
          component: ClueDetail
        },
        // 400电话
        {
          path: '/tel',
          name: 'Tel',
          component: Tel,
          children: [
            //
            {
              path: '/tel/telRecord',
              name: 'TelRecord',
              component: TelRecord
            },
            {
              path: '/tel/messageRecord',
              name: 'MessageRecord',
              component: MessageRecord
            }
          ]
        },
        // 线索详情
        {
          path: '/onePrice',
          name: 'OnePrice',
          component: OnePrice,
          children: [
            //
            {
              path: '/onePrice/newPrice',
              name: 'NewPrice',
              component: NewPrice
            },
            {
              path: '/onePrice/followPrice',
              name: 'FollowPrice',
              component: FollowPrice
            },
            {
              path: '/onePrice/allPrice',
              name: AllPrice,
              component: AllPrice
            }
          ]
        },
        // 一口价详情页
        {
          path: '/onePrice/detail',
          name: 'PriceDetail',
          component: PriceDetail
        },
        {
          path: '/deductible',
          name: 'Deductible',
          component: Deductible,
          children: [
            //
            {
              path: '/deductible/new',
              name: 'NewDeductible',
              component: NewDeductible
            },
            // 抵扣卷
            {
              path: '/deductible/follow',
              name: 'FollowDeductible',
              component: FollowDeductible
            },
            {
              path: '/deductible/all',
              name: 'AllDeductible',
              component: AllDeductible
            }
          ]
        },
        // 抵扣卷详情页
        {
          path: '/deductible/detail',
          name: 'DeductibleDetail',
          component: DeductibleDetail
        },
        {
          path: '/businessSet',
          name: 'BusinessSet',
          component: BusinessSet,
          children: [
            //
            {
              path: '/businessSet/call-set',
              name: 'CallSet',
              component: CallSet
            },
            {
              path: '/businessSet/level-set',
              name: 'LevelSet',
              component: LevelSet
            }
          ]
        },
        // 修改绑定手机号详情
        {
          path: '/edit-tel',
          name: 'EditTel',
          component: EditTel
        }
      ]
    }
  ]
})
