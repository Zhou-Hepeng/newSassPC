<template>
  <div class="home">
    <Layout style="min-height: 100%;min-width:1300px">
      <Header class="title-bar">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><img src="../assets/logo.png">卡商宝智慧营销系统</div>
          <div class="login-info">
            <menu-item name="1">
              <Icon type="ios-navigate"></Icon>
              您好，遵义瑞东汽车商贸有限公司
            </menu-item>
            <menu-item name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </menu-item>
            <menu-item name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </menu-item>
            <menu-item name="4" @click.native="exit">
              <Icon type="ios-paper"></Icon>
              退出
            </menu-item>
          </div>
        </Menu>
      </Header>
      <Layout style="width:1300px">
        <Sider class="index-nav" width="200" hide-trigger style="background: #fff">
          <i-menu width="auto" class="main-menu" :active-name="activeName" :open-names="openName">
            <menu-item name="1" @click.native="jumpTo('1-1')">
              <Icon type="home"></Icon>
              <span style="font-size: 14px;">首页</span>
            </menu-item>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-filing"></Icon>
                店铺管理
              </template>
              <menu-item name="2-1">店铺1</menu-item>
              <menu-item name="2-2">店铺2</menu-item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-filing"></Icon>
                营销中心
              </template>
              <menu-item name="3-1">文章</menu-item>
              <menu-item name="3-2">一口价</menu-item>
              <menu-item name="3-3">抵扣卷</menu-item>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                商机中心
              </template>
              <menu-item name="4-1" @click.native="jumpTo('4-1')">询价线索</menu-item>
              <menu-item name="4-2" @click.native="jumpTo('4-2')">400来电</menu-item>
              <menu-item name="4-3" @click.native="jumpTo('4-3')">一口价</menu-item>
              <menu-item name="4-4" @click.native="jumpTo('4-4')">抵扣券</menu-item>
              <menu-item name="4-5" @click.native="jumpTo('4-5')">商机设置</menu-item>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                客户管理
              </template>
              <menu-item name="5-1">Option 9</menu-item>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                统计分析
              </template>
              <menu-item name="6-1">Option 9</menu-item>
            </Submenu>
            <Submenu name="7">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                系统管理
              </template>
              <menu-item name="7-1">Option 9</menu-item>
            </Submenu>
            <Submenu name="8">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                使用帮助
              </template>
              <menu-item name="8-1">Option 9</menu-item>
            </Submenu>
          </i-menu>
        </Sider>
        <Layout class="main-content">
          <router-view />
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      activeName: '1',
      openName: ['1'],
      businessPath: {
        '4-1': '/clue/newclue',
        '4-2': '/tel/telRecord',
        '4-3': '/onePrice/newPrice',
        '4-4': '/deductible/new',
        '4-5': '/businessSet/call-set'
      }
    }
  },
  created() {
    console.log(this.$route)
    // 查看当前路由
    const routerUrl = this.getStorage('routerUrl')
    if (routerUrl) {
      let url = routerUrl.split('-')
      this.openName = [url[0]]
      this.activeName = routerUrl
    }
  },
  methods: {
    // 跳转路由
    jumpTo(name) {
      if (name === this.activeName) {
        return
      }
      // 存储当前nav导航路由
      this.setStorage('routerUrl', name)
      const root = '/homepage'
      const router = this.businessPath[name] ? this.businessPath[name] : root
      const path = `${router}`
      this.activeName = name
      this.$router.push(path)
    },
    // 退出
    exit() {
      this.$router.replace('/login')
    }
  }
}
</script>
<style>
  .home{
    height: 100%;
  }
</style>
