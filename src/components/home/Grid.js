import React from 'react';

import Menu from '../menu/Menu';
import ChartCard from '../chartCard/ChartCard';
import HeaderBody from '../home/HeaderBody';
import Section from '../helpers/Section';
const api = require('../../api/Api')

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

        return ( 
            <>
                <HeaderBody greenhouse = {this.props.greenhouse.name}/> 
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {getCharts(this.props.greenhouse)}
                        </div>
                    </div>
                </section>
            </>
        )
      
    }
   
}

function getCharts(greenhouse) {

    return (
        <>
            <Section size = {6}>
                <ChartCard apiUrl={"ambient-temperature/filter"} locations={[{greenhouse:greenhouse.greenhouse, text:""}]}/>
                <ChartCard apiUrl={"lux/filter"} locations={[{greenhouse:greenhouse.greenhouse, text:""}]}/>
            </Section>
            <Section size = {6}> 
                <ChartCard apiUrl={"ambient-humidity/filter"} locations={[{greenhouse:greenhouse.greenhouse, text:""}]}/>
                <ChartCard apiUrl={"soil-humidity/filter"} locations={[{greenhouse:greenhouse.greenhouse, text:""}]}/>
            </Section>
        </>
    )
}
   
  export default Grid;