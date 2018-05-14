import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_BASE_URL
const API_KEY = process.env.VUE_APP_API_KEY

class Api {
  constructor() {
   this.client = axios.create({
      baseURL: BASE_URL,
    })
    this.client.interceptors.request.use(function(config) {
      let options = window.KonsentOptions || {}
      const apiKey = options.apiKey || API_KEY
      config.headers.Authorization = 'Token ' + apiKey
      return config
    })
  }

  categories() {
    return this.client.get('/category/')
  }

  consents(device) {
    return this.client.get('/consent/', {params: {device: device}})
  }

  saveConsent(data) {
    if (data.id) {
      return this.client.put('/consent/'+data.id+'/', data);
    } else {
      return this.client.post('/consent/', data)
    }
  }

  request(data) {
    return this.client.post('/request/', data)
  }
}

export default Api
