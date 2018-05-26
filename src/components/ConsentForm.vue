<template>
  <div class="inline">
    <button
      class="waves-effect waves-light btn"
      @click="visible = true">
      View privacy settings
    </button>
    <div
      v-if="visible"
      class="consent__modal-overlay"
      @click="visible = false"/>
    <div
      v-if="visible"
      class="consent__modal">
      <div class="consent__modal-content">
        <h4>Privacy is important</h4>
        <p>This website protects your privacy by adhering to the European Union General Data Protection Regulation (GDPR). We will not use your data for any purpose that you do not consent to.
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
              <label :for="consent.category">
                <input
                  :id="consent.category"
                  :name="consent.category"
                  :checked="consent.accepted"
                  type="checkbox"
                  @change="updateConsent">
                <span>I accept</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="consent__modal-footer">
        <button
          class="consent__modal-close waves-effect waves-green btn-flat"
          @click="visible = false">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  store,
  name: 'ConsentForm',
  props: ['apiKey'],
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
  beforeMount() {
    window.addEventListener('keyup', this.onEscapeKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onEscapeKeyUp);
  },
  mounted: function() {
    window.KonsentOptions = {apiKey: this.apiKey}
    this.$store.dispatch('loadConsents')
  },
  methods: {
    updateConsent(e) {
      this.$store.commit('consent',
        {'category': e.target.name, 'accepted': e.target.checked})
    },
    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.visible = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  consent-form {
      @import '../assets/styles/materialize/materialize';
    }
</style>


<style lang="scss" scoped>
consent-form {
  .inline {
    display: inline;
  }
}
</style>
