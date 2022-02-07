import React from 'react';

const colors = ['blue','yellow','green','red']

function noSpecial (playerCards) {
    let best = 0 
    let bestCard;
    playerCards.forEach(card => {
        if (card.score>best) {
            best=card.score
            bestCard = card;
        }
    }) 
    return bestCard;
}
 
export function colorAI(playerId) {
    
    console.log('123');
}
function colorPlayerNeed (playerCards) {
    //have to consider if player has only wild cards
    let colors = ['yellow','red','green','blue']
        const color = colors[Math.floor(Math.random()*colors.length)]
        localStorage.setItem("color",color)
}

function manySpecial (sortedCards, playerCards) {
    const card = sortedCards[Math.floor(Math.random()*sortedCards.length)]
    if (card.color=='W') {
        colorPlayerNeed(playerCards)
        return card
    }
        return card
    }

export default function AI(playerCards) {
    let sortedCards=[];
    //check if special cards
    playerCards.forEach(card => {
        if (card.score==20) sortedCards.push(card)
    })
    console.log(sortedCards);
    //if there is no special cards
    switch (sortedCards.length) {
        case 0: return noSpecial(playerCards); break;
        default: return manySpecial(sortedCards, playerCards); break;
    }
        
        
}
