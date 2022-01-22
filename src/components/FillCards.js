import React from 'react';

export default function FillCards() {
    const colors = ['yellow', 'blue', 'red', 'green','yellow', 'blue', 'red', 'green']
    const values = ['0','1','2','3','4','5','6','7','8','9','S','+2','W','+4']
    let index = 1;
    let cards = []
    for (var i=0; i<values.length; i++) {
        colors.map(function(color){
            const card = {
                id:index,
                color:color,
                value:values[i]
            }
            cards.push(card)
            index++;
        })
    }
    cards.map(function(card){
        if (card.value=='W' || card.value=='+4' ) {
            card.color="W";
        }
    })
    return cards; 
}
