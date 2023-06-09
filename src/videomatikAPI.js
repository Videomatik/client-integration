// REST API documentation at: https://app.videomatik.com.br/docs/#overview
const VideomatikAPI = require('@videomatik/api')

const videomatikAPI = new VideomatikAPI({
  // To manage your API Keys go to: https://app.videomatik.com.br/api-keys/
  apiKey: process.env.VIDEOMATIK_API_KEY,
})

module.exports = videomatikAPI
