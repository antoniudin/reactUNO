import React, { Component } from 'react';
import Card from './Card';

class Player extends Component {
    render() { 
        const {player, turn, nextTurn, onMakeTurn, onCompleteTurn, mainCard} = this.props;
        return (
            <div className='playerBoard'>
                <div className='playerTitleLine'><div className={(turn===player.id ? 'active' : 'noActive')}>{player.name}</div>
                 {turn===player.id && <div className='playerIsGoing'>is going to make a turn</div>}</div>
                 <div className='scoreTitle'>Score: {player.score}</div>
                 
                 <button onClick={onCompleteTurn.bind(this, player.id)}>Skip turn</button>
                
                 <div className='playerCards'>
                 {player.cards.map(PlayerCard=>
                    <Card key={PlayerCard.id} card={PlayerCard} onClick={onMakeTurn.bind(this, player.id, PlayerCard.id)}/>
                    )}
                    </div>
            </div>

            
        );
    }
}
 
export default Player;


  


  
  


