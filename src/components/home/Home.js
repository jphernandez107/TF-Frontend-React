import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Sidebar from '../sidebar/Sidebar';
import Grid from './Grid';
import General from './General';
import Menu from '../menu/Menu';


class Home extends React.Component {

    static defaultProps = {
        greenhouses: []
    }

    render() {
        
        const columns = { // move to prop
            num: 2,
            width: [6, 6]
        }

        let greenhouses = this.props.greenhouses; // array de objetos -> [{greenhouseName: 'A'}]
        let greenhouseList = greenhouses.map(function(greenhouse) {
            if(greenhouse.id) {
                return(
                    <Route exact path={greenhouse.href} key={greenhouse.id}>
                        <Grid columns={columns} greenhouse={greenhouse} />
                    </Route>
                )
            }
        })

        return(
 
            <Router>
                <Sidebar greenhouses={this.props.greenhouses} /> 
                <Menu greenhouses={this.props.greenhouses} />
    
                <div className="content-wrapper">
                    <Route exact path="/" key="general">
                        <General greenhouses={this.props.greenhouses} />
                    </Route>
                    <Switch>
                        {greenhouseList}
                    </Switch>
                </div>
                
                <footer className="main-footer">
                    <strong>Copyright &copy; 2021 Juan Pablo Hernández. </strong>
                    {"All rights reserved."}
                    <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                    </div>
                </footer>
 
            </Router>
 
        )
 
    }
 
}
 
export default Home;