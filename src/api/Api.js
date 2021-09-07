const baseURL = 'http://192.168.0.92:5000/'

const getDataFromServer = (url = "", filterParams = null) => {
    return fetch(baseURL + url + '?' + filterParams.toString())
      .then(response => response.json())
      .catch(err => console.log(err))
}

const getGreenhouses = () => {
  return fetch(baseURL + "locations/filter")
    .then(response => response.json())
    .catch(err => console.log(err))
}

const getRealTimeData = (greenhouses, sections, sectors, filterParams = new URLSearchParams("")) => {
  filterParams = new URLSearchParams("")
  if(greenhouses && greenhouses.length > 0)
    for (var gh of greenhouses)
      filterParams.append("greenhouses", gh)
  if(sections && sections.length > 0) 
    for (var s of sections) 
      filterParams.append("sections", s)
  if(sectors && sectors.length > 0) 
    for (var sec of sectors) 
      filterParams.append("sectors", sec)
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