<template>
  <span class="v-paginator">
    <button :class="config.classes_prev" @click="fetchData(prev_page_url)" :disabled="!prev_page_url">
      {{config.previous_button_text}}
    </button>
    <span>Page {{current_page}} of {{last_page}}</span>
    <button id='nextPage' :class="config.classes_next" @click="fetchData(next_page_url)" :disabled="!next_page_url">
      {{config.next_button_text}}
    </button>
  </span>
</template>

<script>
  import {utils} from './utils'
  export default {
    props: {
      resource_url: {
        type: String,
        required: true
      },
      custom_template: '',
      restart: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        current_page: '',
        last_page: '',
        next_page_url: '',
        prev_page_url: '',
        config: {
          remote_data: 'data',
          remote_current_page: 'current_page',
          remote_last_page: 'last_page',
          remote_next_page_url: 'next_page_url',
          remote_prev_page_url: 'prev_page_url',
          previous_button_text: 'Previous',
          next_button_text: 'Next',
          classes_prev: 'btn btn-default',
          classes_next: 'btn btn-default'
        }
      }
    },
    methods: {
      fetchData (pageUrl) {
        this.$emit('request_start')
        pageUrl = pageUrl || this.resource_url
        var self = this
        var config = {}
        if (this.config.headers) {
          config.headers = this.config.headers
        }
        this.$http.get(pageUrl, config)
          .then(function (response) {
              self.$emit('request_finish', response)
              try {
                self.handleResponseData(response.data)
              } catch (err) {
                console.log(response.bodyText)
                console.log(err)
              }
          }).catch(function (response) {
          self.$emit('request_error', response)
          console.log('Fetching data failed.', response)
        })
      },
      handleResponseData (response) {
        this.makePagination(response)
        let data = utils.getNestedValue(response, this.config.remote_data)
        this.$emit('update', data)
      },
      makePagination (data) {
        this.current_page = utils.getNestedValue(data, this.config.remote_current_page)
        this.last_page = utils.getNestedValue(data, this.config.remote_last_page)
        this.next_page_url = (this.current_page === this.last_page) ? null : utils.getNestedValue(data, this.config.remote_next_page_url)
        this.prev_page_url = (this.current_page === 1) ? null : utils.getNestedValue(data, this.config.remote_prev_page_url)
      },
      initConfig () {
        this.config = utils.mergeObjects(this.config, this.options)
      }
    },
    watch: {
      resource_url () {
        this.fetchData()
      }
    },
    created () {
      this.initConfig()
      this.fetchData()
    }
  }
</script>
