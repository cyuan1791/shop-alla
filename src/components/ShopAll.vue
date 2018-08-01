<template>
  <div class="row">
    <div class="col-xs-12">
      <div style="text-align: center;">
      <v-paginator :resource_url="resource_url" :shops="shops" @update="updateResource" ></v-paginator>
        <select v-model="selectedShop">
          <option value="">All</option>
          <option v-for="(shop, index) in shops" :key="index">{{shop}}</option>
        </select>
        <button @click="showKeysInput = ! showKeysInput">Keyswords</button>
      </div>
    </div>
    <hr>
        <form id="keyForm" class="row" v-if="showKeysInput" @submit="checkForm">
          <div class="col-xs-3 col-sm-2 col-sm-1" v-for="(keyword, index) in keywords" :key="index">
              <div class="btn btn-default">
                  <input type="checkbox" :name="keyword" :value="keyword"> {{keyword}}
              </div>
            </div>
            <div class="col-xs-3 col-sm-2 col-sm-1">
            <input class="btn btn-danger" style="text-align: center;" type="submit" value="Select" />
            </div>
        </form>
    <div class="row">
      <transition-group name="list" tag="div">
        <div v-for="(item, index) in products" :key="index">
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="thumbnail ctext">
              <img :src="item.imgUrl"/>
              <h3> {{item.title}}</h3>
              <h4> {{item.keywords}}</h4>
              <span v-html="item.description">
          </span>
              <button v-if="item.modal !== ''" class='btn btn-info pull-right' @click="openModal(item.modal)">More
              </button>
              <modals-container name="webasone">
              </modals-container>
              <div v-if="item.amount > 0">
                <h5 style="text-align: center;">price ${{ item.amount / 100 }}(shipping and tax included)</h5>
                <div class="row" v-if="index % 4 === 3 ">
                  <div class="col-xs-12">
                    <hr/>
                  </div>
                </div>
                <form action="charge.php" method="POST" style="text-align: center">
                  <stripe-checkout
                    :formId="item.ukey"
                    :options="options"
                    :stripe-key="stripePKey"
                    :product="getProduct(item)">
                  </stripe-checkout>
                  <input type="hidden" name="skuId" :value="item.skuId"/>
                  <input type="hidden" name="cid" :value="item.connectAccount"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import VuePaginator from './VPaginator/VPaginator'
import { StripeCheckout } from 'vue-stripe'

export default {
  name: 'ShopAll',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      stripePKey: window.stripePKey,
      selectedShop: '',
      selectedKeyword: '',
      showKeysInput: false,
      selectedKeys: [],
      shops: [],
      keywords: [],
      products: [],
      shopsInfo: window.shop,
      // Here you define the url of your paginated API
      //        resource_url: 'https://json.webasone.com/samples/animals1.php'
      // resource_url: window.shopuri
      resource_url:
        window.shop['url'] +
        'shop_json.php?pageno=1&pagesize=' +
        window.shop['pagesize'] +
        '&shops=' +
        window.shop['shops'].join('%20') +
        '&loc=' +
        window.shop['loc']

      // resource_url: 'https://json.webasone.com/firebase/a.php?pageno=1&pagesize=5&shops=chicoca&loc=en_us'
    }
  },
  computed: {
    options () {
      return {
        shippingAddress: true,
        billingAddress: true
      }
    }
  },
  watch: {
    selectedShop (newVal, oldVar) {
      // location.reload()
      // this.resource_url = 'https://json.webasone.com/firebase/shop_json.php?pageno=1&pagesize=8&shops=reddingca&caloc=en_us'
      var shopList = ''
      if (newVal === '') {
        shopList = window.shop['shops'].join('%20')
      } else {
        shopList = newVal
      }
      var selectKey = ''
      // console.log(this.selectedKeyword)
      if (this.selectedKeyword !== '') {
        selectKey = '&key=' + this.selectedKeys.join('%20')
      }
      this.resource_url =
        window.shop['url'] +
        'shop_json.php?pageno=1&pagesize=' +
        window.shop['pagesize'] +
        '&shops=' +
        shopList +
        '&loc=' +
        window.shop['loc'] +
        selectKey
      // console.log(this.resource_url)
    },
    selectedKeys (newVal, oldVar) {
      // location.reload()
      console.log(newVal)
      var newKeys = newVal.join('%20')
      var shopList = ''
      if (this.selectedShop === '') {
        shopList = window.shop['shops'].join('%20')
      } else {
        shopList = this.selectedShop
      }
      this.resource_url =
        window.shop['url'] +
        'shop_json.php?pageno=1&pagesize=' +
        window.shop['pagesize'] +
        '&shops=' +
        shopList +
        '&loc=' +
        window.shop['loc'] +
        '&key=' +
        newKeys
      // console.log(this.resource_url)
    }
  },
  components: {
    VPaginator: VuePaginator,
    StripeCheckout
  },
  methods: {
    total (item) {
      return (item.amount + item.amount * window.tax + item.shipping) / 100
    },
    updateResource (data) {
      this.products = data
    },
    selectedProduct () {
      return this.products
    },
    getProduct (item) {
      return {
        name: 'welcome',
        description: item.title,
        amount: item.amount + item.amount * window.tax + item.shipping
      }
    },
    startUrl () {
      return (
        window.shop['url'] +
        'shop_json.php?pageno=1&pagesize=' +
        window.shop['pagesize'] +
        '&shops=' +
        window.shop['shops'].join('%20') +
        '&loc=' +
        window.shop['loc']
      )
    },
    checkForm (e) {
      var elements = document.getElementById('keyForm').elements
      this.selectedKeys = []
      this.showKeysInput = false
      for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i)
        if (item.checked) {
          this.selectedKeys.push(item.value)
        }
      }
      e.preventDefault()
    },
    openModal (description) {
      this.$modal.show(
        {
          template: `<div class="panel panel-default"><div class="panel-heading"><button class="btn btn-default center-block" @click="$emit('close')">Close</button></div><div class="panel-body"><p v-html="description" /></div> </div>`,
          props: ['description']
        },
        {
          description: description
        },
        {
          width: '80%',
          height: '60%'
        },
        {}
      )
    }
  },
  created () {
    var _this = this
    this.$http.get(window.shop['url'] + 'info_json.php').then(
      response => {
        _this.keywords = response.body['keys']
        _this.shops = window.shop['shops']
        // console.log(response.body['keys'])
      },
      response => {
        // error
      }
    )
  }
}
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
