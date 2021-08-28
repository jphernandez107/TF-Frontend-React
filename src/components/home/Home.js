import React from 'react';
 
import Menu from '../menu/Menu';
import Sidebar from '../sidebar/Sidebar';
import HeaderBody from './HeaderBody';
import Grid from './Grid';

class Home extends React.Component {
 
    render() {
 
        const columns = {
            num: 2,
            width: [7, 5]
        }

        return(
 
            <>
 
                <Menu />
                <Sidebar columns = {columns}/> 
    
                <div className="content-wrapper">
                    {/* Content Header (Page header) --> MODULO */}
                    <HeaderBody greenhouse = "Invernadero A"/>

                    {/* Main content */}
                    <Grid columns = {columns} />
                    

                </div>
                {/* /.content-wrapper */}
                <footer className="main-footer">
                    <strong>Copyright &copy; 2021 Juan Pablo Hernández. </strong>
                    {"All rights reserved."}
                    <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                    </div>
                </footer>
 
            </>
 
        )
 
    }
 
}
 
export default Home;