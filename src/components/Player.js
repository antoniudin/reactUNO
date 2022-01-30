import React, { Component } from 'react';
class Player extends Component {
    render() { 
        const {player, turn, nextTurn, onMakeTurn, onCompleteTurn, mainCard} = this.props;
        return (
            <div className="playerBoard">
                <div className={(turn===player.id ? 'active' : 'noActive')}>{player.name}</div>
                 <div className="scoreTitle">Score: {player.score}</div>
                 <button onClick={onCompleteTurn.bind(this, player.id)}>Skip my turn</button>

                 <div className="playerCards">
                 {player.cards.map(card=>
                    <div key={card.id} 
                    onClick={onMakeTurn.bind(this, player.id, card.id)} 
                    className={`newCard unoCard ${card.color}`}>
                        {card.value}
                        <div className='oval'></div>
                        <div className='mdl'>{card.value}</div>
                        <div className='mdl2'>{card.value}</div>
                         <div className='u_d'>{card.value}</div>
                    </div>
                    
                    // <div className="newCard unoCard yellow">1
                    // <div className='oval'></div>
                    // <div className='mdl'>1</div>
                    // <div className='mdl2'>1</div>
                    // <div className='u_d'>1</div>
                    // </div>
                    
                    
                    )}
                    </div>
            </div>

            
        );
    }
}
 
export default Player;


  


  
  


