import React from 'react';
import { withRouter, matchPath } from 'react-router';

import './Navbar.css'

const Navbar = props => {
  const match = matchPath(window.location.pathname, {path: '/view/:id'})
  const value = match ? Number(match.params.id) : ''

  return (
    <nav className="grid-center">
      <div className="col-7">
        <h1 className="col-12">Mokedex</h1>
        {props.pokemons.length === 0 && <span>Carregando lista...</span>}
        {props.pokemons.length !== 0 &&
          <select value={value} onChange={e => props.history.push(`/view/${e.target.value}`)}>
            <option value="">Escolha um pokemon</option>
            {props.pokemons.map((p, i) => <option key={i} value={i+1}>{`${i+1} - ${p.name}`}</option>)}
          </select>
        }
      </div>
    </nav>
  )
}
export default withRouter(Navbar)
