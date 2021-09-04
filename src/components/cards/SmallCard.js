import React, { Component } from 'react';

class SmallCard extends Component {

    static defaultProps = {
        cardStyle: {
            cardTitle: "Temperatura ambiente",
            value: 55,
            unit: "°C",
            icon: "fas fa-thermometer-half",
            detailsSection: {
                show: true,
                title: "Detalles",
                href: "/greenhouse-a"
            },
            size:"3",
            color: "bg-info"
        }
    }

    render() {
        var detailsSection = <div></div>
        if (this.props.cardStyle.detailsSection.show) {
            detailsSection = <>
                                <a href={this.props.cardStyle.detailsSection.href} className="small-box-footer">
                                    {this.props.cardStyle.detailsSection.title} <i className="fas fa-arrow-circle-right" />
                                </a>
                            </>
        }
        return(
            <div className={"col-lg-" + this.props.cardStyle.size}>
                <div className={"small-box " + this.props.cardStyle.color}>
                    <div className="inner">
                        <h3>{this.props.cardStyle.value}<sup style={{fontSize: 20}}>{this.props.cardStyle.unit}</sup></h3>
                        <p>{this.props.cardStyle.cardTitle}</p>
                    </div>
                    <div className="icon">
                        <i className={this.props.cardStyle.icon}></i>
                    </div>
                    {detailsSection}
                </div>
            </div>
        );
    }


}

export default SmallCard;