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
            greenhouses: [
                {greenhouse:"A",sections:[
                    {section:"01",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
                    {section:"02",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"}]},
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
                id:"A"},
                {greenhouse:"B",sections:[{section:"1",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"},{sector:"K"},{sector:"L"},{sector:"M"}]},{section:"2",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"},{sector:"K"},{sector:"L"},{sector:"M"}]},{section:"3",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"},{sector:"K"},{sector:"L"},{sector:"M"}]},{section:"4",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"},{sector:"F"},{sector:"G"},{sector:"H"},{sector:"I"},{sector:"J"},{sector:"K"},{sector:"L"},{sector:"M"}]}],name:"Invernadero B",href:"/greenhouse-b",id:"B"},{greenhouse:"C",sections:[{section:"1",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"}]},{section:"2",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"}]},{section:"3",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"}]},{section:"4",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"}]},{section:"5",sectors:[{sector:"A"},{sector:"B"},{sector:"C"},{sector:"D"},{sector:"E"}]}],name:"Invernadero C",href:"/greenhouse-c",id:"C"}
            ]
        }
    }

    componentDidMount() {

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
        const greenhouse = this.state.greenhouses[0]

        const handleMouseDown = (e) => {
            const sectorId = e.currentTarget.attrs.sector;
            const greenhouseId = e.currentTarget.attrs.greenhouse;
            const sectionId = e.currentTarget.attrs.section;

            let newSectors = this.state.greenhouses.find(g => g.id === greenhouseId).sections.find(s => s.section === sectionId).sectors.map((sector) => {                    
                let color = sector.color ? sector.color : "#cc0310"
                let width = sector.width ? sector.width : e.currentTarget.attrs.width
                let height = sector.height ? sector.height : e.currentTarget.attrs.height
                let x = sector.x ? sector.x : e.currentTarget.x()
                let y = sector.y ? sector.y : e.currentTarget.y()

                if (sector.sector === sectorId) {
                    color = "#00cc00"
                    width += 12
                    height += 12
                    x -= 6
                    y -= 12
                    return {
                        ...sector,
                        color: color,
                        width: width,
                        height: height,
                        x: x,
                        y: y
                    }
                }
                return {
                    ...sector,
                    color: color,
                    width: width,
                    height: height,
                    x: x
                }
            })

            let newSections = this.state.greenhouses.find(g => g.id === greenhouseId).sections.map((section) => {                    
                let sectors = section.sectors
                if (section.section === sectionId) sectors = newSectors
                return {
                    ...section,
                    sectors: sectors
                }
            })

            this.setState({
                greenhouses: this.state.greenhouses.map((greenhouse) => {
                    let sections = greenhouse.sections
                    if(greenhouse.id === greenhouseId) sections = newSections
                    return {
                        ...greenhouse,
                        sections: sections
                    }
                })
            });
        };
        
        const handleMouseUp = (e) => {
            const sectorId = e.currentTarget.attrs.sector;
            const greenhouseId = e.currentTarget.attrs.greenhouse;
            const sectionId = e.currentTarget.attrs.section;
            let width = e.currentTarget.attrs.width - 12;
            let height = e.currentTarget.attrs.height - 12;
            let x = e.currentTarget.x() + 6;
            
            let newSectors = this.state.greenhouses.find(g => g.id === greenhouseId).sections.find(s => s.section === sectionId).sectors.map((sector) => {                    
                let color = sector.color ? sector.color : "#00cc00"
                let y = sector.y ? sector.y : e.currentTarget.y();
                if (sector.sector === sectorId) {
                    color = "#cc0310"
                    y += 12
                    return {
                        ...sector,
                        color: color,
                        width: width,
                        height: height,
                        x: x,
                        y: y
                    }
                }
                return {
                    ...sector,
                    color: color,
                    width: width,
                    height: height,
                    x: x
                }
            })

            let newSections = this.state.greenhouses.find(g => g.id === greenhouseId).sections.map((section) => {                    
                let sectors = section.sectors
                if (section.section === sectionId) sectors = newSectors
                return {
                    ...section,
                    sectors: sectors
                }
            })

            this.setState({
                greenhouses: this.state.greenhouses.map((greenhouse) => {
                    let sections = greenhouse.sections
                    if(greenhouse.id === greenhouseId) sections = newSections
                    return {
                        ...greenhouse,
                        sections: sections
                    }
                })
            });
        };

        const onClick = (e) => {
            console.log(e.target.value)

            let greenhouses = this.state.greenhouses.map((greenhouse) => {
                return {
                    ...greenhouse,
                    sections: greenhouse.sections.map((section) => {  
                        return {
                            ...section,
                            sectors: section.sectors.map((sector) => {                    
                                return {
                                    ...sector,
                                    text: e.target.value
                                }
                            })
                        }                  
                        
                    })
                }
            })

            this.setState({
                greenhouses: greenhouses
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
                        {map(greenhouse, handleMouseDown, handleMouseUp)}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}


function map(greenhouse, handleMouseDown, handleMouseUp) {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                {getSectionsRect(greenhouse, handleMouseDown, handleMouseUp)}
            </Layer>
        </Stage>
    )
}

function getSectionsRect(greenhouse, handleMouseDown, handleMouseUp) {

    var x = 15
    var y = 15

    return (
        greenhouse.sections.map((section) => {
            let sectionRect = getSectionRect(greenhouse, section, x, y, handleMouseDown, handleMouseUp)
            x += 90
            return sectionRect
        })
    )
}

function getSectionRect(greenhouse, section, x, y, handleMouseDown, handleMouseUp) {
    
    let height = 530 / section.sectors.length
    return (
        section.sectors.map((sector) => {
            let sectorRect = getSectorRect(greenhouse, section, sector, x, y, height, handleMouseDown, handleMouseUp)
            y += height
            return sectorRect
        })
    )
}

function getSectorRect(greenhouse, section, sector, x, y, height, handleMouseDown, handleMouseUp) {
    let color = sector.color ? sector.color : "#ee6310"
    let width = sector.width ? sector.width : 70
    height = sector.height ? sector.height : height
    x = sector.x ? sector.x : x
    y = sector.y ? sector.y : y
    let text = sector.text ? sector.text : "X"

    return (
        <Group
            id={"group-" + sector.sector}
            sector={sector.sector}
            section={section.section}
            greenhouse={greenhouse.id}
            x={x}
            y={y}
            width={width}
            height={height}
            onMouseEnter={handleMouseDown}
            onMouseLeave={handleMouseUp}
        >
            <Rect
                id={"rect-" + sector.sector}
                sector={sector.sector}
                section={section.section}
                greenhouse={greenhouse.id}
                width={width}
                height={height}
                fill= {color}
                stroke="black"
            />
            <Text 
                id={"text-" + sector.sector}
                sector={sector.sector}
                section={section.section}
                greenhouse={greenhouse.id}
                text={text}
                align={"center"}
                verticalAlign={"middle"}
                fontSize={25}
                width={width}
                height={height}
            />
        </Group>
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