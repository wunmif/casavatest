import axios from "axios";

var nakedHTTP = axios.create({
    withCredentials: true
})



export const HTTP = nakedHTTP

HTTP.interceptors.request.use(
    config => {
      const token =  localStorage.getItem('token')
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
      config.headers['Content-Type'] = 'application/json';

      return config;
    },
    error => {
      Promise.reject(error)
    }
);


const clientId = 'e4e816556df04e6f86fefedd0757a1da';
const clientSecret = '3953a21b883e4f9f93818f2d40200dcc';

// private methods

export const getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    
    localStorage.setItem("token", data.access_token)
    return 
}

