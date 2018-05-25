<template>
  <div class="inline">
    <button
      class="waves-effect waves-light btn"
      @click="visible = true">
      Subject data request
    </button>
    <div
      v-if="visible"
      class="modal-overlay"
      @click="close()"/>
    <div
      v-if="visible"
      class="modal">
      <form @submit.stop.prevent="send()">
        <div class="modal-content">
          <h4>Request your data</h4>
          <p>Fill out the form to request data we have gathered about you</p>
          <div class="row">
           <div class="input-field col s12">  
              <div class="select-wrapper">
                <input
                  :value="request_type.label"
                  :class="[{ 'valid': isValidRequestType, 'invalid': !isValidRequestType }]"
                  class="select-dropdown dropdown-trigger"
                  type="text"
                  @click="activeSelect = true"
                  @focus="activeSelect = true"
                  required>
                <ul
                  :class="[{ 'select-active': activeSelect }]"
                  class="dropdown-content select-dropdown"
                  tabindex="0">
                  <li
                    class="disabled"
                    tabindex="0"
                    @click="activeSelect = false">
                    <span>Choose your option</span>
                  </li>
                  <li
                    v-for="rt in requestTypeOptions"
                    :class="[{ 'selected': request_type === rt}]"
                    @click="activeSelect = false;request_type=rt">
                    <span>{{ rt.label }}</span>
                  </li>
                </ul>
                <svg
                  class="caret"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10l5 5 5-5z"/>
                  <path
                    d="M0 0h24v24H0z"
                    fill="none"/>
                </svg>
              </div>
              <label>Request type</label>
            </div>
            <div class="input-field col s12">
              <input
                id="userid"
                ref="emailField"
                v-model="userid"
                :class="[{ 'valid': validEmail }, { 'invalid': invalidEmail }]"
                type="email"
                class="validate"
                @keyup="validateEmail()"
                required>
              <label
                class="active"
                for="userid">Email</label>
            </div>
            <div class="input-field col s12">
              <textarea
                id="message"
                v-model="message"
                :class="[{ 'valid': validMessage }]"
                ref="messageField"
                class="materialize-textarea validate"
                @keyup="isValidMessage()"
                required/>
              <label
                class="active"
                for="message">Message</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="submit"
            class="modal-close waves-effect waves-green btn-flat">
            send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Api from '../api'
import store from '../store'

const api = new Api()

export default {
  store,
  name: 'SubjectRequestForm',
  props: ['apiKey'],
  data: function() {
    return {
      visible: false,
      request_type: {label: 'Choose your option', value: ''},
      activeSelect: false,
      requestTypeOptions: [
        {label: 'Request for data access', value:'data'},
        {label: 'Request for data erasure', value:'delete'}
        ],
      invalidRequestType: false,
      validEmail: false,
      invalidEmail: false,
      validMessage: false,
      userid: '',
      message: ''
    }
  },
  computed: {
    isValidRequestType: function() {
      return this.request_type.value !== ''
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
  },
  methods: {
    send() {
      if (!(this.validEmail && this.validEmail && this.isValidRequestType)) {
        return
      }
      api.request({
        device: this.$store.state.device,
        request_type: this.request_type.value,
        userid: this.userid,
        message: this.message
      })
      this.close()
    },
    close() {
      this.visible = false;
      this.activeSelect = false;
    },
    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.close();
      }
    },
    validateEmail: function() {
      this.validEmail = this.$refs.emailField.validity.valid
      this.invalidEmail = !this.validEmail
    },
    isValidMessage: function() {
      this.validMessage = this.$refs.messageField.validity.valid
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
   subject-request {
      @import '../assets/styles/materialize/materialize';
    }
</style>

<style lang="scss" scoped>
subject-request {
  .inline {
    display: inline;
  }

  .modal {
    display: inherit;
    z-index: 1000;
  }

  .modal-overlay {
    display: inherit;
    opacity: 0.5;
  }

  .modal .modal-footer {
    padding: 4px 0px;
  }

  .select-active {
    display: block;
    width: 256.984px;
    left: 0px;
    top: 0px;
    height: 200px;
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scaleX(1) scaleY(1);
  }
}
</style>
