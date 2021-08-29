const getDataFromServer = (url = "", filterParams = null) => {
    console.log('http://192.168.0.100:5000/' + url + '?' + filterParams.toString())
    return fetch('http://192.168.0.100:5000/' + url + '?' + filterParams.toString())
      .then(response => response.json())
      .catch(err => console.log(err))
}

module.exports = {
  getDataFromServer
}