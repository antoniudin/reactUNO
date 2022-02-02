
import React, { Component } from "react";

export default class PopUp extends Component {
  
  handleClose = () => {
   this.props.onClose();
  };

  handleChooseColor = (color) => {
    this.props.onClose();
    this.props.onColor(color);
   };

render() {
  const {onClose, onChooseColor} = this.props;
  const colors = ['yellow','green', 'red', 'blue']
  return (
   <div className="modal">
      <div className="colorCards">
        {colors.map(color=> 
            <div key={color} onClick={()=> this.handleChooseColor(color)} className={`card ${color}`}></div>  
          )}
      </div>
    </div>
  );
 }
}