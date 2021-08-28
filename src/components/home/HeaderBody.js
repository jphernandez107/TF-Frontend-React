import React from 'react';

class HeaderBody extends React.Component {
    /**
     * 
     * Aqui tengo que hacer una lista de la profundidad de navegacion. 
     * De esa forma voy cargando y armando la navegacion para mostrarla.
     */
 
    render() {
        return (  
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Invernadero A</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">{this.props.greenhouse}</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
        )
      
    }
   
  }
   
  export default HeaderBody;