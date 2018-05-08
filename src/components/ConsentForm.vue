<template>
  <div class="modal">
    <div class="modal-content">
      <h4>Privacy is important</h4>
      <p>This website protects your privacy by adhering to the European Union General Data Protection Regulation (GDPR). We will not use your data for any purpose that you do not consent to. We request use of anonymized data to improve your experience on our site.
      </p>
      <div
        v-for="consent in consents" 
        :key="consent.id">
        <label :for="consent.id">
          <input
            :id="consent.id"
            :name="consent.id"
            :checked="consent.value"
            type="checkbox"
            @change="updateConsent">
          <span>{{ consent.label }}</span>
        </label>
      </div>
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
<style lang="sass" scoped>
  @import ../assets/styles/materialize/materialize
</style>

<style lang="css" scoped>
.modal {
  display: inherit;
}
</style>
