import Vue from 'vue'
import Router from 'vue-router'
import ShopAll from '@/components/ShopAll'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: ShopAll
  },
    {
      path: '*',
      name: '/',
      component: ShopAll
    }]
})
