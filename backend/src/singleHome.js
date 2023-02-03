const axios = require("axios");
const dotenv = require('dotenv').config();
const api_key = process.env.API_KEY;
const axiosRetry = require('axios-retry');
const { response } = require("express");

axiosRetry(axios, {
  retries: 10,
  retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 1000;
  },
  retryCondition: (error) => {
      return error.response.status === 403;
  },
});

const header = (homeID) =>{
  return {
    method: 'GET',
    url: `https://real-estate-usa.p.rapidapi.com/api/v1/properties/${homeID}`,
    headers: {
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': 'real-estate-usa.p.rapidapi.com'
    }
  }
};

async function test(homeID){
      // console.log(homeID)
      return new Promise((resolve, reject) => {
        const options = header(homeID)
        axios.request(options).then(function (response) {
          resolve(response.data)
          // console.log(response.data);
        }).catch(function (error) {
          reject(error)
          console.error(error);
        });
      })
}

module.exports = {
    make_API_call : function(homeID){
      return (test(homeID));
    }
}