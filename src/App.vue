<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {}
</script>
<style>
@import './css/Filter';
@import './css/resetIview';
#app {
  height: 100%;
  overflow-y: scroll;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

ol,
ul {
  list-style: none;
}

em,
i {
  font-style: normal;
}

a img {
  border: 0 none;
}
img {
  vertical-align: middle;
}

textarea {
  resize: none;
}
.container {
  width: 100%;
  min-height: 100%;
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
.title-name{
  font-size: 20px;
  color: #17181A;
  line-height: 30px;
}
</style>
