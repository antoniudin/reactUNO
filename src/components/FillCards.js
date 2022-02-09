import React from 'react';

export default function FillCards(colors) {
    const values = ['W','0','1','2','3','4','5','6','7','8','9','S','R','+2','+4']
    // extreme values for testing
    // const values = ['W','W','W','W','W','W','+2','S','+4','+4','+4','S','R','+2','+4']
    let index = 1;
    let cards = []
    for (var i=0; i<values.length; i++) {
        colors.map(function(color){
            const card = {id:index, color:color,value:values[i],score:parseInt(values[i])}
            cards.push(card)
            index++;
            if (card.value==='W' || card.value==='+4') card.color="W";
            if (card.value=='W' || card.value==='+4' || card.value==='+2' || card.value==='S' || card.value==='R') card.score=20
        })
    }
    
    cards.slice(0,4)
    cards.slice(-4)
    console.log(cards);
    return cards; 
}
