import React from 'react';

export default function Card(props) {
  const {card, onClick} = props;

  return <div onClick={onClick} className={`newCard unoCard ${card.color}`}>
            {card.value}
            <div className='oval'></div>
            <div className='mdl'>{card.value}</div>
            <div className='mdl2'>{card.value}</div>
            <div className='u_d'>{card.value}</div>
        </div>;
}
