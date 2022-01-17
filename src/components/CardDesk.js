import React, { Component } from 'react';

class Desk extends React.Component {
    state= {
        cards: [
            {
                id:1,
                color: 'red',
                value: '2',
            },
            {
                id:2,
                color: 'yellow',
                value: '2',
            },
            {
                id:3,
                color: 'yellow',
                value: '3',
            },
            {
                id:4,
                color: 'green',
                value: '2',
            },
            {
                id:5,
                color: 'blue',
                value: '8',
            }
        ],
        desk: [1,2,3,4,5],
        turnDirection: true,
        player: {
            id: 1,
            name: "Player1",
            cards:[]
        }
    }

    handleTakeCardFromDesk = () => {
        const currentDesk = this.state.desk;
        const currentCard = currentDesk[Math.floor(Math.random()*currentDesk.length)]
        const currentCardIndex = currentDesk.indexOf(currentCard)
        currentDesk.splice(currentCardIndex,1);
        const card = this.state.cards.find(c => c.id==currentCard);
        console.log(currentCard)
        console.log(card)
        console.log(currentDesk)
    }

    handleGiveCardToPlayer = (cardId) => {
        const player1 = this.state.player1;
        player1.push(cardId);
        this.setState({player1})
        console.log(this.state.player1)
    }

    handleDrawCard = () => {

    }

    render() { 
        return <div>
            <button onClick = {this.handleTakeCardFromDesk}>Action</button>
        </div>;
    }
}
 
export default Desk;