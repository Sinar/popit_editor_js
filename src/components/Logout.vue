<template>
  <p>logout</p>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('logout')
  }
}
</script>
