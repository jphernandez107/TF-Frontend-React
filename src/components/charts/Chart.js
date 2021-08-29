import React from 'react';
import 'chartjs-adapter-date-fns';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends React.Component {

    static defaultProps = {
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
                    stepSize: 3,
                    tooltipFormat: 'DD/MM/YYYY HH:mm',
                    displayFormat: {
                        day: "DD MMM",
                        hour: "HH"
                    }
                },
                ticks: {
                    major: {
                        enabled: true,
                        fontStyle: 'bold',
                        fontSize: 14 
                    },
                    fontColor: '#ff0000',
                    autoSkip: true
                }
            },
            y: {
                ticks: {
                    fontColor: '#ff0000',
                    suggestedMin: 0,
                    suggestedMax: 30,
                    callback: function(value, index, values) {
                        return value + '°C';
                    }
                },
                gridLines: {
                    display: true,
                    color: '#ff0000',
                    drawBorder: false
                }
            }
        }
    }
 
    render() {
        if(this.props.chartData != null && this.props.chartData.datasets != null && this.props.chartData.datasets[0] != null) {
            let aprox = getBestAproximation(this.props.chartData.datasets[0].data)
            this.props.scales.x.time.unit = aprox.time.unit
            this.props.scales.x.time.stepSize = aprox.time.stepSize
        }
        return (
            <div>
                <Line 
                    data = {this.props.chartData}
                    options = {{
                        maintainAspectRatio: this.props.maintainAspectRatio,
                        responsive: this.props.responsive,
                        legend: this.props.legend,
                        scales: this.props.scales
                    }}
                    height = {this.props.height}
                />
            </div>
        );
    }

}

/**
 * 
 * @param {array of jsons} data -> Data to be examinated
 * @returns String time unit for chart x axis
 */

function getBestAproximation(data) {
    let years = []
    let months = []
    let days = []
    let hours = []
    console.log(data)
    for (var obj of data) {
        let date = new Date(obj.x)
        if(!years.some(i => i === date.getFullYear())) years.push(date.getFullYear())
        if(!months.some(i => i === date.getMonth())) months.push(date.getMonth())
        if(!days.some(i => i === date.getDate())) days.push(date.getDate())
        if(!hours.some(i => i === date.getHours())) hours.push(date.getHours())
    }

    if (years.length > 2) { // yearly
        return {time:{unit:'year', stepSize: 1}}
    } else if (months.length > 4) { // monthly
        return {time:{unit:'month', stepSize: 1}}
    } else if (days.length > 4) { // daily
        return {time:{unit:'day', stepSize: 1}}
    } else { // hourly
        return {time:{unit:'hour', stepSize: 3}}
    }

}

export default Chart;