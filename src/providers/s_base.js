// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    // baseURL: 'https://b-simplify.herokuapp.com'
    baseURL: 'http://localhost:8000'
});


// Also add/ configure interceptors && all the other cool stuff

export default instance;