import Vue from 'vue'
import Router from 'vue-router'
import ShopAll from '@/components/ShopAll'
import Animal from '@/components/Animal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: ShopAll
  }, {
    path: '/a',
    name: 'Animal',
    component: Animal
  }]
})
