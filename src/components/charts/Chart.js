import React from 'react';
import 'chartjs-adapter-date-fns';
import {Bar, Line, Pie} from 'react-chartjs-2';
import hoursToMilliseconds from 'date-fns/esm/hoursToMilliseconds';

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
                    displayFormat: {
                        day: "DD MMM",
                        hour: "hh"
                    }
                },
                ticks: {
                    fontColor: '#ff0000',
                    autoSkip: true
                }
            },
            y: {
                ticks: {
                    fontColor: '#ff0000',
                    suggestedMin: 0,
                    suggestedMax: 30
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
        if(this.props.chartData != null && this.props.chartData.datasets != null && this.props.chartData.datasets[0] != null)
            this.props.scales.x.time.unit = getBestAproximation(this.props.chartData.datasets[0].data)
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
        return 'year'
    } else if (months.length > 4) { // monthly
        return 'month'
    } else if (days.length > 4) { // daily
        return 'day'
    } else { // hourly
        return 'hour'
    }

}

export default Chart;