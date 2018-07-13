import React, { Component } from 'react'
import { withRouter } from 'react-router';

import './View.css'

class View extends Component {

  state = {
  }

  render() {
    return (
      <div className="grid-noGutter pokemon">
        {this.props.match.params.id}
      </div>
    )
  }
}
export default withRouter(View)
