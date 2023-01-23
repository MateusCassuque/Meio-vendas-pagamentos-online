<template>
  <div>
    <h1>Edit Page</h1>
    <pre>
      {{ id }}
    </pre>
  </div>
</template>

<script>
import { api } from '@/store/services.js'

export default {
  name: 'editProduct',

  components: {
  },

  data() {
    return {
      id: '',
      produt: null,
      api,
    }
  },

  methods: {
    getId() {
      this.id = this.$route.params
    },
  },

  mounted() {
  },

  fetch() {
    this.getId()
    try {
      api.get(`/products/${this.id.productId}`)
    } catch (err) { }
  }
}
</script>