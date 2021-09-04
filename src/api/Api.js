const baseURL = 'http://192.168.0.100:5000/'

const getDataFromServer = (url = "", filterParams = null) => {
    return fetch(baseURL + url + '?' + filterParams.toString())
      .then(response => response.json())
      .catch(err => console.log(err))
}

const getGreenhouses = () => {
  return fetch(baseURL + "greenhouses")
    .then(response => response.json())
    .catch(err => console.log(err))
}

const getRealTimeData = (greenhouse, sector, section, filterParams = null) => {
  console.log(baseURL + "real-time/filter?" + filterParams.toString())
  return fetch(baseURL + "real-time/filter?" + filterParams.toString())
    .then(response => response.json())
    .catch(err => console.log(err))
}

module.exports = {
  getDataFromServer,
  getGreenhouses,
  getRealTimeData
}