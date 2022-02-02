import React from 'react';
import { useEffect } from 'react/cjs/react.development';

export default function Card(props) {
const {card, onClick, flipped} = props;

const Card = <div onClick={onClick} className={`newCard unoCard ${flipped ? card.color : null}`}>
  {card.value}
  <div className='oval'></div>
  <div className='mdl'>{card.value}</div>
  <div className='mdl2'>{card.value}</div>
  <div className='u_d'>{card.value}</div>
</div> 

const FlippedCard = <div className='pile newCard red'>
  <img className="angle" src={require('../img/unoCardBack.png')} />
</div>

  return flipped ? Card : FlippedCard;
}
