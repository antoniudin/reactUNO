import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useScoreCounting from '../hooks/useScoreCounting';
import Score from './Score';
import Player from './Player';
import PopUp from './PopUp';
import EndComponent from './EndComponent';
import FillDesk from './FillDesk';
import FillCards from './FillCards';
import TestRouteComponent from './TestRouteComponent';
import PlayerContext from '../context/PlayerContext';
import GameOver from './GameOver';

class CardDesk extends React.Component {
    static playerContext = PlayerContext;
    state = {
    gameOver: false,
    roundStatus: false,
    modal:false,        
        cards: [],
        mainCard: null,
        forward: true,
        turn: 1,
        nextTurn: 2,
        log:'',
        desk: [],
        colors : ['yellow', 'blue', 'red', 'green','yellow', 'blue', 'red', 'green'],
        players: [
            {id: 1, name: "YOU", turn: true, score: 0, cards:[],desk:false},
            {id: 2, name: "PLAYER_1", turn: false, score: 0, cards:[],desk:false},
            {id: 3, name: "PLAYER_2", turn: false, score: 0, cards:[],desk:false},
        ]
    }
     
    componentDidMount() {
        const cards = FillCards(this.state.colors);   
        const desk = FillDesk(); 
        this.setState({desk,cards})
    }
    
    startNewGame = () => {
        //Clean all previous data
        const desk = FillDesk(); 
        this.setState({desk})
        this.state.players.map((i)=> this.clearPlayersHand(i.id));
        this.initiateMainCard();
        //by now just call the following method for 3 times; this part has to be refactored +
        const amountOfCards = 5;
        this.state.players.map((i)=> this.handleCardToPlayer(i.id, amountOfCards))
        console.log("The game started");
    }

   clearPlayersHand = (playerId) => {
    const player = this.state.players.find(player => player.id==playerId);
    player.cards = [];
    this.setState({player})
   }

    updateMainCard = (cardId) => {
        const mainCard = this.state.cards.find(card => card.id==cardId)
        this.setState({mainCard})
    }

    removeCardFromPlayerBoard = (cardId, playerId) => {
        const player = this.state.players.find(player => player.id==playerId)
        const card = player.cards.find(card => card.id==cardId)
        const index = player.cards.indexOf(card)
        // console.log(index)
        player.cards.splice(index,1);
        this.setState({player});
        this.updateMainCard(cardId);
    }

    makeTurn = (playerId, cardId) => {
        if (playerId==this.state.turn) {
            console.log(`Player ${playerId} is about to use ${cardId}`)
            this.compareTwoCards(cardId, playerId)
        }
        else console.log("Is not your turn")
    }

    compareTwoCards = (cardId, playerId) => {
        const mainCard = this.state.mainCard;
        const currentCard = this.state.cards.find(card=> card.id==cardId)
        //If cards are not matching return false, otherwise raise 3 other methods
        if (mainCard.color==currentCard.color || mainCard.value==currentCard.value || currentCard.color=="W") {
            this.removeCardFromPlayerBoard(cardId, playerId)
            //Check if the card used is special and additional action is required
            this.completeTurn(playerId);
            this.checkSpecialCards(cardId);
            return true;
        } return false;
    }

    handleTwoCard = (cardId) => {
        //Find the player who is going to take 2 Cards
        console.log(`Player ${this.state.nextTurn} is taking 2 CARDS!`);
        this.handleCardToPlayer(this.state.nextTurn, 2)
        this.forceCompleteTurn(this.state.nextTurn)
    }

    handleFourCard = (cardId) => {
        this.toggleModal();
        console.log(`Player ${this.state.nextTurn} is taking 4 CARDS!!!`);
        this.handleCardToPlayer(this.state.nextTurn, 4)
        this.forceCompleteTurn(this.state.nextTurn)
    }

    handleWildCard = (cardId) => {
        console.log(`Wild card! Player ${this.state.turn} is choosing a color`);
        this.toggleModal();
    }

    handleReverseCard = (cardId) => {
        console.log(`The direction was changed!`);
        this.changeDirection()
    }    

    handleSkipCard = (cardId) => {
        console.log(`Player ${this.state.nextTurn} is skipping his turn!`);
        this.forceCompleteTurn(this.state.nextTurn)
    }

    checkSpecialCards = (cardId) => {
        const card = this.state.cards.find(card => card.id==cardId)
        switch (card.value) {
            case 'R' : this.handleReverseCard(); break;
            case 'S' : this.handleSkipCard(); break;
            case '+2' : this.handleTwoCard(); break;
            case '+4' : this.handleFourCard(); break;
            case 'W' : this.handleWildCard(); break;
        }
    }

    initiateMainCard = () => {
        //this method is raised only once in the beginning of the game
        const mainCard = this.takeCardFromDesk()
        if (mainCard.color=='W') mainCard.color = this.state.colors[Math.floor(Math.random()*this.state.colors.length)]
        this.setState({mainCard})
    }

    handleEndRound = () => {
        //Transfer all the console.log messages to the GameLogComponent
        console.log("The round is over")
        //count the score than strat the round or call handleEndGame method
        const players = this.state.players;
        let gameOver = false;
        players.map(function(player){
            player.score += Score(player.cards);
            if (player.score>100) gameOver=true; 
        })
        //HAVE TO call modal window 'END ROUND'
        //HAVE TO CALL START GAME METHOD
        this.setState({players, gameOver})
        // this.toggleEndComponent();
        this.startNewGame();

    }
    
    completeTurn = (playerId) => {
        if (playerId!=this.state.turn) console.log("It's not your turn yet!")
        else {
            const player = this.state.players.find(player=> player.id==playerId)
            player.desk=false
            if (this.state.forward) this.makeForwardTurn(playerId);
            else this.makeBackwardTurn(playerId);
        }
        this.checkRoundIsOver(playerId);
    }

    forceCompleteTurn = (playerId) => {
        const player = this.state.players.find(player=> player.id==playerId)
        if (this.state.forward) this.makeForwardTurn(playerId);
        else this.makeBackwardTurn(playerId);
    }

    checkRoundIsOver = (playerId) => {
        const player = this.state.players.find(player=> player.id==playerId)
        if (player.cards.length===0) {
            console.log(`"round is over ${player} has no cards`)
            console.log(this.state.roundStatus);
            this.handleEndRound();    
        }
    }

    makeForwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId<3) turn++; else turn = 1;
        this.setState({turn})
        let nextTurn=turn+1;
        if (nextTurn>3) nextTurn=1
        this.setState({nextTurn})
        // console.log(this.state.nextTurn);
    }

    makeBackwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId>1) turn--; else turn = 3;
        this.setState({turn})
        let nextTurn=turn-1;
        if (nextTurn<1) nextTurn=3;
        this.setState({nextTurn})
        // console.log(this.state.nextTurn);
    }

    changeDirection = () => {
        this.state.forward = !this.state.forward
        this.completeTurn(this.state.turn)
    }

    handleCardToPlayer = (playerId, amountOfCards) => {
        let counter = 0;
        while (counter<amountOfCards) {
            const result = this.takeCardFromDesk();
            const player = this.state.players.find(player => player.id==playerId)
            player.cards.push(result)
            counter++;
            this.setState({player})
        }
        console.log(this.state.players)
    }

    takeCardFromDesk = () => {
        const desk = this.state.desk;
        //get a random card from the desk
        const card = desk[Math.floor(Math.random()*desk.length)]
        console.log(`random card: ${card}`);
        //find out the index of random card and remove it from desk
        const cardIndex = desk.indexOf(card)
        console.log(`card index: ${cardIndex}`);
        desk.splice(cardIndex,1);
        //find out the card and update the desk
        const currentCard = this.state.cards.find(c => c.id==card);
        console.log(`currentCard: ${currentCard.id}`);
        this.setState({desk})
        return currentCard;
    }

    toggleModal = () => {
        this.setState({
         modal: !this.state.modal
        });
       }

    toggleEndComponent = () => {
        this.setState({
            roundStatus: !this.state.roundStatus
           });
    }

        grabCardFromDesk = () =>{
            const player = this.state.players.find(player => player.id==this.state.turn)
            if (!player.desk) {
                player.desk = true;
                this.handleCardToPlayer(this.state.turn, 1)
            } else console.log('You got one!');
            
        }

       ChooseColor = (color) => {
        console.log(`${color} was choosed`);
        const mainCard = this.state.mainCard;
        mainCard.color=color;
        this.setState({mainCard})
       }

    render() { 
        return (
        <PlayerContext.Consumer>
            {PlayerContext => <div> 
            
            {this.state.gameOver && <TestRouteComponent players={this.state.players}/>}

            <button onClick = {() => this.handleEndRound()}>END ROUND</button>

            {this.state.roundStatus ? <EndComponent players={this.state.players} gameOver={this.state.gameOver} onStart={this.startNewGame} onClose={this.toggleEndComponent}/> : null}
            {this.state.modal ? <PopUp onColor={this.ChooseColor} onClose={this.toggleModal}/> : null}

            {this.state.players.map(player=>
                <Player 
                key={player.id} 
                player={player} 
                turn={this.state.turn}
                nextTurn={this.state.next}
                onMakeTurn = {this.makeTurn}
                onCompleteTurn = {this.completeTurn}
                />
                )}

            <button onClick = {() => this.startNewGame()}>Start the GAME</button>
                
            <button onClick = {() => this.grabCardFromDesk()}>Grab a card from the desk</button>
            
            <div className="playerBoard">
                </div>
                        <Fragment>
                            <p>Main Card: </p>
                            {this.state.mainCard!=null && <div className={`card ${this.state.mainCard.color}`}>{this.state.mainCard.value}</div>}
                        </Fragment>
                </div>
        }
        </PlayerContext.Consumer>
        )
    }
}

CardDesk.contextType = PlayerContext;
export default CardDesk;