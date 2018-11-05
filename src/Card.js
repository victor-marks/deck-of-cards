import React, { Component } from 'react';

class Card extends Component {
  componentDidMount() {
    console.log('Component ran inside of Card')
  }
  render() {
    return (
      <div className='Card'>
        <img src={this.props.card} alt="" />
      </div>
    )
  }
}

export default Card;