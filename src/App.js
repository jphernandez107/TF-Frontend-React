// import logo from './logo.svg';
import './App.css';
import './components/home/LocationMap.css';

// import Menu from './components/menu/Menu'
import Home from './components/home/Home'
// import Sidebar from './components/sidebar/Sidebar'

// import Chart from './components/charts/Chart'
// import Card from './components/chartCard/ChartCard'
import { Component } from 'react/cjs/react.production.min';

const api = require('./api/Api')

class App extends Component {

  constructor(){
    super();
    this.state = {
      greenhouses: []
    }
  }

  componentDidMount() {
    this.getLocations()
  }

  getLocations() {
    let that = this;
    let params = new URLSearchParams("")

    api.getLocations(params)
    .then(function(json) {
      console.log(json)
      that.setState({
        greenhouses: json
      })
    })
    .catch(err => console.log(err))
}

  render() {
    return (
      <div className="wrapper">
        <Home greenhouses={ this.state.greenhouses }/>
      </div>
    );
  }
}

export default App;
