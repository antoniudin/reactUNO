import React, {Fragment} from 'react';
import Score from './Score';
import Player from './Player';
import PopUp from './PopUp';
import FillDesk from './FillDesk';
import FillCards from './FillCards';
import RedirectComponent from './RedirectComponent';
import PlayerContext from '../context/PlayerContext';
import Card from './Card';

class CardDesk extends React.Component {
    state = {
    gameOver: false,
    roundStatus: false,
    modal:false,        
    messageBox:[],
    cards: [],
    mainCard: null,
    forward: true,
    turn: 1,
    nextTurn: 2,
    desk: [],
    colors : ['yellow', 'blue', 'red', 'green','yellow', 'blue', 'red', 'green'],
    players: [
        {id: 1, name: "Player 1", turn: true, score: 0, cards:[],desk:false},
        {id: 2, name: "Player 2", turn: false, score: 0, cards:[],desk:false},
        {id: 3, name: "Player 3", turn: false, score: 0, cards:[],desk:false},
        ]
    }
     
    componentDidMount() {
        const cards = FillCards(this.state.colors);   
        const desk = FillDesk(); 
        this.setState({desk,cards})
    }
    
    handleMessage = (message) => {
        const messageBox = this.state.messageBox;
        messageBox.unshift(message)
        this.setState({messageBox})
    }

    startNewGame = () => {
        const desk = FillDesk(); 
        this.handleMessage(`player ${this.state.turn} is making a turn`)
        this.setState({desk})
        this.state.players.map((i)=> this.clearPlayersHand(i.id));
        this.initiateMainCard();
        const amountOfCards = 5;
        this.state.players.map((i)=> this.handleCardToPlayer(i.id, amountOfCards))
    }

   clearPlayersHand = (playerId) => {
    const player = this.state.players.find(player => player.id==playerId);
    player.cards = [];
    this.setState({player})
   }

    updateMainCard = (cardId) => {
        const mainCard = this.state.cards.find(card => card.id===cardId)
        this.setState({mainCard})
    }

    removeCardFromPlayerBoard = (cardId, playerId) => {
        const player = this.state.players.find(player => player.id===playerId)
        const card = player.cards.find(card => card.id===cardId)
        const index = player.cards.indexOf(card)
        player.cards.splice(index,1);
        this.setState({player});
        this.updateMainCard(cardId);
    }

    makeTurn = (playerId, cardId) => {
        if (playerId==this.state.turn && !this.state.modal) {
            const currentCard = this.state.cards.find(card=> card.id===cardId)
            this.handleMessage(`player ${playerId} used ${currentCard.value} ${currentCard.color}`)    
            this.compareTwoCards(cardId, playerId)
        }
        else this.handleMessage("sorry! you can't do it")
    }

    compareTwoCards = (cardId, playerId) => {
        if (!this.state.modal) {
            const mainCard = this.state.mainCard;
            const currentCard = this.state.cards.find(card=> card.id===cardId)
            if (mainCard.color===currentCard.color || mainCard.value===currentCard.value || currentCard.color==="W") {
            this.removeCardFromPlayerBoard(cardId, playerId)
            this.completeTurn(playerId);
            this.checkSpecialCards(cardId);
            return true;
        } return false;
        } else this.handleMessage(`player didn't choose a color`)
    }

    handleTwoCard = (cardId) => {
        this.handleCardToPlayer(this.state.nextTurn, 2)
        this.handleMessage(`Player ${this.state.nextTurn} pick up 2 cards and forfeit his turn`);
        this.forceCompleteTurn(this.state.nextTurn)
    }

    handleFourCard = (cardId) => {
        this.toggleModal();
        this.handleMessage(`player ${this.state.nextTurn} pick up 4 cards!`);
        this.handleMessage(`player ${this.state.turn} is choosing a color`);
        this.handleCardToPlayer(this.state.nextTurn, 4)
        this.forceCompleteTurn(this.state.nextTurn)
    }

    handleWildCard = (cardId) => {
        this.handleMessage(`wild card! player ${this.state.turn} is choosing a color`);
        this.toggleModal();
    }

    handleReverseCard = (cardId) => {
        this.handleMessage(`The game direction switched!`);
        this.changeDirection()
    }    

    handleSkipCard = (cardId) => {
        this.handleMessage(`player ${this.state.nextTurn} is skipping his turn!`)
        this.forceCompleteTurn(this.state.nextTurn)
    }

    checkSpecialCards = (cardId) => {
        const card = this.state.cards.find(card => card.id===cardId)
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
        this.handleMessage('round is over')
        this.handleMessage('new round started')
        //count the score than strat the round or call handleEndGame method
        const players = this.state.players;
        let gameOver = false;
        players.map(function(player){
            player.score += Score(player.cards);
            if (player.score>100) {
                gameOver=true; 
            }
        })
        this.setState({players, gameOver})
        this.startNewGame();
    }
    
    completeTurn = (playerId) => {
        if (playerId!=this.state.turn || this.state.modal) this.handleMessage("sorry, you can't do it")
        else {
            const player = this.state.players.find(player=> player.id===playerId)
            player.desk=false
            if (this.state.forward) this.makeForwardTurn(playerId);
            else this.makeBackwardTurn(playerId);
        } 
        this.checkRoundIsOver(playerId);
    }

    forceCompleteTurn = (playerId) => {
        const player = this.state.players.find(player=> player.id===playerId)
        if (this.state.forward) this.makeForwardTurn(playerId);
        else this.makeBackwardTurn(playerId);
    }

    checkRoundIsOver = (playerId) => {
        const player = this.state.players.find(player=> player.id==playerId)
        if (player.cards.length===0) {
            this.handleEndRound();    
        }
    }

    makeForwardTurn = (playerId) => {
        
        let turn = playerId;
        if (playerId<3) turn++; else turn = 1;
        let nextTurn=turn+1;
        if (nextTurn>3) nextTurn=1
        this.setState({turn, nextTurn})
    }

    makeBackwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId>1) turn--; else turn = 3;
        let nextTurn=turn-1;
        if (nextTurn<1) nextTurn=3;
        this.setState({turn, nextTurn})
    }

    changeDirection = () => {
        this.state.forward = !this.state.forward
        this.completeTurn(this.state.turn)
    }

    handleCardToPlayer = (playerId, amountOfCards) => {
        let counter = 0;
        while (counter<amountOfCards) {
            const result = this.takeCardFromDesk();
            const player = this.state.players.find(player => player.id===playerId)
            player.cards.push(result)
            counter++;
            this.setState({player})
        }
    }

    takeCardFromDesk = () => {
        const desk = this.state.desk;
        //get a random card from the desk
        const card = desk[Math.floor(Math.random()*desk.length)]
        //find out the index of random card and remove it from desk
        const cardIndex = desk.indexOf(card)
        desk.splice(cardIndex,1);
        //find out the card and update the desk
        const currentCard = this.state.cards.find(c => c.id===card);
        this.setState({desk})
        return currentCard;
    }

    toggleModal = () => {
        this.setState({
         modal: !this.state.modal
        });
       }

        grabCardFromDesk = () =>{
            const player = this.state.players.find(player => player.id===this.state.turn)
            if (!player.desk && !this.state.modal) {
                player.desk = true;
                this.handleCardToPlayer(this.state.turn, 1)
                this.handleMessage(`player ${this.state.turn} picked up a card`)
            } else this.handleMessage(`Sorry! You can't do that`);   
        }

       ChooseColor = (color) => {
        this.handleMessage(`${color} color was choosed`);
        this.handleMessage(`player ${this.state.turn} is making a turn`);
        const mainCard = this.state.mainCard;
        mainCard.color=color;
        this.setState({mainCard})
       }

       handleAI = () => {
        const {players, mainCard, turn, nextTurn} = this.state;
        const player = players.find(player => player.id==turn)
        const playersCards = player.cards.forEach((card)=> {
            if (card.value===mainCard.value || card.color==mainCard.color || card.color=='W') console.log(card);
        })
        if (playersCards.length===0) console.log("I need a card from the desk");
       }

       updateContext = () => {
           const m = PlayerContext.test();
       }


    render() { 
        const {turn,mainCard, next, players, gameOver, roundStatus, forward, modal, messageBox} = this.state;
        const player1 = players.find(player=> player.id==1)
        const player2 = players.find(player=> player.id==2)
        const player3 = players.find(player=> player.id==3)
        return (
        <PlayerContext.Consumer>
            {PlayerContext => <Fragment> 

            <div className="gameBoard">
                <div className="upper">
                 <div> 
                 {mainCard!=null && <Player 
                        key={player1.id} 
                        player={player1} 
                        turn={turn}
                        nextTurn={next}
                        onMakeTurn = {this.makeTurn}
                        onCompleteTurn = {this.completeTurn}
                    />}
                    </div>
                    <div className="middleRed">
                    
                    {mainCard==null && <div className="startButton" onClick = {() => this.startNewGame()}></div>}

                    <div className="modal_holder">
                        {mainCard!=null && <img className="uno" src={require('../img/uno.png')} />}
                    
                            {mainCard!=null && <div className="mainCard">
                            <div className="mainCardPileBox">
                                <Card card={this.state.mainCard}/>
                            
                            <div title='click to grab a card' onClick = {() => this.grabCardFromDesk()} className='pile newCard red'>
                                <img className="angle" src={require('../img/unoCardBack.png')} />
                            </div>
                            
                            </div>
                            
                            <div className="direction">Game direction:</div>
                                <div className="direction active">{forward ? 'clockwise':'conterclockwise'}</div>
                            
                            
                            
                            </div>}

                            {modal ? <PopUp onColor={this.ChooseColor} onClose={this.toggleModal}/> : null}

                            {mainCard!=null && 
                            <div className="messageBox">
                            {messageBox.map(message=>
                                <div className={messageBox.indexOf(message)==0 ? 'message' : 'messageExpired'}>{message}</div>
                                )}
                            </div>}
                        </div>
                        
                    </div>
                    {mainCard!=null && <div>
                    <Player 
                        key={player2.id} 
                        player={player2} 
                        turn={turn}
                        nextTurn={next}
                        onMakeTurn = {this.makeTurn}
                        onCompleteTurn = {this.completeTurn}
                    />
                    </div>}
                </div>
                <div className="bottom">
                    <div className="leftBottomCorner">
                    <button onClick = {() => this.handleEndRound()}>END ROUND</button>
                    
                    <button onClick = {() => this.handleAI()}>run AI</button>

                    </div>
                    {mainCard!=null && <div>
                    <Player 
                        key={player3.id} 
                        player={player3} 
                        turn={turn}
                        nextTurn={next}
                        onMakeTurn = {this.makeTurn}
                        onCompleteTurn = {this.completeTurn}
                    />
                        </div>}
                    <div>
                        {mainCard==null && <p className='message'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem 
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        </p>}
                    </div>
                </div>
            </div>

            {gameOver && <RedirectComponent path={'gameover'} players={players}/>}
                </Fragment>
        }
        </PlayerContext.Consumer>
        )
    }
}

CardDesk.contextType = PlayerContext;
export default CardDesk;