import React, { useContext } from 'react';
import PlayerContext from '../context/PlayerContext';
import { Link } from 'react-router-dom';

export default function GameOver() {
  const playerContext = useContext(PlayerContext)
  return <div className="gameOver">
            <div className="finalScore">
              <img className="" src={require('../img/gameover.png')} />
                {playerContext.players.map(player=> 
                <p key={player.id}>{player.name} <span>Score:</span> {player.score}</p>
              )}   
            <Link to="/desk"><button className="startGameButton">Start new game</button></Link>
          </div>
    </div>;
}
