import React, { Component } from 'react'
import { withRouter } from 'react-router';

import { getPokemonById } from './api/pokemon'

import './View.css'

class View extends Component {

  state = {
    pokemon: ''
  }

  getPokemon = id => {
    getPokemonById(id, pokemon => this.setState({pokemon}))
  }

  resetPokemon = cb => {
    this.setState({pokemon: ''}, cb)
  }

  componentDidMount() {
    this.getPokemon(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id)
      this.resetPokemon(this.getPokemon(nextProps.match.params.id))
  }



  render() {
    const { name, sprites, types } = this.state.pokemon
    return (
      <div className="grid-center pokemon">
        <div className="col-7">
          {this.state.pokemon === '' && <span>Carregando pokemon...</span>}
          {this.state.pokemon !== '' &&
            <dl>
              <dt>Numero:</dt>
              <dd>{this.props.match.params.id}</dd>
              <dt>Nome:</dt>
              <dd>{name}</dd>
              <dt>Tipo:</dt>
              {types.map(t => <dd key={t.slot}>{t.type.name}</dd>)}
              <dt>Foto:</dt>
              <dd><img src={sprites.front_default} alt={name} /></dd>
              <dd><img src={sprites.back_default} alt={name} /></dd>
            </dl>
          }
        </div>
      </div>
    )
  }
}
export default withRouter(View)
