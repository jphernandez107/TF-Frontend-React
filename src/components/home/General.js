import React, { Component } from 'react';

import SmallCard from '../cards/SmallCard';
import Section from '../helpers/Section';
import HeaderBody from './HeaderBody';

const api = require('../../api/Api')

class General extends Component {

    constructor(props) {
        super(props);
        this.state = {
            greenhouses: []
        }
    }

    componentDidMount() {
        getGreenhouses(this)
    }

    static defaultProps = {
        greenhouses: [
            {
                id: "A",
                name: "Invernadero A"
            },
            {
                id: "B",
                name: "Invernadero B"
            }
        ]
    }

    render() {
        return(
            <>
                <HeaderBody /> 
                <section className="content">
                    <div className="container-fluid">
                        <div className="col">
                            {getSectionsPerGreenhouse(this.state.greenhouses)}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

function getGreenhouses(that) {
    api.getGreenhouses()
    .then(function(json) {
        var ghs = []
        var greenhouses = that.state.greenhouses
        for (var gh of json) {
            if (greenhouses && greenhouses.length > 0) {
                for (var localGh of greenhouses) {
                    if (gh.greenhouse === localGh.id) {
                        ghs.push({
                            id:gh.greenhouse, 
                            name: "Invernadero " + gh.greenhouse,
                            href: "/greenhouse-" + gh.greenhouse,
                            sensors: localGh.sensors
                        })
                    }
                }
            } else {
                ghs.push({
                    id:gh.greenhouse, 
                    name: "Invernadero " + gh.greenhouse,
                    href: "/greenhouse-" + gh.greenhouse,
                    sensors: []
                })
            }
        }

        that.setState({
            greenhouses: ghs
        })

        var params = new URLSearchParams("");
        for (var g of ghs) {
            api.getRealTimeData([g.id], null, null, params)
            .then(function(json) {
                for (var s of json) {
                    for (var ghy of ghs) {
                        if(ghy.id === s.greenhouse) ghy.sensors.push(s)
                    }
                }
                that.setState({
                    greenhouses: ghs
                })
            })
        }
    })
    .catch(err => console.log(err))
    
}

function getSectionsPerGreenhouse(greenhouses) {
    var sections =[]
    var widthSection = Math.floor(12/greenhouses.length)
    for (var gh of greenhouses) {
        sections.push(
            <div className="row" key={gh.id}>
                <div className="col">
                    <div className="row" key={gh.id + "-title"}>
                        <h3 className="mb-2 mt-4">{gh.name}</h3>
                    </div>
                    <div className="row" key={gh.id + "-content"}>
                        {getSmallCards(gh)}
                    </div>
                </div>
            </div>
        )
    }

    return sections
}

function getSmallCards(greenhouse) {
    var smallCards = []

    if (greenhouse.sensors && greenhouse.sensors.length > 0) {
        for (var sensor of greenhouse.sensors) {
            let cardStyle = getCustomSmallCard(sensor, greenhouse.href)
            smallCards.push(<SmallCard cardStyle={cardStyle} key={sensor.sensor + greenhouse.id} />)
        }
    }

    return smallCards
}

function getCustomSmallCard(sensor, href) {
    if(sensor.sensor == "lux") {
        if (sensor.value > 150) {
            // Dia
            return dayLuxStyle(sensor.value, href)
        } else {
            // Noche
            return nightLuxStyle(sensor.value, href)
        }
    } else if (sensor.sensor == "room_temperature") {
        return ambientTempStyle(sensor.value, href)
    } else if (sensor.sensor == "room_humidity") {
        return ambientHumStyle(sensor.value, href)
    } else if (sensor.sensor == "soil_humidity") {
        return soilHumStyle(sensor.value, href)
    }
    return ambientTempStyle(sensor.value, href)
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
        color: "bg-orange"
    }
}

const ambientHumStyle = (value, href) => {
    return {
        cardTitle: "Humedad ambiente",
        value: value,
        unit: "%",
        icon: "fas fa-tint",
        detailsSection: {
            show: true,
            title: "Detalles",
            href: href
        },
        size:"4",
        color: "bg-lightblue"
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
