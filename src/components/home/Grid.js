import React from 'react';

import ChartCard from '../chartCard/ChartCard';
import HeaderBody from '../home/HeaderBody';
import Section from '../helpers/Section';
import LocationMap from '../locationMap/LocationMap';

class Grid extends React.Component {
 
    render() {
        return ( 
            <>
                <HeaderBody greenhouse = {this.props.greenhouse.name}/> 
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {getSectionCharts(this.props.greenhouse)}
                        </div>
                        <div className="row">
                            <Section size = {12}>
                                <LocationMap greenhouse={this.props.greenhouse}/>
                            </Section>
                        </div>
                    </div>
                </section>
            </>
        )
    }
   
}

function getSectionCharts(location) {
    if (location.sensorIds && location.sensorIds.length > 1) {
        return (
            <>
                <Section size = {6}>
                    { getChart(0, location) }
                </Section>
                <Section size = {6}> 
                    { getChart(1, location) }
                </Section>
            </>
        )
    } else {
        return (
            <Section size = {12}>
                { getChart(0, location) }
            </Section>
        )
    }
}

function getChart(section, location) {
    let sensorIds = location.sensorIds
    let charts = []
    for (let i=section; sensorIds && i<sensorIds.length; i+=2) {
        charts.push(<ChartCard key={`chart-${sensorIds[i]}`} sensorIds={[sensorIds[i]]} chartMeta={getChartMeta(sensorIds[i])} location={[{greenhouse: location.greenhouse}]}/>)
    }
    return (charts)
}

function getChartMeta(sensorId) {
    switch(sensorId) {
        case 1:
            return ambientTempMeta()
        case 2:
            return ambientHumMeta()
        case 3:
            return luxMeta()
        default:
            return soilHumMeta()
    }
}


const luxMeta = () => {
    return {
        chartTitle: "Intensidad de luz",
        yUnit: "lux",
        chartIcon: "fas fa-sun",
        yMax: null,
        yMin: null
    }
}

const ambientTempMeta = () => {
    return {
        chartTitle: "Temperatura ambiente",
        yUnit: "°C",
        chartIcon: "fas fa-thermometer-half",
        yMax: null,
        yMin: null
    }
}

const ambientHumMeta = () => {
    return {
        chartTitle: "Humedad ambiente",
        yUnit: "%",
        chartIcon: "fas fa-humidity",
        yMax: 100,
        yMin: 0
    }
}

const soilHumMeta = () => {
    return {
        chartTitle: "Humedad de suelo",
        yUnit: "%",
        chartIcon: "fas fa-seedling",
        yMax: 100,
        yMin: 0
    }
}
   
export default Grid;