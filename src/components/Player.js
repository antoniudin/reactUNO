import React, { Component } from 'react';
import Card from './Card';

class Player extends Component {
    render() { 
        const {player, turn, onMakeTurn, onCompleteTurn, onGrabCard} = this.props;
        return (
            <div className='playerBoard'>
                <div className='playerTitleLine'><div className={(turn===player.id ? 'active' : 'noActive')}>{player.name}</div>
                 {turn===player.id && <div className='playerIsGoing'>is going to make a turn</div>}</div>
                 <div className='scoreTitle'>Score: {player.score}</div>
                 
                 {player.id==turn && player.id==3 && <button className="customButton" onClick={onCompleteTurn.bind(this, player.id)}>Skip</button>}
                 {player.id==turn && player.id==3 && <button className="customButton" onClick={onGrabCard.bind(this, player.id)}>Grab a card</button>}
                 {player.cards.length==1 && <button className="cloudUno"> UNO! </button>}
                
                 <div className='playerCards'>
                 {player.cards.map(PlayerCard=>
                    <Card flipped={player.id==3 ? true : false} key={PlayerCard.id} card={PlayerCard} onClick={onMakeTurn.bind(this, player.id, PlayerCard.id)}/>
                    )}
                    </div>
            </div>

            
        );
    }
}
 
export default Player;


  


  
  


