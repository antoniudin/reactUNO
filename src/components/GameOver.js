import React, { useContext, useState } from 'react';
import PlayerContext from '../context/PlayerContext';
import RedirectComponent from './RedirectComponent';

export default function GameOver(props) {
  const [data, setData] = useState(null);
  const playerContext = useContext(PlayerContext)

  return <div className='gameOver'>
            {data!=null && <RedirectComponent path={data}/>}
            <div className='finalScore'>
              <img className='' src={require('../img/gameover.png')} />
                {playerContext.players.map(player=> 
                <p key={player.id}>{player.name} <span>Score:</span> {player.score}</p>
              )}   
            <div className='goButtonsContainer'>
              <div className='gameOverHome' onClick = {()=> setData('')}></div>
              <div className='gameOverPlay' onClick = {()=> setData('game')}></div>
            </div>
          </div>
    </div>;
}
