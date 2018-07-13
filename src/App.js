import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { listPokemons } from './api/pokemon'

import Navbar from './Navbar'

import 'gridlex/dist/gridlex.min.css'
import './App.css';

class DynamicImport extends Component {
  state = {
    component: null
  }
  componentDidMount () {
    this.props.load()
      .then((component) => {
        this.setState(() => ({
          component: component.default ? component.default : component
        }))
      })
  }
  render() {
    return this.props.children(this.state.component)
  }
}

const View = (props) => (
  <DynamicImport load={() => import('./View')}>
    {(Component) => Component === null
      ? <p>Carregando...</p>
      : <Component {...props} />}
  </DynamicImport>
)

class AppHolder extends Component {

  state = {
    pokemons: []
  }

  componentDidMount() {
    listPokemons(pokemons => this.setState({pokemons: pokemons.results}))
  }

  render() {
    const { pokemons } = this.state

    return (
      <Router>
        <div>
          <Navbar pokemons={pokemons} />
          <Route exact path='/view/:id' component={View} />
        </div>
      </Router>
    );
  }
}

export default AppHolder;
