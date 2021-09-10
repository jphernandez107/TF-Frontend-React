import React from 'react';

import Menu from '../menu/Menu';
import ChartCard from '../chartCard/ChartCard';
import HeaderBody from '../home/HeaderBody';
import Section from '../helpers/Section';

class Grid extends React.Component {
    /**
     * 
     * Aqui tengo que hacer una lista de la profundidad de navegacion. 
     * De esa forma voy cargando y armando la navegacion para mostrarla.
     */
 
    render() {
        const columns = this.props.columns
        let sectionColumnsSizes = []
        for (let i=0; i<columns.num; i++) {
            sectionColumnsSizes.push(columns.width[i])
        }
        console.log(sectionColumnsSizes)

        return ( 
            <>
                <HeaderBody greenhouse = {this.props.greenhouse.name}/> 
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <Section size = {columns.width[0]}>
                                <ChartCard apiUrl={"ambient-temperature/filter"} locations={[{id:2, text:""}]} cardTitle={"Temperatura ambiente"} yUnit="°C"/>
                                <ChartCard apiUrl={"lux/filter"} locations={[{id:2, text:""}]} cardTitle={"Intensidad de luz"} yUnit=" lux"/>
                            </Section>
                            <Section size = {columns.width[1]}> 
                                <ChartCard apiUrl={"ambient-humidity/filter"} locations={[{id:2, text:""}]} cardTitle={"Humedad ambiente"} yUnit="%"/>
                                <ChartCard apiUrl={"soil-humidity/filter"} locations={[{id:2, text:""}]} cardTitle={"Humedad de suelo"} yUnit="%"/>
                            </Section>
                        </div>
                    </div>
                </section>
            </>
        )
      
    }
   
  }
   
  export default Grid;