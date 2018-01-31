import axios from 'axios'

// make sure check for token in localStorage before use
export const HTTP = axios.create({
  baseURL: 'https://api.popit.sinarproject.org',
  headers: {
    Authorization: 'Token ' + localStorage.getItem('token')
  }
})
