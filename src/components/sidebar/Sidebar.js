import React from 'react';
 
 
class Sidebar extends React.Component {
 
  render() {
 
    return (
 
        // <!-- Main Sidebar Container -->
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Brand Logo --> */}
            <a href="index.html" className="brand-link">
                <span className="brand-text font-weight-light">Green Greenhouse</span>
            </a>

            {/* <!-- SidebarSearch Form --> */}
            <div className="form-inline">
                <div className="input-group" data-widget="sidebar-search">
                    <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"></input>
                    <div className="input-group-append">
                        <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library --> */}
                    <li className="nav-item">
                        <a href="AdminLTE/pages/widgets.html" className="nav-link">
                            <i className="nav-icon fas fa-th"></i>
                            <p>
                                General <span className="right badge badge-danger">Nuevo</span>
                            </p>
                        </a>
                    </li>
                    <li className="nav-item menu-open">
                        <a href="#" className="nav-link active">
                            <i className="nav-icon fas fa-tachometer-alt"></i>
                            <p> Invernaderos <i className="right fas fa-angle-left"></i> </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="./index.html" className="nav-link active">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Invernadero A</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="./index2.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Invernadero B</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="./index3.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Invernadero C</p>
                            </a>
                        </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-chart-pie"></i>
                            <p>
                                Gráficas <i className="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="AdminLTE/pages/charts/chartjs.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>ChartJS</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="AdminLTE/pages/charts/flot.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Flot</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="AdminLTE/pages/charts/inline.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>Inline</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="AdminLTE/pages/charts/uplot.html" className="nav-link">
                                <i className="far fa-circle nav-icon"></i>
                                <p>uPlot</p>
                            </a>
                        </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="nav-icon fas fa-table"></i>
                            <p>
                                Tablas <i className="fas fa-angle-left right"></i>
                            </p>
                        </a>
                        <ul className="nav nav-treeview">
                            <li className="nav-item">
                                <a href="pages/tables/simple.html" className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>Simple Tables</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/tables/data.html" className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>DataTables</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="pages/tables/jsgrid.html" className="nav-link">
                                    <i className="far fa-circle nav-icon"></i>
                                    <p>jsGrid</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            {/* <!-- END /.sidebar-menu --> */}
            {/* <!-- END /.sidebar --> */}
        </aside>
 
    )
    
  }
 
}
 
export default Sidebar;