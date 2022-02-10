import React from 'react';





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

function manySpecial (sortedCards, playerCards) {
    const card = sortedCards[Math.floor(Math.random()*sortedCards.length)]
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
