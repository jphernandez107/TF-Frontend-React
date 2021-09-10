import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import { Button, Row, InputGroup, FormControl } from 'react-bootstrap'

import Chart from '../charts/Chart'
const api = require('../../api/Api')

class ChartCard extends Component {

  constructor(){
    super();
    let today = new Date()
    var yesterday = new Date()
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
      cardTitle: "Temperatura ambiente",
      locations: [{
        greenhouse: "A",
        text: "A/1/A"
      }],
      apiUrl: "ambient-temperature/filter",
      yUnit: "°C"
  }

  componentDidMount() {
    this.updateChart()
  }

  handleChange(dates) {
    const [fromDate, toDate] = dates;
    console.log(dates)
    this.setState({
      fromDate: fromDate,
      toDate: toDate
    });
    
  }

  updateChart() {
    this.getChartData()
  }

  getChartData() {
    var that = this;
    var params = new URLSearchParams("")
    for(var location of this.props.locations)
      params.append("greenhouses", location.greenhouse)
    params.append("fromDate", getStringFromDate(this.state.fromDate))
    params.append("toDate", getStringFromDate(this.state.toDate))

    api.getDataFromServer(this.props.apiUrl, params)
      .then(function(json) {
        var dataSet = []
        let title = "Cargando..."
        if(json.title) title = json.title
        for (var obj of json.data) 
          dataSet.push({ x: getDateFromString(obj.date), y: obj.value })
        that.setState({
          chartData: {
            datasets:[{
              label: "Promedio de " + title.toLowerCase(),
              fill: true,
              borderWidth: 1,
              lineTension: 0,
              spanGaps: false,
              borderColor: '#ff0000',
              pointRadius: false,
              pointHoverRadius: 7,
              pointColor: '#efefef',
              pointBackgroundColor: '#efefef',
              data:dataSet
            }]
          },
          title: title,
          yMax: json.max,
          yMin: json.min,
          yUnit: json.unit,
          chartIcon: json.chartIcon
        }) 
      })
      .catch(err => console.log(err))
      
  }
 
  render() {
    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
      <Button variant="outline-primary" size="xs" className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
      </Button>
    ));

    return (
      <Card>
        <Card.Header className="ui-sortable-handle" style={{cursor: 'move'}}>
          <Card.Title>
            <i className={this.state.chartIcon + " mr-1"} /> {this.state.title}
          </Card.Title>
          <div className="card-tools">
            <ul className="nav nav-pills ml-auto">
              <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                <DatePicker className="nav-link" selected={this.state.fromDate} selectsRange timeInterval="10"
                 onChange={(dates) => this.handleChange(dates)} timeInputLabel="Hora:" dateFormat="dd/MM/yyyy HH:mm" timeFormat="HH:mm" showTimeSelect
                 startDate={this.state.fromDate} endDate={this.state.toDate} customInput={<ExampleCustomInput/>}/>                
              </li>
              {/* TODO: DatePicker <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
              <DatePicker className="nav-link" selected={this.state.toDate} selectsEnd
                 onChange={(date) => this.handleChange(date, false)} timeInputLabel="Hora:" dateFormat="dd/MM/yyyy hh:mm" showTimeInput
                 startDate={this.state.fromDate} endDate={this.state.toDate}  minDate={this.state.fromDate} customInput={<ExampleCustomInput />}/>
              </li> */}
              <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                <Button variant="info" size="xs" onClick={this.updateChart.bind(this)}>Actualizar</Button>
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
  var dateTime = dateString.split(" ")
  var date = dateTime[0].split("/")    // [0]dia [1]mes  [2]año
  var time = dateTime[1].split(":")    // [0]hr  [1]min  [2]seg
  return new Date(date[2], date[1]-1, date[0], time[0], time[1], time[2])
}

function getStringFromDate(date) {
  if (date == null) return getStringFromDate(new Date())
  return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

export default ChartCard;