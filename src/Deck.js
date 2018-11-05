import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import uuid from 'uuid/v4'

//TODO: CSS / angle cards
//TODO: Stack cards
//TODO: two catches

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      remaining: 52,
      deck_id: ''
    }

    this.getCardOnClick = this.getCardOnClick.bind(this);
    this.getDeck = this.getDeck.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);


    // bind some functions here
  }

  getDeck() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        let deck = res.data;
        this.setState({ deck_id: deck.deck_id })
        console.log(this.state);
      });
  }

  componentDidMount() {
    this.getDeck();
    // TODO: add catch
  }

  getCardOnClick(evt) {
    evt.preventDefault();
    axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1`)
      .then(res => {
        // debugger;
        let cardImage = res.data.cards[0].image;
        this.setState(() => (
          {
            remaining: res.data.remaining,
            cards: [...this.state.cards, cardImage]
          }))
      })
    // TODO: add catch
  }


  handleShuffle(evt) {
    evt.preventDefault();
    this.getDeck();
    this.setState({
      cards: [],
      remaining: 52,
      deck_id: ''
    })
  }


  render() {
    let cards = this.state.cards.map(c => (
      <Card card={c} key={uuid()} />))
    return (
      <div className='Deck' >
        {this.state.remaining > 0 ? <button onClick={this.getCardOnClick}>GIMME A CARD!</button> : <button onClick={this.handleShuffle}>Shuffle</button>}
        {cards}
      </div>
    )
  }
}

export default Deck;