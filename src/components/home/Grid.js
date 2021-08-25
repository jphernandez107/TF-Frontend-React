import React from 'react';

class Grid extends React.Component {
    /**
     * 
     * Aqui tengo que hacer una lista de la profundidad de navegacion. 
     * De esa forma voy cargando y armando la navegacion para mostrarla.
     */
 
    render() {
        /*const columns = this.props.columns
        var sections = []
        for (var i=0; i<columns.num; i++) {
            sections.push(Section(size=columns.size[i]))
        }*/
        const html = `<div class="card bg-gradient-info">
        <div class="card-header">
            <h3 class="card-title">
                <i class="fas fa-temperature-low mr-1"></i> Humedad de suelo
            </h3>
            <div class="card-tools">
                <ul class="nav nav-pills ml-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="#revenue-chart" data-toggle="tab">Area</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#sales-chart" data-toggle="tab">Dona</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="card-body">
            <div class="tab-content p-0">
            <div class="chart tab-pane active" id="revenue-chart" >
                <canvas id="revenue-chart-canvas" height="300" ></canvas>
            </div>
            <div class="chart tab-pane" id="sales-chart" >
                <canvas id="sales-chart-canvas" height="300" ></canvas>
            </div>
            </div>
        </div>
        </div>
        <div class="card bg-gradient-info">
            <div class="card-header border-0">
                <h3 class="card-title">
                <i class="fas fa-th mr-1"></i> Temperatura ambiente
                </h3>

                <div class="card-tools">
                <button type="button" class="btn bg-info btn-sm" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
                <div class="btn-group">
                    <button type="button" class="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown" data-offset="-52">
                    <i class="fas fa-stream"></i>
                    </button>
                    <div class="dropdown-menu" role="menu">
                    <button class="dropdown-item" id="temp_button">Temperaturas</button>
                    <button class="dropdown-item" id="hum_button">Humedad ambiente</button>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item">Salir</a>
                    </div>
                </div>
                <button type="button" class="btn bg-info btn-sm" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                </button>
                </div>
            </div>
        <div class="card-body">
            <canvas class="chart" id="line-chart" ></canvas>
        </div>
        <div class="card-footer bg-transparent">
            <div class="row">
            <div class="col-4 text-center">
                <div class="text-white">Mínima</div>
                <input id="left-knob" type="text" class="knob" data-readonly="true" value="80" data-width="60" data-height="60"
                    data-angleOffset={-125} data-angleArc={250} data-fgColor="#39CCCC"></input>
                <div id="left-knob-bottom-text" class="text-white"></div>
            </div>
            <div class="col-4 text-center">
                <div class="text-white">Promedio</div>
                <input id="center-knob" type="text" class="knob" data-readonly="true" value="50" data-width="60" data-height="60"
                    data-angleOffset={-125} data-angleArc={250} data-fgColor="#39CCCC"></input>
                <div id="center-knob-bottom-text" class="text-white"></div>
            </div>
            <div class="col-4 text-center">
                <div class="text-white">Máxima</div>
                <input id="right-knob" type="text" class="knob" data-readonly="true" value="30" data-width="60" data-height="60"
                    data-angleOffset={-125} data-angleArc={250} data-fgColor="#39CCCC"></input>
                <div id="right-knob-bottom-text" class="text-white"></div>
            </div>
            </div>
        </div>
        </div>`

        const html2 = `<div class="card bg-gradient-primary">
        <div class="card-header border-0">
            <h3 class="card-title">
            <i class="fas fa-map-marker-alt mr-1"></i>
            Ubicación física
            </h3>
            <div class="card-tools">
            <button type="button" class="btn btn-primary btn-sm daterange" title="Fechas">
                <i class="far fa-calendar-alt"></i>
            </button>
            <button type="button" class="btn btn-primary btn-sm" data-card-widget="collapse" title="Collapse">
                <i class="fas fa-minus"></i>
            </button>
            </div>
        </div>
        <div class="card-body">
            <div id="world-map" style="height: 250px; width: 100%;"></div>
        </div>
        <div class="card-footer bg-transparent">
            <div class="row">
            <div class="col-4 text-center">
                <div id="sparkline-1"></div>
                <div class="text-white">Inv A</div>
            </div>
            <div class="col-4 text-center">
                <div id="sparkline-2"></div>
                <div class="text-white">Inv B</div>
            </div>
            <div class="col-4 text-center">
                <div id="sparkline-3"></div>
                <div class="text-white">Inv C</div>
            </div>
            </div>
        </div>
        </div>

        <div class="card bg-gradient-success">
        <div class="card-header border-0">

            <h3 class="card-title">
            <i class="far fa-calendar-alt"></i>
            Calendar
            </h3>
            <div class="card-tools">
            <div class="btn-group">
                <button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset="-52">
                <i class="fas fa-bars"></i>
                </button>
                <div class="dropdown-menu" role="menu">
                <a href="#" class="dropdown-item">Add new event</a>
                <a href="#" class="dropdown-item">Clear events</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">View calendar</a>
                </div>
            </div>
            <button type="button" class="btn btn-success btn-sm" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
            </button>
            <button type="button" class="btn btn-success btn-sm" data-card-widget="remove">
                <i class="fas fa-times"></i>
            </button>
            </div>
        </div>
        <div class="card-body pt-0">
            <div id="calendar"></div>
        </div>
        </div>`

        return (  
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <Section size = {8} html = {html}/>
                        <Section size = {4} html = {html2}/>
                    </div>
                </div>
            </section>
        )
      
    }
   
  }

  class Section extends React.Component {
      render() {
          const sectionClass = "col-lg-" + this.props.size + " connectedSortable"
          return(
              <section class={sectionClass}> 
                { <div dangerouslySetInnerHTML={{ __html: this.props.html }} /> }
              </section>
          )
      }
  }
   
  export default Grid;