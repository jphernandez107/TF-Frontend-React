import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Utils from '../../utils/Utils';

import { Dropdown, DropdownButton } from 'react-bootstrap'

class LocationMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            greenhouse: {}
        }
    }

    componentDidMount() {

    }

    static defaultProps = {
        greenhouse: {greenhouse:"A",sections:[
            {section:"01",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"02",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"}]},
            {section:"03",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"04",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"05",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"06",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"07",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"08",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"09",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
            {section:"10",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]}
        ],
        name:"Invernadero A",
        href:"/greenhouse-a",
        id:"A"}
    }

    render() {
        const greenhouse = this.props.greenhouse
        const sensorDetail = Utils.getSensorDetailsById(this.state.sensorSelected)

        const onClick = (e) => {
            let sensorId = e.target.value
            this.setState({
                sensorSelected: sensorId
            })
        }

        return(
            <Card className="m-3">
                <Card.Header className="ui-sortable-handle" style={{cursor: 'move'}}>
                    <Card.Title>
                        <i className={"far fa-map mr-1"} /> {greenhouse.name}
                    </Card.Title>
                    <div className="card-tools">
                        <ul className="nav nav-pills ml-auto">
                        <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>

                        </li>
                        <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                            <DropdownButton title={sensorDetail.title}>
                                {getDropdownOptions(onClick, greenhouse.sensorIds)}
                            </DropdownButton>
                        </li>
                        </ul>
                    </div>
                </Card.Header>
                <Card.Body >
                    <div className="tab-content p-0" >
                        {map(greenhouse, parseInt(this.state.sensorSelected))}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

function map(greenhouse, sensorSelected) {
    return (getSectionsRect(greenhouse, sensorSelected))
}

function getSectionsRect(greenhouse, sensorSelected) {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">  
                {
                    greenhouse.sections.map((section) => {
                        return getSectionRect(section, sensorSelected)
                    })
                }
            </div>
        </div>
    )
}

function getSectionRect(section, sensorSelected) {
    return (
        <div className="d-flex flex-column map-section-col-container" key={`section-${section.section}`}>     
            <div className="row d-flex justify-content-center map-section-title-container">
                <h5><span className="badge map-section-title">{`Fila ${parseInt(section.section)}`}</span></h5>
            </div>
            <div className="row justify-content-center">
                <div className="d-flex flex-column">
                    {
                        section.sectors.map((sector) => {
                            return getSectorRect(sector, sensorSelected)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function getSectorRect(sector, sensorSelected) {
    sensorSelected = sensorSelected ? sensorSelected : 1
    let text = getTextFromSensor(sector.sensors, sensorSelected)

    return (
        <div 
        className={"sector-cell"}
        key={`sector-cell-${sector.sector}`}>
            <span className="map-sector-name">{sector.sector}</span>
            <span className="map-sector-value">{text}</span>
        </div>
    )
}

function getDropdownOptions(onClick, sensorIds) {
    return (
        <>
            <Dropdown.Header>Elija un sensor para mostrar</Dropdown.Header>
            <Dropdown.Divider />
            {getDropdownSensorItems(onClick, sensorIds)}
        </>
    )
}

function getDropdownSensorItems(onClick, sensorIds) {
    sensorIds = sensorIds ? sensorIds : []
    let items = []
    for (let sensorId of sensorIds) {
        const sensorDetail = Utils.getSensorDetailsById(sensorId)
        items.push(
            <Dropdown.Item as="button" onClick={onClick} value={sensorId} key={`dropdown-${sensorId}`}>
                <i className={sensorDetail.icon + " mr-2"} />{sensorDetail.title}
            </Dropdown.Item>
        )
    }
    return (items)
}

function getTextFromSensor(sensors, sensorSelected) {
    let sensor = sensors ? sensors.find((sensor) => sensor.id === sensorSelected) : undefined
    let value = sensor ? sensor.value : getRandomInt(0, 50)

    let unit = Utils.getSensorDetailsById(sensorSelected).unit
    return `${parseInt(value)}${unit}`
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default LocationMap;