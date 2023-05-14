const axios = require('axios');


const getNtcSonuc = async () => {
  const url = "https://secim-storage-cdn.ntv.com.tr/elctn2023-fe-nodata/data/parliamentary/cities.json?v=20230514143147"
  const response = await axios.get(url)
  const data = response.data
  return data
}

const getNtvCB = async () => {
  const url = "https://secim-storage-cdn.ntv.com.tr/elctn2023-fe-nodata/data/president/general.json?v=20230514143147"
  const response = await axios.get(url)
  const data = response.data
  return data
}



module.exports = getNtcSonuc, getNtvCB