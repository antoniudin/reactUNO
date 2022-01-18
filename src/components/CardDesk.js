import React, { Component, Fragment } from 'react';
import cards from './cards.json'

class Desk extends React.Component {
    state= {
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
    {"id":80,"color": "green","value": "9"}
        ],
        //by now this array is har coded; next it's going to be generated
        desk: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
            41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],
        mainCard: null,
        forward: true,
        turn: 1,
        log:'',
        players: [
            {
                id: 1,
                name: "Player1",
                turn: true,
                cards:[]
            },
            {
                id: 2,
                name: "Player2",
                turn: false,
                cards:[]
            },
            {
                id: 3,
                name: "Player3",
                turn: false,
                cards:[]
            }
        ]
    }
     
    startNewGame = () => {
        this.initiateMainCard();
        //by now just call the following mwthod for 3 times; this part has to be refactored
        this.handleCardToPlayer(1,5);
        this.handleCardToPlayer(2,5);
        this.handleCardToPlayer(3,5);
        console.log("The game started");
    }

    updateMainCard = () => {
        console.log("h")
    }

    removeCardFromPlayerBoard = () => {

    }

    handleTurn = () => {
        
    }

    initiateMainCard = () => {
        //this method is raised only once in the beginning of the game
        const mainCard = this.takeRandomCardFromDesk()
        this.setState({mainCard})
    }

    commitTurn = (playerId) => {
        if (this.state.forward) this.handleForwardTurn(playerId);
        else this.handleBackwardTurn(playerId);
    }

    handleForwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId<3) turn++; else turn = 1;
        this.setState({turn})
    }

    handleBackwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId>1) turn--; else turn = 3;
        this.setState({turn})
    }


    changeTurnDirection = () => {
        this.state.forward = !this.state.forward
    }

    compareTwoCards = (mainCard, playerCard) => {
        if (playerCard.color=='wild') {
            console.log(true)
            console.log(mainCard)
            console.log(playerCard)
            return true;
        }
        if (mainCard.value == playerCard.value || mainCard.color == playerCard.color) {
            console.log(true)
            console.log(mainCard)
            console.log(playerCard)
            return true;
        }
    }

    handleCardToPlayer = (playerId, amountOfCards) => {
        let counter = 0;
        while (counter<amountOfCards) {
            const result = this.takeRandomCardFromDesk();
            const player = this.state.players.find(player => player.id==playerId)
            player.cards.push(result)
            counter++;
            this.setState({player})
        }
        console.log(this.state.players)
    }

    takeRandomCardFromDesk = () => {
        const desk = this.state.desk;
        //get a random card from the desk
        const card = desk[Math.floor(Math.random()*desk.length)]
        //find out the index of random card and remove it from desk
        const cardIndex = desk.indexOf(card)
        desk.splice(cardIndex,1);
        //find out the card and update the desk
        const currentCard = this.state.cards.find(c => c.id==card);
        this.setState({desk})
        return currentCard;
    }

    handleClaimUno = () => {

    }

    handleDrawCard = () => {

    }

    render() { 
        return <div>
            <button onClick = {() => this.startNewGame()}>Start the GAME</button>
            
            {this.state.forward && <p>FORWRD</p>}
            {!this.state.forward && <p>BACKWARD</p>}
            
            <button onClick = {() => this.changeTurnDirection()}>Change the Direction</button>
            

            {/* <button onClick = {() => this.handleCardToPlayer(2)}>Give me a card</button>
            <button onClick = {() => this.compareTwoCards({value:'2',color:'red'},{value:'9',color:'wild'})}>Compare</button>
            <button onClick = {() => this.handleCardToPlayer(1,1)}>Give one random card</button> */}
            {this.state.players.map(player=> 
                <div>
                    <p>{player.name}</p>
                    <button onClick={()=> this.commitTurn(player.id)}>Make a turn</button>
                    {this.state.turn==player.id && <span>your turn</span>}
                        <div className="playerCardBoard">
                    {player.cards.map(card=>
                        <div onClick={()=> this.commitTurn()} className={`card ${card.color}`}>{card.value}
                        </div>
                        )}
                        </div>
                        
                </div>
                )}
                        <Fragment>
                            <p>Main Card: </p>
                            {this.state.mainCard!=null && <div className={`card ${this.state.mainCard.color}`}>{this.state.mainCard.value}</div>}
                        </Fragment>
        </div>;
    }
}
 
export default Desk;