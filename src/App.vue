<template>
  <div id="Konsent">
    <ConsentForm/>
    <SubjectRequestForm/>
  </div>
</template>

<script>
import ConsentForm from './components/ConsentForm.vue'
import SubjectRequestForm from './components/SubjectRequestForm.vue'

export default {
  name: 'Konsent',
  components: {
    ConsentForm,
    SubjectRequestForm
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
