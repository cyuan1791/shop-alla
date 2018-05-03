<template>
  <div class="row">
    <div class="col-xs-12">
      <v-paginator :resource_url="resource_url" @update="updateResource"></v-paginator>
    </div>
    <hr>
    <div class="row">
      <div v-for="(item, index) in products" :key="index" class="col-xs-3">
        <div class="thumbnail">
          <img :src="item.imgUrl"/>
          <h3> {{item.title}}</h3>
          <p v-html="item.description">
          </p>
          <form action="charge.php" method="POST">
            <stripe-checkout
              :formId="item.ukey"
              :options="options"
              :stripe-key="stripePKey"
              :product="getProduct(item)">
            </stripe-checkout>
            <input type="hidden" name="amount" :value="item.amount"/>
            <input type="hidden" name="cid" :value="item.connectAccount"/>
          </form>
          {{ item.index }} of {{ item.total}}
        </div>
      </div>
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
        products: [],
        // Here you define the url of your paginated API
        //        resource_url: 'https://json.webasone.com/samples/animals1.php'
        resource_url: window.shopuri
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
    components: {
      VPaginator: VuePaginator,
      StripeCheckout
    },
    methods: {
      updateResource (data) {
        this.products = data
      },
      getProduct (prod) {
        return {
          name: 'welcome',
          description: 'desc',
          amount: prod.amount
        }
      }
    }
  }
</script>
