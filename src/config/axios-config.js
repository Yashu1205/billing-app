import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://dct-billing-app.heroku.com/api'
})

export default axios