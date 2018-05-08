<template>
  <div>
    <a 
      class="waves-effect waves-light btn"
      @click="visible = true">
      Privacy consent
    </a>
    <div 
      v-if="visible"
      class="modal-overlay"
      @click="visible = false"/>
    <div 
      v-if="visible" 
      class="modal">
      <div class="modal-content">
        <h4>Privacy is important</h4>
        <p>This website protects your privacy by adhering to the European Union General Data Protection Regulation (GDPR). We will not use your data for any purpose that you do not consent to. We request use of anonymized data to improve your experience on our site.
        </p>
        <div
          v-for="consent in consents" 
          :key="consent.id">
          <div class="card">
            <div class="card-content">
              <span class="card-title">{{ consent.label }}</span>
              <p>{{ consent.description }}</p>
            </div>
            <div class="card-action">
              <label :for="consent.id">
                <input
                  :id="consent.id"
                  :name="consent.id"
                  :checked="consent.value"
                  type="checkbox"
                  @change="updateConsent">
                <span>I accept</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a
          href="#!"
          class="modal-close waves-effect waves-green btn-flat"
          @click="visible = false">Ok</a>
      </div>
    </div>
  </div>
</template>

<script>
  
export default {
  name: 'ConsentForm',
  data: function() {
    return { visible: false }
  },
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
  z-index: 1000;
}

.modal-overlay {
  display: inherit;
  opacity: 0.5;
}
</style>
