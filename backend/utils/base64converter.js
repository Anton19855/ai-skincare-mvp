const axios = require('axios');

async function fetchImageAsBase64(imageUrl) {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  const mimeType = response.headers['content-type'];
  return `data:${mimeType};base64,${base64}`;
}

module.exports = fetchImageAsBase64;