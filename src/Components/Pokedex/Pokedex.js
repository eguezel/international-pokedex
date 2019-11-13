import React from 'react';
import axios from 'axios';
import './Pokedex.css';
import Infos from './Infos/Infos';
import Sprite from './Sprite/Sprite';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idSearch: 1,
      nameSearch: 'Enter a pokemon name',
      name: '',
      sprite: '',
      id: '',
      general: {
        type: '',
        height: 0,
        weight: 0,
      },
      stats: {
        HP: 0,
        speed: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
      },
    };
  }

  componentDidMount = () => {
    this.recoverInformations(this.state.idSearch);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.idSearch !== prevState.idSearch || this.props !== prevProps) {
      this.recoverInformations(this.state.idSearch);
    }
  }

  recoverInformations = (search) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${search}`;
    axios(url)
    .then(res => {
      this.setState({
        name: res.data.name,
        sprite: res.data.sprites.front_default,
        id: res.data.id,
        idSearch: res.data.id,
        general: {
          type: res.data.types,
          height: res.data.height,
          weight: res.data.weight,
        },
        stats: {
          HP: res.data.stats[5].base_stat,
          speed: res.data.stats[0].base_stat,
          attack: res.data.stats[4].base_stat,
          defense: res.data.stats[3].base_stat,
          special_attack: res.data.stats[2].base_stat,
          special_defense: res.data.stats[1].base_stat,
        },
      })
    })
  }

  previousID = () => {
    if (this.state.idSearch > 1) {
      this.setState({idSearch: (this.state.idSearch - 1)});
    }
  }

  nextID = () => {
    //The last pokemon in the API is the 807
    if (this.state.idSearch < 807) {
      this.setState({idSearch: (this.state.idSearch + 1)});
    }
  }

  searchName = (event) => {
    this.setState({nameSearch: event.target.value});
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.recoverInformations(this.state.nameSearch);
    }
  }

  render() {
    return(
      <div className='pokedex'>
        <div className='spritePart'>
          <div id='firstCircle'>
            <div id='secondCircle'>
              <div id='thirdCircle'></div>
            </div>
          </div>
          <h2>{this.state.name}</h2>
          <Sprite sprite={this.state.sprite} name={this.state.name}/>
        </div>
        <div className='idContainer'>
          <img src={`${process.env.PUBLIC_URL}/assets/images/moins.png`} alt='moins' onClick={this.previousID}/>
          <p>ID: {this.state.id}</p>
          <img src={`${process.env.PUBLIC_URL}/assets/images/plus.png`} alt='plus' onClick={this.nextID}/>
        </div>
        <div className='separation'></div>
        <div className='allInfos'>
          <input type='text' value={this.state.nameSearch} onChange={this.searchName} onKeyPress={this.handleKeyPress}/>
          <Infos name={this.state.name} general={this.state.general} stats={this.state.stats}/>
        </div>
      </div>
    )
  }
}

export default Pokedex;
