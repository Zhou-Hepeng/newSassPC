<template>
  <div id="app">
    <Layout>
      <Header class="title-bar">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><img src="http://iph.href.lu/34x30" alt=""> 卡商宝智慧营销系统</div>
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
            <menu-item name="4">
              <Icon type="ios-paper"></Icon>
              退出
            </menu-item>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <i-menu class="main-menu" width="200" active-name="1-1" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                商机中心
              </template>
              <menu-item name="1-1">询价线索</menu-item>
              <menu-item name="1-2">400来电</menu-item>
              <menu-item name="1-3">一口价</menu-item>
              <menu-item name="1-4">抵扣券</menu-item>
              <menu-item name="1-5">商机设置</menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-filing"></Icon>
                Navigation Two
              </template>
              <menu-item name="2-1">Option 5</menu-item>
              <menu-item name="2-2">Option 6</menu-item>
              <Submenu name="3">
                <template slot="title">Submenu</template>
                <menu-item name="3-1">Option 7</menu-item>
                <menu-item name="3-2">Option 8</menu-item>
              </Submenu>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-gear"></Icon>
                Navigation Three
              </template>
              <menu-item name="4-1">Option 9</menu-item>
              <menu-item name="4-2">Option 10</menu-item>
              <menu-item name="4-3">Option 11</menu-item>
              <menu-item name="4-4">Option 12</menu-item>
            </Submenu>
          </i-menu>
        </Sider>
        <Layout class="main-content">
          <router-view/>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'App'
}

</script>
<style>
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.title-bar {
  height: 60px;
  background-color: #fff;
}

.title-bar .ivu-menu {
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.ivu-menu-dark .login-info .ivu-menu-item {
  color: #495060;
}

.layout-logo {
  width: 300px;
  float: left;
  font-size: 20px;
  color: #17181A;
}

.login-info {
  float: right
}

.main-content {
  width: 1080px;
  padding: 20px 20px 0;
}

.main-menu {
  width: 200px;
  min-height: calc(100vh - 60px);
  background-color: #1C2450;
  color: #fff;
}

.ivu-menu-vertical .ivu-menu-submenu-title:hover {
  background-color: #171E41;
}

.ivu-menu-opened {
  background-color: #171E41;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-opened .ivu-menu-item:hover {
  background-color: #171E41
}

.ivu-menu-opened .ivu-menu {
  color: #fff;
}

.ivu-menu-item-group-title {
  color: #fff;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #25A6FF;
}

#app {
  height: 100%;
  overflow: scroll;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 12px;
  color: #17181A;
}

html,
body {
  height: 100%;
}

body {
  background-color: #f5f5f5;
}

html,
body,
h1,
h2,
h3,
h4,
h5,
p,
figure,
figcaption,
ul,
ol,
li,
dl,
dt,
dd,
form {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 400;
  -webkit-text-size-adjust: none;
}

body,
select,
textarea,
input {
  font: 16px/1.5 "Microsoft YaHei", Arial;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

ol,
ul {
  list-style: none;
}

var,
em,
i {
  font-style: normal;
}

a img {
  border: 0 none;
}

a:link,
a:visited {
  text-decoration: none;
  color: none;
}

img {
  vertical-align: middle;
}

input:focus::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0);
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: rgba(23, 24, 26, .4)
}

.rule textarea::-webkit-input-placeholder {
  color: rgba(23, 24, 26, .4)
}

input:focus:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0);
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: rgba(23, 24, 26, .4)
}

input[type="search"],
input[type="text"],
input[type="tel"],
input[type="number"],
input[type="date"],
input[type="password"],
button,
select,
textarea,
input[type="submit"] {
  -webkit-appearance: none;
  -webkit-border-image: none;
  border-image: none;
  -webkit-border-radius: 0;
  border-radius: 0;
  border: 0 none;
  outline: none;
  box-sizing: border-box;
}

input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
  display: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

th,
td {
  padding: 0;
  font-weight: 400;
}

.title-bar {
  height: 60px;
  padding: 10px 50px;
  line-height: 40px;
  background-color: #fff;
}

.logo {}

.logo img {
  margin-right: 10px;
}

.login-info {
  text-align: right;
  font-size: 14px;
  color: #5C6066;
}

</style>
