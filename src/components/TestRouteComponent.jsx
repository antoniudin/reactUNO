import React, { useContext } from 'react';
import { useEffect } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import PlayerContext from '../context/PlayerContext';
 
 export default function TestRouteComponent(props) {
   const navigate = useNavigate()
   const playerContext = useContext(PlayerContext)
    useEffect (() => { 
      playerContext.onUpdate(props.players)
      console.log("Test component was here");
      navigate(`/gameover`);
    })
   return <></>;
 }
 


