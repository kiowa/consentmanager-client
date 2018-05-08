<template>
  <div id="Konsent">
    <ConsentForm/>
  </div>
</template>

<script>
import ConsentForm from './components/ConsentForm.vue'

export default {
  name: 'Konsent',
  components: {
    ConsentForm
  },
  mounted: function() {
    this.$store.dispatch('loadConsents')
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto');
#Konsent {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
