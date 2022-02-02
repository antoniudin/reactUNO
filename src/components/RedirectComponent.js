import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerContext from '../context/PlayerContext';
 
 export default function RedirectComponent(props) {
   const navigate = useNavigate()
   const playerContext = useContext(PlayerContext) 
   
   useEffect (() => { 
      playerContext.onUpdate(props.players);
      navigate(`/${props.path}`);
    })
   return <></>;
 }
