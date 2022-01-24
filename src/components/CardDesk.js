import React, { Component, Fragment } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useScoreCounting from '../hooks/useScoreCounting';
import cards from './cards.json'
import Score from './Score';
import Player from './Player';
import PopUp from './PopUp';
import GameBoard from './GameBoard';

class CardDesk extends React.Component {
    
    state = {
    gameStatus: true,
    roundStatus: true,
    modal:false,        
    //by now this array is har coded; next it's going to be generated
        cards: [ 
    {"id":1,"color": "red","value": "0"},
    {"id":2,"color": "red","value": "1"},
    {"id":3,"color": "red","value": "2"},
    {"id":4,"color": "red","value": "3"},
    {"id":5,"color": "red","value": "4"},
    {"id":6,"color": "red","value": "5"},
    {"id":7,"color": "red","value": "6"},
    {"id":8,"color": "red","value": "7"},
    {"id":9,"color": "red","value": "8"},
    {"id":10,"color": "red","value": "9"},
    {"id":11,"color": "red","value": "0"},
    {"id":12,"color": "red","value": "1"},
    {"id":13,"color": "red","value": "2"},
    {"id":14,"color": "red","value": "3"},
    {"id":15,"color": "red","value": "4"},
    {"id":16,"color": "red","value": "5"},
    {"id":17,"color": "red","value": "6"},
    {"id":18,"color": "red","value": "7"},
    {"id":19,"color": "red","value": "8"},
    {"id":20,"color": "red","value": "9"},
    {"id":21,"color": "yellow","value": "0"},
    {"id":22,"color": "yellow","value": "1"},
    {"id":23,"color": "yellow","value": "2"},
    {"id":24,"color": "yellow","value": "3"},
    {"id":25,"color": "yellow","value": "4"},
    {"id":26,"color": "yellow","value": "5"},
    {"id":27,"color": "yellow","value": "6"},
    {"id":28,"color": "yellow","value": "7"},
    {"id":29,"color": "yellow","value": "8"},
    {"id":31,"color": "yellow","value": "9"},
    {"id":31,"color": "yellow","value": "0"},
    {"id":32,"color": "yellow","value": "1"},
    {"id":33,"color": "yellow","value": "2"},
    {"id":34,"color": "yellow","value": "3"},
    {"id":35,"color": "yellow","value": "4"},
    {"id":36,"color": "yellow","value": "5"},
    {"id":37,"color": "yellow","value": "6"},
    {"id":38,"color": "yellow","value": "7"},
    {"id":39,"color": "yellow","value": "8"},
    {"id":40,"color": "yellow","value": "9"},
    {"id":41,"color": "blue","value": "0"},
    {"id":42,"color": "blue","value": "1"},
    {"id":43,"color": "blue","value": "2"},
    {"id":44,"color": "blue","value": "3"},
    {"id":45,"color": "blue","value": "4"},
    {"id":46,"color": "blue","value": "5"},
    {"id":47,"color": "blue","value": "6"},
    {"id":48,"color": "blue","value": "7"},
    {"id":49,"color": "blue","value": "8"},
    {"id":50,"color": "blue","value": "9"},
    {"id":51,"color": "blue","value": "0"},
    {"id":52,"color": "blue","value": "1"},
    {"id":53,"color": "blue","value": "2"},
    {"id":54,"color": "blue","value": "3"},
    {"id":55,"color": "blue","value": "4"},
    {"id":56,"color": "blue","value": "5"},
    {"id":57,"color": "blue","value": "6"},
    {"id":58,"color": "blue","value": "7"},
    {"id":59,"color": "blue","value": "8"},
    {"id":60,"color": "blue","value": "9"},
    {"id":61,"color": "green","value": "0"},
    {"id":62,"color": "green","value": "1"},
    {"id":63,"color": "green","value": "2"},
    {"id":64,"color": "green","value": "3"},
    {"id":65,"color": "green","value": "4"},
    {"id":66,"color": "green","value": "5"},
    {"id":67,"color": "green","value": "6"},
    {"id":68,"color": "green","value": "7"},
    {"id":69,"color": "green","value": "8"},
    {"id":70,"color": "green","value": "9"},
    {"id":71,"color": "green","value": "0"},
    {"id":72,"color": "green","value": "1"},
    {"id":73,"color": "green","value": "2"},
    {"id":74,"color": "green","value": "3"},
    {"id":75,"color": "green","value": "4"},
    {"id":76,"color": "green","value": "5"},
    {"id":77,"color": "green","value": "6"},
    {"id":78,"color": "green","value": "7"},
    {"id":79,"color": "green","value": "8"},
    {"id":80,"color": "green","value": "9"},
    //skip cards
    {"id":81,"color": "red","value": "S"},
    {"id":82,"color": "red","value": "S"},
    {"id":83,"color": "green","value": "S"},
    {"id":84,"color": "green","value": "S"},
    {"id":85,"color": "yellow","value": "S"},
    {"id":86,"color": "yellow","value": "S"},
    {"id":87,"color": "blue","value": "S"},
    {"id":88,"color": "blue","value": "S"},
    //reverse cards
    {"id":89,"color": "red","value": "R"},
    {"id":90,"color": "red","value": "R"},
    {"id":91,"color": "green","value": "R"},
    {"id":92,"color": "green","value": "R"},
    {"id":93,"color": "yellow","value": "R"},
    {"id":94,"color": "yellow","value": "R"},
    {"id":95,"color": "blue","value": "R"},
    {"id":96,"color": "blue","value": "R"},
    //+2 cards
    {"id":97,"color": "red","value": "+2"},
    {"id":98,"color": "red","value": "+2"},
    {"id":99,"color": "green","value": "+2"},
    {"id":100,"color": "green","value": "+2"},
    {"id":101,"color": "yellow","value": "+2"},
    {"id":102,"color": "yellow","value": "+2"},
    {"id":103,"color": "blue","value": "+2"},
    {"id":104,"color": "blue","value": "+2"},
    //Wild cards
    {"id":105,"color": "W","value": "W"},
    {"id":106,"color": "W","value": "W"},
    {"id":107,"color": "W","value": "W"},
    {"id":108,"color": "W","value": "W"},
    {"id":109,"color": "W","value": "+4"},
    {"id":110,"color": "W","value": "+4"},
    {"id":111,"color": "W","value": "+4"},
    {"id":112,"color": "W","value": "+4"}
        ],
        //by now this array is har coded; next it's going to be generated
        mainCard: null,
        forward: true,
        turn: 1,
        nextTurn: 2,
        log:'',
        desk: [],
        players: [
            {
                id: 1,
                name: "SOFIA",
                turn: true,
                score: 0,
                cards:[]
            },
            {
                id: 2,
                name: "SAM",
                turn: false,
                score: 0,
                cards:[]
            },
            {
                id: 3,
                name: "TONY",
                turn: false,
                score: 0,
                cards:[]
            }
        ]
    }
     
    componentDidMount() {
        this.fillTheDesk();
        console.log(this.state.desk);
        console.log('desk was filled');
    }
    
    fillTheDesk = () => {
        const desk = Array.from(Array(112).keys()).map(x=> ++x)
        this.setState({desk})
        console.log(this.state.desk);
        console.log('desk was filled');
    }

    populateTheCards = () => {
        const types = ['0','1','2','3','4','5','6','7','8','9']
        const colors = ['red','yellow','blue','green']
        colors.map(function(i){
          //write a function to populate a card desk with cards  
        })
    }
    
    startNewGame = () => {
        this.initiateMainCard();
        //by now just call the following mwthod for 3 times; this part has to be refactored
        const amountOfCards = 5;
        this.state.players.map((i)=> this.handleCardToPlayer(i.id, amountOfCards))
        console.log("The game started");
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
        this.setState({mainCard})
    }

    handleEndRound = () => {
        console.log("The round is over")
        //count the score than strat the round or call handleEndGame method
        this.state.players.map(function(player){
            player.score = Score(player.cards)
        })
        console.log(this.state.players);
    }
    
    completeTurn = (playerId) => {
        if (playerId!=this.state.turn) console.log("It's not your turn yet!")
        else {
            const player = this.state.players.find(player=> player.id==playerId)
            if (this.state.forward) this.makeForwardTurn(playerId);
            else this.makeBackwardTurn(playerId);
        }
        this.checkRoundIsOver(playerId);
        //testing
        console.log(this.state.desk);
    }

    forceCompleteTurn = (playerId) => {
        const player = this.state.players.find(player=> player.id==playerId)
        if (this.state.forward) this.makeForwardTurn(playerId);
        else this.makeBackwardTurn(playerId);
    }

    checkRoundIsOver = (playerId) => {
        const player = this.state.players.find(player=> player.id==playerId)
        if (player.cards.length==0) {
            console.log(`"round is over ${player} has no cards`)
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
        //experimental
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
        console.log(`CURRENT DESK: ${this.state.desk}`);
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
       };

       ChooseColor = (color) => {
        console.log(`${color} was choosed`);
        const mainCard = this.state.mainCard;
        mainCard.color=color;
        this.setState({mainCard})
       }

       testClick = () => {
            console.log("test passed");
       }


    render() { 
        
        return <div> 
            
            <button onClick = {() => this.handleEndRound()}>END ROUND</button>

            {this.state.modal ? <PopUp onColor={this.ChooseColor} onClose={this.toggleModal}/> : null}
            <button onClick = {() => this.toggleModal()}>Call POP UP</button>

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



            <button onClick = {() => this.forceCompleteTurn(this.state.nextTurn)}>Next player skips turn</button>

            <button onClick = {() => this.startNewGame()}>Start the GAME</button>
                
            <button onClick = {() => this.handleCardToPlayer(this.state.turn, 1)}>Grab a card from the desk</button>
            
            <div className="playerBoard">

                </div>
                        <Fragment>
                            <p>Main Card: </p>
                            {this.state.mainCard!=null && <div className={`card ${this.state.mainCard.color}`}>{this.state.mainCard.value}</div>}
                        </Fragment>
        </div>;
    }
}
 
export default CardDesk;