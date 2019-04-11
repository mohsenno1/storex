import axios from 'axios'

const client = axios.create({
  baseURL: 'https://mobilebackend.turing.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

module.exports = client;