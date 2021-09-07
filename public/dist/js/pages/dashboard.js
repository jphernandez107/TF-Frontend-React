/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

/* global moment:false, Chart:false, Sparkline:false */

$(function () {
  'use strict'

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder: 'sort-highlight',
    connectWith: '.connectedSortable',
    handle: '.card-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex: 999999
  })
  $('.connectedSortable .card-header').css('cursor', 'move')

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder: 'sort-highlight',
    handle: '.handle',
    forcePlaceholderSize: true,
    zIndex: 999999
  })

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').summernote()

  $('.daterange').daterangepicker({
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate: moment()
  }, function (start, end) {
    // eslint-disable-next-line no-alert
    alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  /* jQueryKnob */
  // $('.knob').knob()

  // jvectormap data
  var visitorsData = {
    US: 398, // USA
    SA: 400, // Saudi Arabia
    CA: 1000, // Canada
    DE: 500, // Germany
    FR: 760, // France
    CN: 300, // China
    AU: 700, // Australia
    BR: 600, // Brazil
    IN: 800, // India
    GB: 320, // Great Britain
    RU: 3000 // Russia
  }
  // World map by jvectormap
  // $('#world-map').vectorMap({
  //   map: 'argentina_en',
  //   backgroundColor: 'transparent',
  //   regionStyle: {
  //     initial: {
  //       fill: 'rgba(255, 255, 255, 0.7)',
  //       'fill-opacity': 1,
  //       stroke: 'rgba(0,0,0,.2)',
  //       'stroke-width': 1,
  //       'stroke-opacity': 1
  //     }
  //   },
    // series: {
    //   regions: [{
    //     values: visitorsData,
    //     scale: ['#ffffff', '#0154ad'],
    //     normalizeFunction: 'polynomial'
    //   }]
    // },
    // onRegionLabelShow: function (e, el, code) {
    //   if (typeof visitorsData[code] !== 'undefined') {
    //     el.html(el.html() + ': ' + visitorsData[code] + ' new visitors')
    //   }
    // }
  // })

  // $('#world-map').vectorMap({
    
  // })

  // Sparkline charts
  var sparkline1 = new Sparkline($('#sparkline-1')[0], { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })
  var sparkline2 = new Sparkline($('#sparkline-2')[0], { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })
  var sparkline3 = new Sparkline($('#sparkline-3')[0], { width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9' })

  sparkline1.draw([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021])
  sparkline2.draw([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921])
  sparkline3.draw([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21])

  // The Calender
  $('#calendar').datetimepicker({
    format: 'L',
    inline: true
  })

  // SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').overlayScrollbars({
    height: '250px'
  })

  /* Chart.js Charts */
  // Sales chart
  // var salesChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d')
  // $('#revenue-chart').get(0).getContext('2d');

  var salesChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Digital Goods',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: 'Electronics',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  // eslint-disable-next-line no-unused-vars
  // var salesChart = new Chart(salesChartCanvas, { // lgtm[js/unused-local-variable]
  //   type: 'line',
  //   data: salesChartData,
  //   options: salesChartOptions
  // })

  // Donut Chart
  // var pieChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d')
  var pieData = {
    labels: [
      'Instore Sales',
      'Download Sales',
      'Mail-Order Sales'
    ],
    datasets: [
      {
        data: [30, 12, 20],
        backgroundColor: ['#f56954', '#00a65a', '#f39c12']
      }
    ]
  }
  var pieOptions = {
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true
  }
  // Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  // eslint-disable-next-line no-unused-vars
  // var pieChart = new Chart(pieChartCanvas, { // lgtm[js/unused-local-variable]
  //   type: 'doughnut',
  //   data: pieData,
  //   options: pieOptions
  // })

  // var params = new URLSearchParams("")
  // params.append("locationIds", "2")
  // params.append("fromDate", "15/8/2021 00:00:00")

  // getDataFromServer("soil-humidity/filter", params)
  //   .then(function(json) {
  //     var dataSet = []
  //     for (var obj of json) {
  //       dataSet.push({ x: getDateFromString(obj.created_date), y: obj.value })
  //     }

  //     if (chart) chart.destroy()

  //     var chart = setGraphics(salesChartCanvas, dataSet, linesGraphChartOptions, "Humedad de suelo")
  //   }, function(error) {
  //     console.log(error)
  //   })

  // Sales graph chart
  // var linesGraphChartCanvas = $('#line-chart').get(0).getContext('2d')
  // $('#revenue-chart').get(0).getContext('2d')

  $('#temp_button').on('click', function(){
    onClickTemp()
  })

})

var linesGraphChartCanvas = document.getElementById('line-chart')//$('#line-chart').get(0)//.getContext('2d')
var linesGraphChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        round: 'minutes',
        displayFormat: {
          day: "MMM DD"
        }
      },
      ticks: {
        fontColor: '#efefef',
        autoSkip: true
      },
    },
    y: {
      ticks: {
        fontColor: '#efefef',
        suggestedMin: 0,
        suggestedMax: 30
      },
      gridLines: {
        display: true,
        color: '#aaaaaa',
        drawBorder: false
      }
    }
  }
}

var myChart;

function onClickTemp(){
  var params = new URLSearchParams("")
  params.append("locationIds", "1")
  params.append("fromDate", "15/8/2021 00:00:00")
  console.log("Adnandooooo")

  getDataFromServer("ambient-temperature/filter", params)
    .then(function(json) {
      var dataSet = []
      for (obj of json) 
        dataSet.push({ x: getDateFromString(obj.created_date), y: obj.value })
        if (chart) chart.destroy()

        var chart = setGraphics(linesGraphChartCanvas, dataSet, linesGraphChartOptions, "Temperatura ambiente")
    }, function(error) {
      console.log(error)
    })
}

$('#hum_button').on('click', function(){
  var params = new URLSearchParams("")
  params.append("locationIds", "1")
  params.append("fromDate", "15/8/2021 00:00:00")

  getDataFromServer("ambient-humidity/filter", params)
    .then(function(json) {
      var dataSet = []
      for (obj of json) 
        dataSet.push({ x: getDateFromString(obj.created_date), y: obj.value })
        if (chart) chart.destroy()

        chart = setGraphics(linesGraphChartCanvas, dataSet, linesGraphChartOptions, "Humedad de suelo")
    }, function(error) {
      console.log(error)
    })
})


// function getDataFromServer(locationIds = null, fromDate = null, toDate = null, fromValue = null, toValue = null, chartOpts, chartCanvasId) {
function getDataFromServer(url = "", filterParams = null) {

  var promise = new Promise(function(resolve, reject) {
    var requestURL = 'http://192.168.0.100:5000/' + url + "?" + filterParams.toString();
    var request = new XMLHttpRequest() // create http request
    request.open('GET', requestURL)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    console.log(requestURL)
    request.onload = function() {
      if (request.status == 200) {
        resolve(JSON.parse(request.responseText))
      } else {
        reject(Error(request.statusText))
      }
      request.onerror = function() {
        reject(Error("Error fetching JSON data"))
      }
    }
    request.send() // send the request
  })

  return promise
}

function getDateFromString(dateString) {
  var dateTime = dateString.split(" ")
  var date = dateTime[0].split("/")    // [0]dia [1]mes  [2]año
  var time = dateTime[1].split(":")    // [0]hr  [1]min  [2]seg
   return new Date(date[2], date[1]-1, date[0], time[0], time[1], time[2])
}

function setGraphics(chartCanvasId, data, chartOpts, label) {

  $('#left-knob').attr('value', indexOfMin(data)[1])
  $('#center-knob').attr('value', getAverage(data))
  $('#right-knob').attr('value', indexOfMax(data)[1])
  $('.knob').knob()

  var chartData = {
    datasets: [
      {
        label: label,
        fill: true,
        borderWidth: 2,
        lineTension: 0,
        spanGaps: false,
        borderColor: '#efefef',
        pointRadius: false,
        pointHoverRadius: 7,
        pointColor: '#efefef',
        pointBackgroundColor: '#efefef',
        data: data
      }
    ]
  }

  return new Chart(chartCanvasId, {
    type: 'line',
    options: chartOpts,
    data: chartData
  })
}

function getAverage(dataArray) {
  var total = 0
  for (num of dataArray) {
    total += num.y
  }
  return total / dataArray.length
}

function indexOfMax(arr) {
  if (arr.length === 0) {
      return -1;
  }
  var max = arr[0].y;
  var maxIndex = 0;
  for (var i = 1; i < arr.length; i++) {
      if (arr[i].y > max) {
          maxIndex = i;
          max = arr[i].y;
      }
  }
  return [maxIndex, max];
}

function indexOfMin(arr) {
  if (arr.length === 0) {
      return -1;
  }

  var min = arr[0].y;
  var minIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i].y < min) {
          minIndex = i
          min = arr[i].y
      }
  }

  return [minIndex, min]
}