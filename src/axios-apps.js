import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://job-search-app-73b30.firebaseio.com/'
});

export default instance;