import Vue from 'vue'
import Router from 'vue-router'
import Clue from '@/page/Clue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Clue',
    component: Clue
  }]
})
