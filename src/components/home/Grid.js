import React from 'react';

import ChartCard from '../chartCard/ChartCard';

class Grid extends React.Component {
    /**
     * 
     * Aqui tengo que hacer una lista de la profundidad de navegacion. 
     * De esa forma voy cargando y armando la navegacion para mostrarla.
     */
 
    render() {
        const columns = this.props.columns
        var sectionColumnsSizes = []
        for (var i=0; i<columns.num; i++) {
            sectionColumnsSizes.push(columns.width[i])
        }
        console.log(sectionColumnsSizes)

        return (  
            <section className="content">
                <div className="container-fluid">
                    <div className="row">

                        {/* {sectionColumnsSizes.map((columnWidth) => (
                            <Section size={columnWidth}> 
                                <Card chartData={this.props.chart.chartData}/> 
                            </Section>
                        ))} */}

                        <Section size = {columns.width[0]}>
                            <ChartCard />
                            {/*Enviar como prop la ubicacion del sensor que queremos traer la info*/}
                            <ChartCard />
                        </Section>
                        <Section size = {columns.width[1]}> 
                            <div className="card bg-gradient-primary">
                            <div className="card-header border-0">
                                <h3 className="card-title">
                                <i className="fas fa-map-marker-alt mr-1"></i>
                                Ubicación física
                                </h3>
                                <div className="card-tools">
                                <button type="button" className="btn btn-primary btn-sm daterange" title="Fechas">
                                    <i className="far fa-calendar-alt"></i>
                                </button>
                                <button type="button" className="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="world-map" style={{height: "250px", width: "100%"}}></div>
                            </div>
                            <div className="card-footer bg-transparent">
                                <div className="row">
                                <div className="col-4 text-center">
                                    <div id="sparkline-1"></div>
                                    <div className="text-white">Inv A</div>
                                </div>
                                <div className="col-4 text-center">
                                    <div id="sparkline-2"></div>
                                    <div className="text-white">Inv B</div>
                                </div>
                                <div className="col-4 text-center">
                                    <div id="sparkline-3"></div>
                                    <div className="text-white">Inv C</div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="card bg-gradient-success">
                            <div className="card-header border-0">

                                <h3 className="card-title">
                                <i className="far fa-calendar-alt"></i>
                                Calendar
                                </h3>
                                <div className="card-tools">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset="-52">
                                    <i className="fas fa-bars"></i>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                    <a href="#" className="dropdown-item">Add new event</a>
                                    <a href="#" className="dropdown-item">Clear events</a>
                                    <div className="dropdown-divider"></div>
                                    <a href="#" className="dropdown-item">View calendar</a>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
                                    <i className="fas fa-times"></i>
                                </button>
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div id="calendar"></div>
                            </div>
                            </div>
                        </Section>
                    </div>
                </div>
            </section>
        )
      
    }
   
  }

  class Section extends React.Component {
      render() {
          const sectionClass = "col-lg-" + this.props.size + " connectedSortable ui-sortable"
          return(
              <section class={sectionClass}> 
                {this.props.children}
              </section>
          )
      }
  }
   
  export default Grid;