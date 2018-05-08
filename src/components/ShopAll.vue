<template>
  <div class="row">
    <div class="col-xs-12">
      <div style="text-align: center;">
      <v-paginator :resource_url="resource_url" :shops="shops" @update="updateResource" ></v-paginator>
        <select v-model="selectedShop">
          <option disabled value="">Please select one</option>
          <option v-for="(shop, index) in shops" :key="index">{{shop}}</option>
        </select>
        <select v-model="selectedKeyword">
          <option >{{selectedKeyword}}</option>
          <option v-for="(keyword, index) in keywords" :key="index">{{keyword}}</option>
        </select>
      </div>
    </div>
    <hr>
    <div class="row">
      <transition-group name="list" tag="div">
      <div v-for="(item, index) in products" :key="index">
        <div class="col-xs-3">
          <div class="thumbnail ctext">
          <img :src="item.imgUrl"/>
          <h3> {{item.title}}</h3>
            <h3> {{item.shop}}</h3>
          <p v-html="item.description">
          </p>
            <h5 style="text-align: center;">price ${{ item.amount / 100 }} + shipping ${{ item.shipping / 100}} + tax</h5>
            <div class="row" v-if="index % 4 === 3 "><div class="col-xs-12"></div></div>
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
        this.resource_url = 'https://json.webasone.com/firebase/shop_json.php?pageno=1&pagesize=8&shops=reddingca&caloc=en_us'
        console.log(newVal)
      },
      selectedKeyword (newVal, oldVar) {
        // location.reload()
        this.resource_url = 'https://json.webasone.com/firebase/shop_json.php?pageno=1&pagesize=8&shops=reddingca%20chicoca&loc=en_us'
        console.log(newVal)
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
        return window.shop['url'] + 'shop_json.php?pageno=1&pagesize=' + window.shop['pagesize'] + '&shops=' + window.shop['shops'].join('%20') + '&loc=' + window.shop['loc']
      }
    },
    created () {
        console.log(window.shop['url'] + 'shop_json.php?pageno=1&pagesize=' + window.shop['pagesize'] + '&shops=' + window.shop['shops'].join('%20') + '&loc=' + window.shop['loc'])
      var _this = this
        this.$http.get(window.shopinfo).then(response => {
          _this.keywords = response.body['keys']
          _this.shops = response.body['shops']
          console.log(response.body['keys'])
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
</style>
