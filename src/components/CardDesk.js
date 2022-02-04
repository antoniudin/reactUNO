import React, {Fragment} from 'react';
import Score from './Score';
import Player from './Player';
import PopUp from './PopUp';
import FillDesk from './FillDesk';
import FillCards from './FillCards';
import RedirectComponent from './RedirectComponent';
import PlayerContext from '../context/PlayerContext';
import Card from './Card';
import RoundOver from './RoundOver';

class CardDesk extends React.Component {    
    state = {
    gameOver: false,
    round: false,
    modal:false,        
    messageBox:[],
    cards: [],
    mainCard: null,
    forward: true,
    amount: 15,
    turn: 1,
    nextTurn: 2,
    desk: [],
    memo: null,
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
        this.handleMessage(`The round started`)
        this.setState({desk})
        this.state.players.map((i)=> this.clearPlayersHand(i.id));
        this.initiateMainCard();
        this.state.players.map((i)=> this.handleCardToPlayer(i.id, this.state.amount))
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
            this.compareTwoCards(cardId, playerId)
        }
        else return null
    }

    compareTwoCards = (cardId, playerId) => {
            const mainCard = this.state.mainCard;
            const currentCard = this.state.cards.find(card=> card.id===cardId)
            if (currentCard.value==="W" || currentCard.value==="+4") {
                this.handleMessage(`player ${playerId} used ${currentCard.value} ${currentCard.color}`)
                this.removeCardFromPlayerBoard(cardId, playerId)
                this.checkSpecialCards(cardId, playerId);
                return true;
            }

            if (mainCard.color===currentCard.color || mainCard.value===currentCard.value) {
                this.handleMessage(`player ${playerId} used ${currentCard.value} ${currentCard.color}`)
                this.removeCardFromPlayerBoard(cardId, playerId)
                this.completeTurn(playerId);
                this.checkSpecialCards(cardId);
            return true;
        } 
        return false
    }

    handleTwoCard = (cardId) => {
        const {nextTurn} =this.state
        this.handleCardToPlayer(nextTurn, 2)
        this.handleMessage(`Player ${nextTurn} pick up 2 cards and forfeit his turn`);
        this.forceCompleteTurn(nextTurn)
    }

    handleFourCard = (cardId, playerId) => {
        const {turn, nextTurn, cards} =this.state
        const mainCard = cards.find(card => card.id==cardId)
        mainCard.color='white'
        this.setState({mainCard})
        this.handleMessage(`player ${nextTurn} pick up 4 cards!`);
        this.handleMessage(`player ${turn} is choosing a color`);
        this.handleCardToPlayer(nextTurn, 4)
        const four = true;
        this.toggleModal(cardId, playerId, four);
    }

    handleWildCard = (cardId, playerId) => {
        const {cards, turn} = this.state
        const mainCard = cards.find(card => card.id==cardId)
        mainCard.color='white'
        this.setState({mainCard})
        this.handleMessage(`wild card! player ${turn} is choosing a color`);
        this.toggleModal(cardId, playerId);
    }

    handleReverseCard = (cardId) => {
        this.handleMessage(`The game direction switched!`);
        this.changeDirection()
    }    

    handleSkipCard = (cardId) => {
        this.handleMessage(`player ${this.state.nextTurn} is skipping his turn!`)
        this.forceCompleteTurn(this.state.nextTurn)
    }

    checkSpecialCards = (cardId, playerId) => {
        const card = this.state.cards.find(card => card.id===cardId)
        switch (card.value) {
            case 'R' : this.handleReverseCard(); break;
            case 'S' : this.handleSkipCard(); break;
            case '+2' : this.handleTwoCard(); break;
            case '+4' : this.handleFourCard(cardId, playerId); break;
            case 'W' : this.handleWildCard(cardId, playerId); break;
        }
    }

    initiateMainCard = () => {
        //this method is raised only once in the beginning of the game
        const mainCard = this.takeCardFromDesk()
        if (mainCard.color=='W') mainCard.color = this.state.colors[Math.floor(Math.random()*this.state.colors.length)]
        this.setState({mainCard})
    }

    handleEndRound = () => {
        this.handleMessage('round is over')
        this.handleMessage('new round started')
        const players = this.state.players;
        let gameOver = false;
        players.map(function(player){
            player.score += Score(player.cards);
            if (player.score>100) {
                gameOver=true; 
            }
        })
        const round = true
        this.setState({players, gameOver, round})
        this.startNewGame();
    }
    
    completeTurn = (playerId) => {
        if (playerId!=this.state.turn || this.state.modal) return null
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
        // this.handleMessage(`Player's ${turn} turn`)
    }

    makeBackwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId>1) turn--; else turn = 3;
        let nextTurn=turn-1;
        if (nextTurn<1) nextTurn=3;
        this.setState({turn, nextTurn})
        // this.handleMessage(`Player's ${turn} turn`)
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

    toggleModal = (cardId, playerId, four) => {
        if (cardId) this.setState({memo: [playerId, four]})
        if (this.state.memo!=null) {
            if (this.state.memo[1]==true) {
                this.forceCompleteTurn(this.state.nextTurn)
            } else this.forceCompleteTurn(this.state.memo[0]);
        this.setState({memo:null})
        }
        this.setState({
         modal: !this.state.modal,
         round: !this.state.round
        });
       }

        grabCardFromDesk = () =>{
            const player = this.state.players.find(player => player.id===this.state.turn)
            if (!player.desk && !this.state.modal) {
                player.desk = true;
                this.handleCardToPlayer(this.state.turn, 1)
                this.handleMessage(`player ${this.state.turn} picked up a card`)
            } else return null
        }

       ChooseColor = (color) => {
        this.handleMessage(`${color} color was choosed`);
        const mainCard = this.state.mainCard;
        mainCard.color=color;
        this.setState({mainCard})
       }

       handleAI = () => {
        const {players, mainCard, turn, nextTurn} = this.state;
        const player = players.find(player => player.id==turn)
        const playerCards = []
        player.cards.forEach((card)=> {
            if (card.value===mainCard.value || card.color==mainCard.color || card.color=='W') playerCards.push(card);
        })
         if (playerCards.length==0) this.grabCardFromDesk(player.id,1);
         this.handleAIhasNoOptions(playerCards, player.id)
       }

       handleAIhasNoOptions = (playerCards, playerId)=> {
        if (playerCards.length==1) {
            const card = playerCards[0].id;
            this.makeTurn(playerId, card)
        }
       }

       handleAIProcessing = () => {
        
       }

    render() { 
        const {turn,mainCard, next, players, gameOver, round, forward, modal, messageBox} = this.state;
        return (
        <PlayerContext.Consumer>
            {PlayerContext => <Fragment>
                {mainCard!=null && <div>
                    <div className="Board">
                        {this.state.players.map(player=> 
                           <Fragment><div className='Inner'>
                            <Player key={player.id} 
                            player={player} 
                            turn={turn}
                            nextTurn={next}
                            onMakeTurn = {this.makeTurn}
                            onGrabCard = {this.grabCardFromDesk}
                            onCompleteTurn = {this.completeTurn}/></div>
                            <div className="Inner">
                                <img className="uno" src={require('../img/uno.png')} />
                                    {mainCard!=null && <div className="mainCard">
                                        <div className="mainCardPileBox">
                                            <Card card={this.state.mainCard} flipped={true}/>
                                            <div title='click to grab a card' onClick = {() => this.grabCardFromDesk()} className='pile newCard red'>
                                                <img className="angle" src={require('../img/unoCardBack.png')} />
                                            </div>
                                        </div>
                                        <div className="direction">Game direction:</div>
                                        <div className="direction active">{forward ? 'clockwise':'conterclockwise'}</div>                            
                                    </div>}
                                    <button onClick = {() => this.handleEndRound()}>END ROUND</button>
                                    <button onClick = {() => this.handleAI()}>run AI</button>
                                        {modal ? <PopUp onColor={this.ChooseColor} onClose={this.toggleModal}/> : null}
                                    {mainCard!=null && 
                                    <div className="messageBox">
                                    {messageBox.map(message=>
                                        <div className={messageBox.indexOf(message)==0 ? 'message' : 'messageExpired'}>{message}</div>
                                        )}
                                    </div>}
                                </div>
                            {gameOver && <RedirectComponent path={'gameover'} players={players}/>}
                            </Fragment>
                        )}
                        </div>    
                    </div>}
                    
                    {mainCard==null && <div className="startButton" onClick = {() => this.startNewGame()}></div>}
                    
                </Fragment>}
        </PlayerContext.Consumer>
            )
        }
}

CardDesk.contextType = PlayerContext;
export default CardDesk;
                        
 