import React from 'react';

class Menu extends React.Component {
 
    render() {
   
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                </ul>
            </nav>
   
        )
      
    }
   
  }
   
  export default Menu;