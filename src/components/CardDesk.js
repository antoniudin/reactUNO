import React, {Fragment} from 'react';
import Score from './Score';
import Player from './Player';
import PopUp from './PopUp';
import FillDesk from './FillDesk';
import FillCards from './FillCards';
import RedirectComponent from './RedirectComponent';
import PlayerContext from '../context/PlayerContext';
import Card from './Card';
import AI from './AI';


class CardDesk extends React.Component {    
    state = {
    gameOver: false,
    round: false,
    modal:false,        
    messageBox:[],
    cards: [],
    mainCard: null,
    forward: true,
    amount: 7,
    turn: 3,
    nextTurn: 1,
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

    handleDelay(turn){
        setTimeout(() => {this.handleAI(turn)}, 3000)
      }
      
      getCard (cardId) {
        return this.state.cards.find(card => card.id===cardId)
      }

      getPlayer (playerId) {
        return this.state.players.find(player => player.id===playerId)
      }

    handleMessage = (message) => {        
        const messageBox = this.state.messageBox;
        messageBox.unshift(message.replace('W', 'wild card'))
        this.setState({messageBox})
    }

    startNewGame = (winner) => {
        const {players, amount, turn} = this.state
        const desk = FillDesk()
        if (winner) this.setState({turn:winner})
        this.handleMessage(`Player's ${turn} turn`)
        this.setState({desk})
        players.forEach((player)=> this.clearPlayersHand(player.id))
        this.initiateMainCard()
        players.forEach((player)=> this.handleCardToPlayer(player.id, amount))
    }

   clearPlayersHand = (playerId) => {
    const player = this.getPlayer(playerId)
    player.cards = [];
    this.setState({player})
   }

    updateMainCard = (cardId) => {
        const mainCard = this.getCard(cardId)
        this.setState({mainCard})
    }

    removeCardFromPlayerBoard = (cardId, playerId) => {
        const player = this.getPlayer(playerId)
        const card = player.cards.find(card => card.id===cardId)
        const index = player.cards.indexOf(card)
        player.cards.splice(index,1);
        this.setState({player});
        this.updateMainCard(cardId);
    }

    makeTurn = (playerId, cardId) => {
        if (playerId==this.state.turn && !this.state.modal) {
            const currentCard = this.getCard(cardId)
            this.compareTwoCards(cardId, playerId)
        } else return null
        this.checkRoundIsOver(playerId);
    }


    compareTwoCards = (cardId, playerId) => {
        const mainCard = this.state.mainCard;
        const currentCard = this.getCard(cardId)
        if (mainCard.color===currentCard.color || mainCard.value===currentCard.value || currentCard.color==="W") {
            this.handleMessage(`player ${playerId} played ${currentCard.value} ${currentCard.color}`)
            this.removeCardFromPlayerBoard(cardId, playerId)
            this.checkSpecialCards(cardId, playerId);
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
        if (turn!=3) {
            this.handleAIColor()
            this.forceCompleteTurn(nextTurn)
            this.handleCardToPlayer(nextTurn, 4)
            return null
        }
        const four = true;
        this.handleCardToPlayer(nextTurn, 4)
        this.toggleModal(cardId, playerId, four);
    }

    
    handleWildCard = (cardId, playerId) => {
        const {cards, turn} = this.state
        const mainCard = cards.find(card => card.id==cardId)
        mainCard.color='white'
        this.setState({mainCard})
        if (turn!=3) {
            this.handleAIColor()
            this.forceCompleteTurn(turn)
            return null
        }
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
        const card = this.getCard(cardId)
        switch (card.value) {
            case 'R' : this.handleReverseCard(); break;
            case 'S' : this.handleSkipCard(); break;
            case '+2' : this.handleTwoCard(); break;
            case '+4' : this.handleFourCard(cardId, playerId); break;
            case 'W' : this.handleWildCard(cardId, playerId); break;
            default: this.completeTurn(playerId); break;
        }
    }

    initiateMainCard = () => {
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
        const winner = this.state.turn
        this.setState({players, gameOver, round})
        this.startNewGame(winner);
    }
    
    completeTurn = (playerId) => {
        const {turn, modal, forward} = this.state
        if (playerId!=turn || modal) return null
        else {
            const player = this.getPlayer(playerId)
            player.desk=false
            if (forward) this.makeForwardTurn(playerId);
            else this.makeBackwardTurn(playerId);
        }
        this.checkRoundIsOver(playerId);
    }

    forceCompleteTurn = (playerId) => {
        if (this.state.forward) this.makeForwardTurn(playerId);
        else this.makeBackwardTurn(playerId);
    }

    checkRoundIsOver = (playerId) => {
        const player = this.getPlayer(playerId)
        if (player.cards.length===0) {
            this.handleEndRound();    
        }
    }

    makeForwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId<3) turn++; else turn = 1;
        let nextTurn=turn+1;
        if (nextTurn>3) nextTurn=1
        this.turnHelper(turn, nextTurn)
    }
    
    makeBackwardTurn = (playerId) => {
        let turn = playerId;
        if (playerId>1) turn--; else turn = 3
        let nextTurn=turn-1;
        if (nextTurn<1) nextTurn=3;
        this.turnHelper(turn, nextTurn)
    }

    turnHelper = (turn, nextTurn) => {
        this.setState({turn, nextTurn})
        this.handleMessage(`Player's ${turn} turn`)
        if (turn!=3 ) this.handleDelay(turn)
    }

    changeDirection = () => {
        const {turn} = this.state
        this.state.forward = !this.state.forward
        this.completeTurn(turn)
    }

    handleCardToPlayer = (playerId, amountOfCards) => {
        let counter = 0;
        while (counter<amountOfCards) {
            const result = this.takeCardFromDesk();
            const player = this.getPlayer(playerId)
            player.cards.push(result)
            counter++;
            this.setState({player})
        }
    }

    takeCardFromDesk = () => {
        const {desk, cards} = this.state
        const card = desk[Math.floor(Math.random()*desk.length)]
        const cardIndex = desk.indexOf(card)
        desk.splice(cardIndex,1);
        const currentCard = cards.find(c => c.id===card);
        this.setState({desk})
        return currentCard;
    }

       toggleModal = (cardId, playerId, four) => {
        const {memo, modal, round, nextTurn} = this.state
        if (cardId) this.setState({memo: [playerId, four]})
        if (memo!=null) {
            if (memo[1]==true) {
                this.forceCompleteTurn(nextTurn)
            } else this.forceCompleteTurn(memo[0]);
        this.setState({memo:null})
        }
        this.setState({
         modal: !modal,
         round: !round
        });
       }

        grabCardFromDesk = () =>{
            const {turn, modal} = this.state;
            const player = this.getPlayer(turn)
            if (!player.desk && !modal) {
                player.desk = true;
                this.handleCardToPlayer(turn, 1)
                this.handleMessage(`player ${turn} picked up a card`)
            } else return null
        }

       ChooseColor = (color) => {
        const mainCard = this.state.mainCard;
        mainCard.color=color;
        this.setState({mainCard})
        this.handleMessage(`${color} was chosen`);
       }

       handleAI = (playerId) => {
        const {players, mainCard} = this.state;
        const player = this.getPlayer(playerId)
        const playerCards = []
        player.cards.forEach((card)=> {
            if (card.value===mainCard.value || card.color===mainCard.color || card.color==='W') playerCards.push(card);
        })
         switch (playerCards.length) {
            case 0: this.handleAIZero(player.id); break;
            case 1: this.makeTurn(player.id, playerCards[0].id); break; 
            default: this.handleAImanyOptions(playerCards, player.id); break;
         }
       }

        handleAIZero = (playerId) => {
            const player = this.getPlayer(playerId)
            if (player.desk==true) this.completeTurn(playerId)
            else {this.grabCardFromDesk(playerId,1);
            this.handleAI(playerId);}
        }

        handleAImanyOptions = (playerCards, playerId) => {
            const aiPoint = AI(playerCards);
            this.makeTurn(playerId, aiPoint.id)
        }

        handleAIColor = () => {
            const colors=[]
            const player = this.getPlayer(this.state.turn)
            player.cards.forEach(card => {
                if (card.color!='W') colors.push(card.color)
            })
            colors.reverse()
            this.ChooseColor(colors[0])
        }

    render() { 
        const {turn, mainCard, next, players, gameOver, forward, nextTurn, modal, messageBox} = this.state;
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
                                        {modal && turn==3 ? <PopUp playerId={turn} onAIColor={this.handleAIColor} onColor={this.ChooseColor} onClose={this.toggleModal}/> : null}
                                    {mainCard!=null && 
                                    <div className="messageBox">
                                    {messageBox.map(message=> 
                                        <div className={messageBox.indexOf(message)===0 ? 'message' : 'messageExpired'}>{message}</div>
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
                        
 