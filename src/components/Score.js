import React, {useState} from 'react';

export default function countPlayerScore(array) {
  const newArray = [];
  if (array.length==0) return 0;
  array.map(function(card){
    if (card.value=="W" || card.value=="+4") newArray.push(20);
    else if (card.value=="+2" || card.value=="S" || card.value=="R") newArray.push(20);
    else {
      newArray.push(parseInt(card.value))
    }
  })
  return newArray.reduce((a, b) => a + b);
}
