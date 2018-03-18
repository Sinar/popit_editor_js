import axios from 'axios'

// make sure check for token in localStorage before use

var baseURLConfig

if (process.env.NODE_ENV === 'development') {
  baseURLConfig = 'http://testing.popit.sinarproject.org'
} else if (process.env.NODE_ENV === 'production') {
  baseURLConfig = 'https://api.popit.sinarproject.org'
}

export const HTTP = axios.create({
  baseURL: baseURLConfig,
  headers: {
    Authorization: 'Token ' + localStorage.getItem('token')
  }
})
