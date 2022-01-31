
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
  return (
   <div className="modal">
      <div className="colorCards">
        <div onClick={()=> this.handleChooseColor('yellow')} className="card yellow"></div>
        <div onClick={()=> this.handleChooseColor('green')} className="card green"></div>
        <div onClick={()=> this.handleChooseColor('red')} className="card red"></div>
        <div onClick={()=> this.handleChooseColor('blue')} className="card blue"></div>
      </div>
    </div>
  );
 }
}