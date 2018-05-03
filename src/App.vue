<template>
  <div id="app">
    <ConsentForm/>
  </div>
</template>

<script>
import ConsentForm from './components/ConsentForm.vue'

export default {
  name: 'app',
  components: {
    ConsentForm
  },
  methods: {
  },

  mounted: function() {
    this.$store.dispatch('loadConsents')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
