import React from 'react';
import './Sprite.css';

class Sprite extends React.Component {

  render() {
    return(
      <React.Fragment>
        <div className='screen'>
          <img src={this.props.sprite} alt={this.props.name}/>
        </div>
      </React.Fragment>
    )
  }
}

export default Sprite;
