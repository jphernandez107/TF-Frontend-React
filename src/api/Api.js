const baseURL = 'http://greengbackend.herokuapp.com/'

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
    for (let gh of greenhouses)
      filterParams.append("greenhouses", gh)
  if(sections && sections.length > 0) 
    for (let s of sections) 
      filterParams.append("sections", s)
  if(sectors && sectors.length > 0) 
    for (let sec of sectors) 
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
