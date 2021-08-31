import React, { Component } from 'react';

import SmallCard from '../cards/SmallCard';
import Section from '../helpers/Section';
import HeaderBody from './HeaderBody';

class General extends Component {

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
                            {getSectionsPerGreenhouse(this.props.greenhouses)}
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

function getSectionsPerGreenhouse(greenhouses) {
    var sections =[]
    var widthSection = Math.floor(12/greenhouses.length)
    for (var gh of greenhouses) {
        sections.push(
            <Section size={widthSection} key={gh.id}>
                <div className="col ">
                    <div className="row d-flex justify-content-center">
                        <h3 mb-2 mt-4>{gh.name}</h3>
                    </div>
                    <div className="row">
                        {getSmallCards()}
                    </div>
                </div>
            </Section>
        )
    }

    return sections
}

function getSmallCards(greenhouse) {
    var smallCards = []

    smallCards.push(<SmallCard size={6} color="bg-warning" icon="fas fa-sun" unit="lux" value={3500}/>)
    smallCards.push(<SmallCard size={6} color="bg-gray" icon="fas fa-moon" unit="lux" value={132}/>)
    smallCards.push(<SmallCard size={12} color="bg-orange" value={27.3}/>)
    smallCards.push(<SmallCard size={6} color="bg-lightblue" icon="fas fa-tint" unit="%"/>)
    smallCards.push(<SmallCard size={6} color="bg-olive" icon="fas fa-seedling" unit="%" value={22}/>)

    return smallCards
}

export default General;
