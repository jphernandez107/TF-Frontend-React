import logo from './logo.svg';
import './App.css';

import Menu from './components/menu/Menu'
import Home from './components/home/Home'
import Sidebar from './components/sidebar/Sidebar'

import Chart from './components/charts/Chart'
import Card from './components/chartCard/ChartCard'
import { Component } from 'react/cjs/react.production.min';

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <Home />
        {/*<Chart chartData={this.state.chartData} />*/}
        {/* <Card chartData={this.state.chartData} />
        <Card chartData={this.state.chartData1} /> */}
      </div>
    );
  }
}

export default App;
