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
                    unit: 'hour',
                    round: 'minutes',
                    displayFormat: {
                    day: "MMM DD"
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
        console.log("Esto es chart.js")
        console.log(this.props.chartData)
        return (
            <div className="chart">
                <Line 
                    data = {this.props.chartData}
                    options = {{
                        maintainAspectRatio: this.props.maintainAspectRatio,
                        responsive: this.props.responsive,
                        legend: this.props.legend,
                        scales: this.props.scales
                    }}
                />
            </div>
        );
    }

}

export default Chart;