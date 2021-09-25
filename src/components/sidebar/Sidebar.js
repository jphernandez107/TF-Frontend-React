/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, Row, InputGroup, FormControl, Nav } from 'react-bootstrap'
 
 
class Sidebar extends React.Component {


 
  render() {

    let greenhouses = this.props.greenhouses; // array de objetos -> [{greenhouseName: 'A'}]
    let greenhouseList = greenhouses.map(function(greenhouse) { 
            if (greenhouse.id) {
                return (
                    <Nav.Item key={"id:" + greenhouse.id}>
                        <Nav.Link href={greenhouse.href}>
                            <i className="far fa-hand-holding-seedling nav-icon"></i>
                            <p>{greenhouse.name}</p>
                        </Nav.Link>
                    </Nav.Item>
                )
            } else {
                return(<></>)
            }
        }
    )
 
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            
            <a href="/" className="brand-link">
                <img src="dist/img/green-greenhouse-logo.svg" alt="GreenGreenhouse Logo" className="brand-image img-circle elevation-3" style={{"opacity": 0.8}}/>
                <span className="brand-text font-weight-light"> Green Greenhouse</span>
            </a>

            <div className="sidebar">

                <div className="form-inline d-flex mt-3">
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
                                <p>Inicio</p>
                            </a>
                        </Nav.Item>
                        <Nav.Item className="menu-open">
                            <Nav.Link eventKey="greenhouses-dropdown">
                                <i className="nav-icon fas fa-hand-holding-seedling"></i>
                                <p> Invernaderos <i className="right fas fa-angle-left"></i> </p>
                            </Nav.Link>
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
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>ChartJS</p>
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Flot</p>
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Inline</p>
                                    </a>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="#" className="nav-link">
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