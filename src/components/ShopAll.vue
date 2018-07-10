<template>
  <div class="row">
    <wao-stripe></wao-stripe>
    <div class="col-xs-12">
      <div style="text-align: center;">
      <v-paginator :resource_url="resource_url" :shops="shops" @update="updateResource" ></v-paginator>
        <select v-model="selectedShop">
          <option value="">All</option>
          <option v-for="(shop, index) in shops" :key="index">{{shop}}</option>
        </select>
        <select v-model="selectedKeyword">
          <option></option>
          <option >{{selectedKeyword}}</option>
          <option v-for="(keyword, index) in keywords" :key="index">{{keyword}}</option>
        </select>
      </div>
    </div>
    <hr>
    <div class="col-xs-12" v-if="cartItem">
      <div class="row">
        <div class="col-xs-6">
      <span > {{cartItem.title}}</span>
        </div>
        <div class="col-xs-6">
      <card class='stripe-card'
            :class='{ complete }'
            stripe='stripePKey'
            :options='stripeOptions'
            @change='complete = $event.complete'
      />
      <button class='pay-with-stripe' @click='pay' :disabled='!complete'>Pay with credit card</button>
    </div>
      </div>
    </div>
    <div class="row">
      <transition-group name="list" tag="div">
        <div v-for="(item, index) in products" :key="index">
          <div class="col-md-3 col-sm-6 col-xs-12">
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
                <h5 style="text-align: center;">price ${{ item.amount / 100 }} + shipping ${{ item.shipping / 100}} +
                  tax</h5>
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
                  <input type="hidden" name="amount" :value="total(item)"/>
                  <input type="hidden" name="cid" :value="item.connectAccount"/>
                </form>
                <button class="cartbutton" @click="addToCart(item)">Add to cart</button>
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
  import WaoStripe from './WAOStripe/WaoStripe'
  import { Store } from './WAOStripe/store.js'
  import { Payment } from './WAOStripe/payments.js'
  import { StripeCheckout } from 'vue-stripe'
  import { Card, createToken } from 'vue-stripe-elements-plus'

  export default {
    name: 'ShopAll',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        stripePKey: window.stripePKey,
        stripeOptions: {},
        complete: false,
        selectedShop: '',
        selectedKeyword: '',
        cartItem: null,
        shops: [],
        keywords: [],
        products: [],
        shopsInfo: window.shop,
        // Here you define the url of your paginated API
        //        resource_url: 'https://json.webasone.com/samples/animals1.php'
        // resource_url: window.shopuri
        resource_url: window.shop['url'] + 'shop_json.php?pageno=1&pagesize=' + window.shop['pagesize'] + '&shops=' + window.shop['shops'].join('%20') + '&loc=' + window.shop['loc']

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
          selectKey = '&key=' + this.selectedKeyword
        }
        this.resource_url = window.shop['url'] + 'shop_json.php?pageno=1&pagesize=' + window.shop['pagesize'] + '&shops=' + shopList + '&loc=' + window.shop['loc'] + selectKey
        // console.log(this.resource_url)
      },
      selectedKeyword (newVal, oldVar) {
        // location.reload()
        var shopList = ''
        if (this.selectedShop === '') {
          shopList = window.shop['shops'].join('%20')
        } else {
          shopList = this.selectedShop
        }
        this.resource_url = window.shop['url'] + 'shop_json.php?pageno=1&pagesize=' + window.shop['pagesize'] + '&shops=' + shopList + '&loc=' + window.shop['loc'] + '&key=' + newVal
        // console.log(this.resource_url)
      }
    },
    components: {
      VPaginator: VuePaginator,
      StripeCheckout,
      Card,
      WaoStripe
    },
    methods: {
      addToCart (item, event) {
        console.log(item)
        this.cartItem = item
      },
      pay () {
        // createToken returns a Promise which resolves in a result object with
        // either a token or an error key.
        // See https://stripe.com/docs/api#tokens for the token object.
        // See https://stripe.com/docs/api#errors for the error object.
        // More general https://stripe.com/docs/stripe.js#stripe-create-token.
        createToken().then(data => console.log(data.token))
      },
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
        return window.shop['url'] + 'shop_json.php?pageno=1&pagesize=' + window.shop['pagesize'] + '&shops=' + window.shop['shops'].join('%20') + '&loc=' + window.shop['loc']
      },
      openModal (description) {
        this.$modal.show({
          template: `<div class="panel panel-default"><div class="panel-heading"><button class="btn btn-default center-block" @click="$emit('close')">Close</button></div><div class="panel-body"><p v-html="description" /></div> </div>`,
          props: ['description']
        }, {
          description: description
        }, {
          width: '80%',
          height: '60%'
        }, {
        })
      }
    },
    created () {
      var _this = this
      var store = new Store()
      console.log(window)

      Payment(store)
      this.$http.get(window.shop['url'] + 'info_json.php').then(response => {
          _this.keywords = response.body['keys']
          _this.shops = window.shop['shops']
          // console.log(response.body['keys'])
    }, response => {
          // error
    })
    }
  }
</script>

<style>
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .stripe-card {
    width: 300px;
    border: 1px solid grey;
  }
  .stripe-card.complete {
    border-color: green;
  }
  button.cartbutton {
    display: block;
    background: #666ee8;
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    border: 0;
    font-weight: 700;
    width: 100%;
    height: 40px;
    outline: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  button.cartbutton:focus {
    background: #555abf;
  }

  button.cartbutton:hover {
    transform: translateY(-1px);
    box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1),
    0 3px 6px 0 rgba(0, 0, 0, 0.08);
  }

  button.cartbutton:active {
    background: #43458b;
  }
</style>
