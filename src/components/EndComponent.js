import React, { Component } from 'react';

class EndComponent extends Component {
    
    handleClose = () => {
        this.props.onClose();
        this.props.onStart();
    }
    
    render() { 
        const roundOver = <div>
        {this.props.players.map(player => 
            <p>{player.name} score: {player.score}</p>
            )}
        <button onClick={()=>this.handleClose()}>CLOSE</button>
        </div>;
        
        const gameOver = <div>
        <p>GAME OVER</p>
        {this.props.players.map(player => 
            <p>{player.name} score: {player.score}</p>
            )}
        </div>;
        
        return (
            <div className="modal">
                {this.props.gameOver ? gameOver : roundOver }
            </div>
        );
    }
}
 
export default EndComponent;