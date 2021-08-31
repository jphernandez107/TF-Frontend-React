import React, { Component } from 'react';

class SmallCard extends Component {

    static defaultProps = {
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

    render() {
        var detailsSection = <div></div>
        if (this.props.detailsSection.show) {
            detailsSection = <>
                                <a href={this.props.detailsSection.href} className="small-box-footer">
                                    {this.props.detailsSection.title} <i className="fas fa-arrow-circle-right" />
                                </a>
                            </>
        }
        return(
            <div className={"col-lg-" + this.props.size}>
                <div className={"small-box " + this.props.color}>
                    <div className="inner">
                        <h3>{this.props.value}<sup style={{fontSize: 20}}>{this.props.unit}</sup></h3>
                        <p>{this.props.cardTitle}</p>
                    </div>
                    <div className="icon">
                        <i className={this.props.icon}></i>
                    </div>
                    {detailsSection}
                </div>
            </div>
        );
    }


}

export default SmallCard;