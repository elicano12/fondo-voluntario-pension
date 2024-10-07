const moment = require('moment');
require('moment/locale/es');

const formatDate = (date) => {
    return moment(date).format("D [de] MMMM [de] YYYY");    
};

module.exports = {
  isDevelopment: process.env.REACT_APP_ENVIRONMENT === "development",
  apiUrl: process.env.REACT_APP_API_URL,
  formatDate,
};
