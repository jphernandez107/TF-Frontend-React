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
                <HeaderBody greenhouse = {"General"}/> 
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
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
            if (greenhouses != undefined && greenhouses.length > 0) {
                for (var localGh of greenhouses) {
                    if (gh.greenhouse == localGh.id) {
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
                    href: "/greenhouse-" + gh.greenhouse
                })
            }
        }

        that.setState({
            greenhouses: ghs
        })
    })
    .catch(err => console.log(err))

    var params = new URLSearchParams("");
    params.append("locationIds", "2");

    api.getRealTimeData(null, null, null, params)
    .then(function(json) {
        let greenhouses = that.state.greenhouses
        greenhouses[0].sensors = json
        that.setState({
            greenhouses: greenhouses
        })
    })
}

function getSectionsPerGreenhouse(greenhouses) {
    var sections =[]
    var widthSection = Math.floor(12/greenhouses.length)
    for (var gh of greenhouses) {
        sections.push(
            <Section size={widthSection} key={gh.id}>
                <div className="col ">
                    <div className="row d-flex justify-content-center">
                        <h3 className="mb-2 mt-4">{gh.name}</h3>
                    </div>
                    <div className="row">
                        {getSmallCards(gh)}
                    </div>
                </div>
            </Section>
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
        size:"6",
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
        size:"6",
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
        size:"6",
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
        size:"6",
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
        size:"6",
        color: "bg-olive"
    }
}

export default General;
