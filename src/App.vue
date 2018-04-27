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
    setUserId: function(userid) {
      console.log('userid set to:', userid);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
