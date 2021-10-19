/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Nav } from 'react-bootstrap'
 
 
class Sidebar extends React.Component {

    
    
  render() {
    let currentPath = window.location.pathname
    let greenhouseSelected = ''
    let homepage = 'active'
    let greenhouses = this.props.greenhouses; // array de objetos -> [{greenhouseName: 'A'}]
    let greenhouseList = greenhouses.map(function(greenhouse) { 
        if (greenhouse.id) {
            let active = greenhouse.href === currentPath ? 'active' : ''
            greenhouseSelected = greenhouse.href === currentPath ? 'menu-open active' : greenhouseSelected
            homepage = greenhouse.href === currentPath ? '' : homepage
            return (
                <Nav.Item key={"id:" + greenhouse.id}>
                    <Nav.Link href={greenhouse.href} className={active}>
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

                <nav className="mt-2">
                    <Nav className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <Nav.Item>
                            <a href="/" className={`nav-link ${homepage}`}>
                                <i className="nav-icon fas fa-th nav-icon-white"></i>
                                <p>Inicio</p>
                            </a>
                        </Nav.Item>
                        <Nav.Item className={greenhouseSelected}>
                            <Nav.Link eventKey="greenhouses-dropdown" className={`${greenhouseSelected}`}>
                                <i className="nav-icon fas fa-hand-holding-seedling nav-icon-white"></i>
                                <p> Invernaderos <i className="right fas fa-angle-left nav-icon-white"></i> </p>
                            </Nav.Link>
                            <Nav className="nav nav-treeview">
                                {greenhouseList}
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