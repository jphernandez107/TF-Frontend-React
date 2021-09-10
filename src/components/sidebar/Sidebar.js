import React from 'react';
import { Button, Row, InputGroup, FormControl, Nav } from 'react-bootstrap'
 
 
class Sidebar extends React.Component {


 
  render() {

    let greenhouses = this.props.greenhouses; // array de objetos -> [{greenhouseName: 'A'}]
    let greenhouseList = greenhouses.map(function(greenhouse) { 
            if (greenhouse.id) {
                return (
                    <Nav.Item key={"id:" + greenhouse.id}>
                        <a href={greenhouse.href} className={"nav-link "}>
                            <i className="far fa-circle nav-icon"></i>
                            <p>{greenhouse.name}</p>
                        </a>
                    </Nav.Item>
                )
            }
        }
    )
 
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            
            <a href="index.html" className="brand-link">
                <span className="brand-text font-weight-light">Green Greenhouse</span>
            </a>

            <div className="sidebar">

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"></input>
                        <div className="input-group-append">
                            <Button className="btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </Button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <Nav className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <Nav.Item>
                            <a href="/" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>Inicio <span className="right badge badge-danger">Nuevo</span></p>
                            </a>
                        </Nav.Item>
                        <Nav.Item className="menu-open">
                            <a href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p> Invernaderos <i className="right fas fa-angle-left"></i> </p>
                            </a>
                            <Nav className="nav nav-treeview">
                                {greenhouseList}
                            </Nav>
                        </Nav.Item>
                        <Nav.Item>
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-chart-pie"></i>
                                <p> Gráficas <i className="right fas fa-angle-left"></i></p>
                            </a>
                            <Nav className="nav nav-treeview">
                                <Nav.Item>
                                    <a href="AdminLTE/pages/charts/chartjs.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>ChartJS</p>
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="AdminLTE/pages/charts/flot.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Flot</p>
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="AdminLTE/pages/charts/inline.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Inline</p>
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="AdminLTE/pages/charts/uplot.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>uPlot</p>
                                    </a>
                                </Nav.Item>
                            </Nav>
                        </Nav.Item>
                    </Nav>
                </nav>
            </div>
        </aside>
 
    )
    
  }
 
}
 
export default Sidebar;