import React from 'react';

class Menu extends React.Component {
 
    render() {
   
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button className="nav-link" data-widget="pushmenu" id="menu-button"><i className="fas fa-bars"></i></button>
                    </li>
                </ul>
            </nav>
   
        )
      
    }
   
  }
   
  export default Menu;