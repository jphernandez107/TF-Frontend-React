import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import SmallCard from '../cards/SmallCard';
import Section from '../helpers/Section';
import HeaderBody from './HeaderBody';

import { Dropdown, DropdownButton } from 'react-bootstrap'

const api = require('../../api/Api')

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
        console.log(greenhouse)

        const onClick = (e) => {
            console.log(e.target.value)

            this.setState({
                greenhouse: greenhouse
            })
        }

        return(
            <Card className="m-3">
                <Card.Header className="ui-sortable-handle" style={{cursor: 'move'}}>
                    <Card.Title>
                        <i className={this.state.chartIcon + " mr-1"} /> {greenhouse.name}
                    </Card.Title>
                    <div className="card-tools">
                        <ul className="nav nav-pills ml-auto">
                        <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>

                        </li>
                        <li className="nav-item" style={{'marginLeft': '0.2em', 'marginRight': '0.2em'}}>
                            <DropdownButton title={"Sensor"}>
                                {getDropdownOptions(onClick)}
                            </DropdownButton>
                        </li>
                        </ul>
                    </div>
                </Card.Header>
                <Card.Body >
                    <div className="tab-content p-0" >
                        {map(greenhouse)}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}


function map(greenhouse) {
    return (getSectionsRect(greenhouse))
}

function getSectionsRect(greenhouse) {

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">  
                {
                    greenhouse.sections.map((section) => {
                        return getSectionRect(section)
                    })
                }
            </div>
        </div>
    )
}

function getSectionRect(section) {
    return (
        <div className="d-flex flex-column map-section-col-container" key={`section-${section.section}`}>     
            <div className="row d-flex justify-content-center map-section-title-container">
                <h5><span className="badge map-section-title">{`Fila ${parseInt(section.section)}`}</span></h5>
            </div>
            <div className="row justify-content-center">
                <div className="d-flex flex-column">
                    {
                        section.sectors.map((sector) => {
                            return getSectorRect(sector)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function getSectorRect(sector) {
    let text = sector.text ? sector.text : "X%"

    return (
        <div 
        className={"sector-cell"}
        key={`sector-cell-${sector.sector}`}>
            <span className="map-sector-name">{sector.sector}</span>
            <span className="map-sector-value">{text}</span>
        </div>
    )
}

function getDropdownOptions(onClick) {
    // TODO: Traer los sensores que tiene disponible este invernadero y listarlos aquí
    let temp = getRandomInt(3, 29)
    let hum = getRandomInt(1, 100)
    let hum2 = getRandomInt(3, 100)
    let luz = getRandomInt(100, 1500)

    return (
        <>
            <Dropdown.Header>Elija un sensor para mostrar</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item as="button" onClick={onClick} value={temp + "°C"}>Temperatura ambiente</Dropdown.Item>
            <Dropdown.Item as="button" onClick={onClick} value={hum + "%"}>Humedad ambiente</Dropdown.Item>
            <Dropdown.Item as="button" onClick={onClick} value={hum2 + "%"}>Humedad de suelo</Dropdown.Item>
            <Dropdown.Item as="button" onClick={onClick} value={luz + " lux"}>Intensidad de luz</Dropdown.Item>
        </>
    )
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



export default LocationMap;