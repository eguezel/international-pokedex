import React from 'react';
import './Infos.css';

class Infos extends React.Component {

  render() {
    return(
      <React.Fragment>
        <h3>{this.props.name}</h3>
        <div className='infosContainer'>
          <div>
            <h4>General</h4>
            {this.props.general.type ? this.props.general.type.map((type, index) => {
              return <p key={index}>Type {index+1}: {type.type.name}</p>
            }) : ''}
            <p>Height: {this.props.general.height}</p>
            <p>Weight: {this.props.general.weight}</p>
          </div>
          <div>
            <h4>Stats</h4>
            <p>HP: {this.props.stats.HP}</p>
            <p>Speed: {this.props.stats.speed}</p>
            <p>Attack: {this.props.stats.attack}</p>
            <p>Defense: {this.props.stats.defense}</p>
            <p>Special Attack: {this.props.stats.special_attack}</p>
            <p>Special defense: {this.props.stats.special_defense}</p>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Infos;
