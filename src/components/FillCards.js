import React from 'react';

export default function FillCards(colors) {
    const values = ['W','0','1','2','3','4','5','6','7','8','9','S','R','+2','+4']
    let index = 1;
    let cards = []
    for (var i=0; i<values.length; i++) {
        colors.map(function(color){
            const card = {id:index, color:color,value:values[i]}
            cards.push(card)
            index++;
            cards.push(card)
            index++;
            if (card.value=='W' || card.value=='+4' ) card.color="W";
        })
    }
    cards.splice(-4);
    cards.splice(4,4)
    return cards; 
}
