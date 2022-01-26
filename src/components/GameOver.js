import React, { useEffect, useContext } from 'react';
import PlayerContext from '../context/PlayerContext';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default function GameOver() {
  const playerContext = useContext(PlayerContext)
  return <div>
    GAME OVER
      {playerContext.players.map(player=> 
        <p key={player.id}>{player.name} <span>Score:</span> {player.score}</p>
      )}   
      <Link to="/desk">
        <button>Start new game</button>
      </Link>
    </div>;
}
