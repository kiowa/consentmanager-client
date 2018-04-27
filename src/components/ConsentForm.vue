<template>
  <div>
    <div v-for="consent in consents" :key="consent.id">
      <input v-model="consent.value" type="checkbox" :name="consent.id" :id="consent.id">
      <label :for="consent.id">{{ consent.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsentForm',
  computed: {
    consents: {
      get() {
        return this.$store.state.consents
      },

      set(value) {
        console.log(value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
