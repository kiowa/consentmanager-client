import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

class Api {
    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL
        })
    }

    categories() {
        return this.client.get('/category/')
    }
}

export default Api
