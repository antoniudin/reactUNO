import React, { Component } from 'react';
class Player extends Component {
    state = {  } 
    render() { 
        const {player, turn, nextTurn, onMakeTurn, onCompleteTurn} = this.props;
        return (
            <div>
                <div className={(turn===player.id ? 'textgreen' : 'textblack')}>{player.name}</div>
                 <p>Score: {player.score}</p>
                 <button onClick={onCompleteTurn.bind(this, player.id)}>Skip my turn</button>

                 <div className="playerCardBoard">
                 {player.cards.map(card=>
                    <div key={card.id} onClick={onMakeTurn.bind(this, player.id, card.id)} className={`card ${card.color}`}>{card.value}
                    </div>
                    )}
                    </div>
            </div>

            
        );
    }
}
 
export default Player;


  


  
  


