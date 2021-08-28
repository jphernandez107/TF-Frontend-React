import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
// import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
// import url('https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.8.0/react-datepicker.min.css');

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


import Chart from '../charts/Chart'

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
    this.getChartData()
  }

  static defaultProps = {
      chartData: [{}],
      cardTitle: "Temperatura ambiente"
  }

  // componentDidMount() {
  //   console.log("Callinnngggg")
  //   this.getChartData()
  // }

  handleChange(date, isFrom = true) {
    //const [fromDate, toDate] = dates
    console.log(date)
    if(isFrom) {
      this.setState({
        fromDate: date
      });
    } else {
      console.log("hola")
      this.setState({
        toDate: date
      });
    }
    this.getChartData()
  }

  getChartData() {
    var that = this;
    var params = new URLSearchParams("")
    params.append("locationIds", "1")
    params.append("fromDate", getStringFromDate(this.state.fromDate))
    params.append("toDate", getStringFromDate(this.state.toDate))
    console.log(this.state.toDate)

    getDataFromServer("ambient-temperature/filter", params)
      .then(function(json) {
        var dataSet = []
        for (var obj of json) 
          dataSet.push({ x: getDateFromString(obj.created_date), y: obj.value })
        that.setState({
          chartData: {
            datasets:[{
              label: getStringFromDate(that.state.fromDate) + " - " + getStringFromDate(that.state.toDate),
              fill: true,
              borderWidth: 2,
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

    // params.delete("locationIds")
    // params.append("locationIds", "2")
    // // params.append("toDate", "17/8/2021 00:00:00")
    // getDataFromServer("soil-humidity/filter", params)
    //   .then(function(json) {
    //     var dataSet = []
    //     for (var obj of json) 
    //       dataSet.push({ x: getDateFromString(obj.created_date), y: obj.value })
    //     let chartData = {
    //       datasets:[{
    //         label: "Temperatura ambiente 2",
    //         fill: true,
    //         borderWidth: 2,
    //         lineTension: 0,
    //         spanGaps: false,
    //         borderColor: '#00ff00',
    //         pointRadius: false,
    //         pointHoverRadius: 7,
    //         pointColor: '#efefef',
    //         pointBackgroundColor: '#efefef',
    //         data:dataSet
    //       }]
    //     }
    //     let data = that.state.chartData.datasets.concat(chartData.datasets)
    //     that.setState({
    //       chartData1: {
    //         datasets: data
    //       }
    //     }) 
    //     console.log(that.state.chartData.datasets)
    //   })
    //   .catch(err => console.log(err)) 
      
  }
 
  render() {
    return (
      <Card>
        <Card.Header className="ui-sortable-handle" style={{cursor: 'move'}}>
          <Card.Title>
            <h3>
              <i className="fas fa-temperature-low mr-1" /> {this.props.cardTitle}
            </h3>
          </Card.Title>
          <div className="card-tools">
            <ul className="nav nav-pills ml-auto">
              <li className="nav-item">
                {/* <DatePicker className="nav-link" selected={this.state.fromDate} selectsStart
                 onChange={(date) => this.handleChange(date, true)} timeInputLabel="Hora:" dateFormat="dd/MM/yyyy hh:mm" showTimeInput
                 startDate={this.state.fromDate}
                 endDate={this.state.toDate}/>
                <DatePicker className="nav-link" selected={this.state.toDate} selectsEnd
                 onChange={(date) => this.handleChange(date, false)} timeInputLabel="Hora:" dateFormat="dd/MM/yyyy hh:mm" showTimeInput
                 startDate={this.state.fromDate}
                 endDate={this.state.toDate}
                 minDate={this.state.fromDate}/> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker value={this.state.fromDate} onChange={(date) => this.handleChange(date, true)} variant="inline"/>
                  <DateTimePicker value={this.state.toDate} onChange={(date) => this.handleChange(date, false)} variant="inline"/>
                </MuiPickersUtilsProvider>
              </li>
            </ul>
          </div>
        </Card.Header>
        <Card.Body >
          <div className="tab-content p-0" >
            <div className="chart tab-pane active" id="revenue-chart">
              <Chart chartData={this.state.chartData} height={300}/>
            </div>
            <div className="chart tab-pane" id="sales-chart">
              <Chart chartData={this.state.chartData} height={300}/>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

}

function getDataFromServer(url = "", filterParams = null) {
  console.log('http://192.168.0.92:5000/' + url + '?' + filterParams.toString())
  return fetch('http://192.168.0.92:5000/' + url + '?' + filterParams.toString())
    .then(response => response.json())
    .catch(err => console.log(err))
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