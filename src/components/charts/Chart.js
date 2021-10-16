import React from 'react';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';

class Chart extends React.Component {

    constructor() {
        super()
        this.scales = {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    stepSize: 3,
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
                    callback: null
                },
                gridLines: {
                    display: true,
                    color: '#ff0000',
                    drawBorder: false
                }
            }
        }
    }

    static defaultProps = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false
        },
        yUnit: "°C"
        
    }
 
    render() {
        if(this.props.chartData != null && this.props.chartData.datasets != null && this.props.chartData.datasets[0] != null) {
            let aprox = getBestAproximation(this.props.chartData.datasets[0].data)
            this.scales.x.time.unit = aprox.time.unit
            this.scales.x.time.stepSize = aprox.time.stepSize
            this.scales.y.ticks.callback = yU(this.props.yUnit)
        }
        this.scales.y.suggestedMax = this.props.yMax
        this.scales.y.suggestedMin = this.props.yMin

        return (
            <div>
                <Line 
                    data = {this.props.chartData}
                    options = {{
                        maintainAspectRatio: this.props.maintainAspectRatio,
                        responsive: this.props.responsive,
                        legend: this.props.legend,
                        scales: this.scales
                    }}
                    height = {this.props.height}
                />
            </div>
        );
    }

}

const yU = (yUnit) => {
    return (value, index, values) => {
        return value + yUnit;
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
    for (let obj of data) {
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
    } else if (days.length > 2){ // hourly
        return {time:{unit:'hour', stepSize: 3}}
    } else {
        return {time:{unit:'hour', stepSize: 1}}
    }

}

export default Chart;