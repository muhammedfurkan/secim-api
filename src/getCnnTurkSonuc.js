const axios = require('axios');

const getCnnTurkSonuc = async () => {
  const url = "https://secim2023.cnnturk.com/sample/home.json"
  const response = await axios.get(url)
  const data = response.data
  return data
}



module.exports = getCnnTurkSonuc
