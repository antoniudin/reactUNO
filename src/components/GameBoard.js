import React, { Component } from 'react';

class GameBoard extends Component {
    //This component is useless and can be deleted
    
    render() { 
        <button onClick={()=> this.click()}>GO</button>
        const playerTemplate =   <div className="experimantalPlayerBoard">
        <p>Player Name</p>
        <div className="playerCards">
        <div className="card green">9</div>
        <div className="card blue">2</div>
        <div className="card yellow">1</div>
        </div>
    </div>;
        return (
            <div className="gameBoard">
                <div className="upper">
                    <div>
                        {playerTemplate}
                    </div>
                    <div>CARDS PILE</div>
                    <div>
                        {playerTemplate}
                    </div>
                </div>
                <div className="bottom">
                    <div></div>
                    <div>
                        {playerTemplate}
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
 
export default GameBoard;