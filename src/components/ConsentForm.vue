<template>
  <div class="consent-form">
    <h1>Privacy is important</h1>
    <p>This website protects your privacy by adhering to the European Union General Data Protection Regulation (GDPR). We will not use your data for any purpose that you do not consent to. We request use of anonymized data to improve your experience on our site.
    </p>
    <div v-for="consent in consents" :key="consent.id">
      <input :checked="consent.value" @change="updateConsent" type="checkbox" :name="consent.id" :id="consent.id">
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
      }
    }
  },
  methods: {
    updateConsent(e) {
      this.$store.commit('consent',
        {'id': e.target.name, 'value': e.target.checked})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.consent-form {
  border: 1px solid black;
  padding: 20px;
}
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
