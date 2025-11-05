const axios = require('axios');

async function urlToBuffer(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data);
}

module.exports = urlToBuffer;
