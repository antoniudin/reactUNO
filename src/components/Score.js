import React, {useState} from 'react';

export default function countPlayerScore(array) {
  const newArray = [];
  array.map(function(card){
    if (card.value=="W" || card.value=="+4") newArray.push(50);
    else if (card.value=="+2" || card.value=="S" || card.value=="R") newArray.push(20);
    else {
      newArray.push(parseInt(card.value))
    }
  })
  return newArray.reduce((a, b) => a + b);
}
