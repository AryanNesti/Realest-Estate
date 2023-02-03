const axios = require("axios");
const zipcodes = require('zipcodes');
var z = zipcodes.random().zip;
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

const options = {
  method: 'GET',
  url: 'https://real-estate-usa.p.rapidapi.com/api/v1/properties',
  params: {postal_code: '', offset: '0', limit: '100'},
  headers: {
    'X-RapidAPI-Key': api_key,
    'X-RapidAPI-Host': 'real-estate-usa.p.rapidapi.com'
  }
}

async function test(zip){
      // console.log(zip)
      return new Promise((resolve, reject) => {
        options.params.postal_code = zip;
        axios.request(options).then(function (response) {
          resolve(response.data)
          // console.log(response.data);
        }).catch(function (error) {
          reject(error)
          console.error(error);
        });
      })
}

async function callByID(id){
  // console.log(zip)
  return new Promise((resolve, reject) => {
    options.params.property_id = id;
    options.params.limit = 1;
    options.url = 'https://real-estate-usa.p.rapidapi.com/api/v1/properties/' + id;
    axios.request(options).then(function (response) {
      resolve(response.data)
      // console.log(response.data);
    }).catch(function (error) {
      reject(error)
      console.error(error);
    });
  })
}

// async function lat_long(zip){
//   var photos = [];
//   const data = await test(zip);
//   data.properties?.map(prop => {
//     prop.listings?.map(list =>{
//       list.photos?.map(p => {
//         photos.push(p.href)
//       })
//     })
//   })
//   return (photos);
// }

module.exports = {
  make_API_call : function(zip){
    // lat_long(zip);
    return (test(zip));
  },
  make_API_call_byID : function(id){
    // lat_long(zip);
    return (callByID(id));
  }
}