const { addbookshandler } = require("./handler");

const route = [
    {
      method: 'POST',
      path: '/books',
      handler: addbookshandler,
    },
  ];
   
  module.exports = route;