import React, { Component } from 'react';


class Section extends Component {
    render() {
        const sectionClass = "col-lg-" + this.props.size + " connectedSortable ui-sortable"
        return(
            <section className={sectionClass}> 
              {this.props.children}
            </section>
        )
    }
}

export default Section;