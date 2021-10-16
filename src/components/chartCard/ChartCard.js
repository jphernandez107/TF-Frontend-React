import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import { Button } from 'react-bootstrap'

import Chart from '../charts/Chart'
import { Color } from '../../utils/Utils'
const api = require('../../api/Api')

class ChartCard extends Component {

  constructor(){
    super();
    let today = new Date()
    let yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    this.state = {
      chartData: [{
          datasets: [{}],
          label: ""
      }],
      chartData1: [{
        datasets: [{}],
        label: ""
      }],
      fromDate: yesterday,
      toDate: today,
      title: "Cargando...",
      chartIcon: "fas fa-spinner"
    }
  }

  static defaultProps = {
      chartData: [{}],
      sensorIds: [1],
      locations: [{
        greenhouse: "A",
        text: "A/1/A"
      }],
      chartMeta: {
        chartTitle: "Temperatura ambiente",
        chartIcon: "fas fa-thermometer-half",
        yMax: null,
        yMin: null,
        yUnit: '°C'
      }
  }

  componentDidMount() {
    this.updateChart()
  }

  handleChange(date, isFromDate) {
    let fromDate = this.state.fromDate
    let toDate = this.state.toDate
    if(isFromDate) fromDate = date
    else toDate = date
    this.setState({
      fromDate: fromDate,
      toDate: toDate
    });
  }

  updateChart() {
    this.getChartData()
  }

  getChartData() {
    let that = this;
    let params = new URLSearchParams("")
    for(let sensorId of this.props.sensorIds)
      params.append("sensorIds", sensorId)
    for(let location of this.props.locations)
      params.append("greenhouses", location.greenhouse)
    params.append("fromDate", getStringFromDate(this.state.fromDate))
    params.append("toDate", getStringFromDate(this.state.toDate))

    api.getDataFromServer(params)
      .then(function(json) {
        let dataSet = []
        let title = "Cargando..."
        title = that.props.chartMeta.chartTitle
        for (let obj of json.data) 
          dataSet.push({ x: getDateFromString(obj.date), y: obj.value })
        that.setState({
          chartData: {
            datasets:[{
              label: "Promedio de " + title.toLowerCase(),
              fill: true,
              borderWidth: 1,
              lineTension: 0,
              spanGaps: false,
              borderColor: Color.darkGreen(),
              backgroundColor: Color.darkGreen(0.2),
              pointRadius: false,
              pointHoverRadius: 7,
              data:dataSet
            }]
          },
          title: title,
          yMax: that.props.chartMeta.yMax,
          yMin: that.props.chartMeta.yMin,
          yUnit: that.props.chartMeta.yUnit,
          chartIcon: that.props.chartMeta.chartIcon
        }) 
      })
      .catch(err => console.log(err))
      
  }
 
  render() {
    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
      <button variant="outline-primary" size="xs" className="example-custom-input card-button" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));

    return (
      <Card>
        <Card.Header>
          <Card.Title>
            <i className={this.state.chartIcon + " mr-1 card-icon"} /> {this.state.title}
          </Card.Title>
          <div className="card-tools">
            <ul className="nav nav-pills ml-auto">
              <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                <DatePicker className="nav-link" selected={this.state.fromDate} selectsStart timeInterval="10"
                 onChange={(date) => this.handleChange(date, true)} timeInputLabel="Hora:" dateFormat="dd/MM/yyyy HH:mm" timeFormat="HH:mm" 
                 showTimeSelect startDate={this.state.fromDate} endDate={this.state.toDate} maxDate={new Date()} 
                 customInput={<ExampleCustomInput/>}/>                
              </li>
              <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                <DatePicker className="nav-link" selected={this.state.toDate} selectsEnd
                  onChange={(date) => this.handleChange(date, false)} timeInputLabel="Hora:" dateFormat="dd/MM/yyyy HH:mm" timeFormat="HH:mm" 
                  showTimeSelect startDate={this.state.fromDate} endDate={this.state.toDate} maxDate={new Date()} minDate={this.state.fromDate} 
                  customInput={<ExampleCustomInput />}/>
              </li>
              <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                <button className={'card-button-filled'} variant="info" size="xs" onClick={this.updateChart.bind(this)} id={'updateButton'}>Actualizar</button>
              </li>
            </ul>
          </div>
        </Card.Header>
        <Card.Body >
          <div className="tab-content p-0" >
            <Chart chartData={this.state.chartData} height={300} yUnit={this.state.yUnit} yMax={this.state.yMax} yMin={this.state.yMin}/>
          </div>
        </Card.Body>
      </Card>
    );
  }

}

function getDateFromString(dateString) {
  let dateTime = dateString.split(" ")
  let date = dateTime[0].split("/")    // [0]dia [1]mes  [2]año
  let time = dateTime[1].split(":")    // [0]hr  [1]min  [2]seg
  return new Date(date[2], date[1]-1, date[0], time[0], time[1], time[2])
}

function getStringFromDate(date) {
  if (date == null) return getStringFromDate(new Date())
  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

export default ChartCard;