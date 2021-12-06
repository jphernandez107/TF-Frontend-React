import React, { Component } from 'react';

import SmallCard from '../../cards/SmallCard';
import HeaderBody from '../HeaderBody';

const api = require('../../../api/Api')

class General extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realTimeSensors: []
        }
    }

    componentDidMount() {
        getRealTimeData(this)
    }

    static defaultProps = {
        greenhouses: []
    }

    render() {
        return(
            <>
                <HeaderBody greenhouse={`Tablero`}/> 
                <section className="content">
                    <div className="container-fluid">
                        <div className="col">
                            {getSectionsPerGreenhouse(this.props.greenhouses, this.state.realTimeSensors)}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

function getRealTimeData(that) {
    api.getRealTimeData(null, null, null, null)
    .then(function(json) {
        that.setState({
            realTimeSensors: json
        })
    })
}

function getSectionsPerGreenhouse(greenhouses, realTimeSensors) {
    let sections =[]
    for (let gh of greenhouses) {
        let realTimeSensorsByGreenhouse = realTimeSensors.filter(rtSensor => rtSensor.greenhouse === gh.greenhouse)
        if (realTimeSensorsByGreenhouse.length > 0){
            sections.push(
                <div className="row" key={gh.id}>
                    <div className="col">
                        <div className="row" key={gh.id + "-title"}>
                            <h3 className="mb-2 mt-4">{gh.name}</h3>
                        </div>
                        <div className="row" key={gh.id + "-content"}>
                            {getSmallCards(gh, realTimeSensorsByGreenhouse)}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return sections
}

function getSmallCards(greenhouse, realTimeSensorsByGreenhouse) {
    let smallCards = []
    if (greenhouse.sensorIds && greenhouse.sensorIds.length > 0) {
        for (let sensorId of greenhouse.sensorIds) {
            let realTimeSensor = realTimeSensorsByGreenhouse.find(sensor => sensor.sensorId === sensorId)
            let cardStyle = getCustomSmallCard(realTimeSensor, greenhouse.href)
            smallCards.push(<SmallCard cardStyle={cardStyle} key={`sensor-${sensorId}-loc-${greenhouse.id}`} />)
        }
    }

    return smallCards
}

function getCustomSmallCard(realTimeSensor, href) {
    switch(realTimeSensor.sensorId) {
        case 1:
            return ambientTempStyle(realTimeSensor.value, href)
        case 2:
            return ambientHumStyle(realTimeSensor.value, href)
        case 3:
            if (realTimeSensor.value > 150) return dayLuxStyle(realTimeSensor.value, href) // Day
            else return nightLuxStyle(realTimeSensor.value, href) // Night
        default:
            return soilHumStyle(realTimeSensor.value, href)
    }
}


const dayLuxStyle = (value, href) => {
    return {
        cardTitle: "Intensidad de luz",
        value: value,
        unit: "lux",
        icon: "fas fa-sun",
        detailsSection: {
            show: true,
            title: "Detalles",
            href: href
        },
        size:"4",
        color: "bg-warning"
    }
}

const nightLuxStyle = (value, href) => {
    return {
        cardTitle: "Intensidad de luz",
        value: value,
        unit: "lux",
        icon: "fas fa-moon",
        detailsSection: {
            show: true,
            title: "Detalles",
            href: href
        },
        size:"4",
        color: "bg-gray"
    }
}

const ambientTempStyle = (value, href) => {
    return {
        cardTitle: "Temperatura ambiente",
        value: value,
        unit: "°C",
        icon: "fas fa-thermometer-half",
        detailsSection: {
            show: true,
            title: "Detalles",
            href: href
        },
        size:"4",
        color: "bg-olive"
    }
}

const ambientHumStyle = (value, href) => {
    return {
        cardTitle: "Humedad ambiente",
        value: value,
        unit: "%",
        icon: "fas fa-humidity",
        detailsSection: {
            show: true,
            title: "Detalles",
            href: href
        },
        size:"4",
        color: "bg-olive"
    }
}

const soilHumStyle = (value, href) => {
    return {
        cardTitle: "Humedad de suelo",
        value: value,
        unit: "%",
        icon: "fas fa-seedling",
        detailsSection: {
            show: true,
            title: "Detalles",
            href: href
        },
        size:"4",
        color: "bg-olive"
    }
}

export default General;
