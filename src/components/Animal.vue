<template>
<div>
  <h1> Hello Again </h1>
  <v-paginator :resource_url="resource_url" @update="updateResource"></v-paginator>
  <ul>
    <li v-for="(animal, index) in animals" :key="index">
      {{ animal.name }}
    </li>
  </ul>
</div>
</template>

<script>
  import VuePaginator from './VPaginator/VPaginator'

  export default {
    name: 'Animal',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        animals: [],
        // Here you define the url of your paginated API
        resource_url: 'https://json.webasone.com/samples/animals1.php'
      }
    },
    components: {
      VPaginator: VuePaginator
    },
    methods: {
      updateResource (data) {
        this.animals = data
      }
    }
  }
</script>
