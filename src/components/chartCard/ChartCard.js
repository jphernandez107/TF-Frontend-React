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
    console.log("Constructor")
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
      toDate: today
    }
  }

  static defaultProps = {
      chartData: [{}],
      cardTitle: "Temperatura ambiente",
      location: {
        id: 1,
        text: "A/1/A"
      }
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
    params.append("locationIds", this.props.location.id)
    params.append("fromDate", getStringFromDate(this.state.fromDate))
    params.append("toDate", getStringFromDate(this.state.toDate))
    console.log(this.state.toDate)

    api.getDataFromServer("ambient-temperature/filter", params)
      .then(function(json) {
        var dataSet = []
        for (var obj of json) 
          dataSet.push({ x: getDateFromString(obj.created_date), y: obj.value })
        that.setState({
          chartData: {
            datasets:[{
              label: that.props.cardTitle + " en " + that.props.location.text,
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
          }
        }) 
        console.log(that.state.chartData)
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
            <i className="fas fa-temperature-low mr-1" /> {this.props.cardTitle}
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
            <Chart chartData={this.state.chartData} height={300}/>
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