// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/form',
          permanent: false,  // or `true` if you want a permanent 301
        },
      ]
    },
  }
  
