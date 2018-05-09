import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_BASE_URL
const API_KEY = process.env.VUE_APP_API_KEY

class Api {
  constructor() {
    let options = window.KonsentOptions || {}
    const apiKey = options.apiKey || API_KEY
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {'Authorization': 'Token ' + apiKey}
    })
  }

  categories() {
    return this.client.get('/category/')
  }

  consents(userid) {
    return this.client.get('/consent/', {params: {userid: userid}})
  }

  saveConsent(data) {
    if (data.id) {
      return this.client.put('/consent/'+data.id+'/', data);
    } else {
      return this.client.post('/consent/', data)
    }
  }
}

export default Api
