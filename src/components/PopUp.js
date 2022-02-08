
import React, { useEffect } from 'react';

export default function PopUp(props) {
  
  const colors = ['yellow','green', 'red', 'blue']
  
  function handleChooseColor(color) {
    props.onClose()
    props.onColor(color)
  }
  
  return  <div className="modal">
       <div className="direction">Choose a color:</div>
       <div className="colorCards">
         {colors.map(color=> 
            <div key={color} onClick={()=> handleChooseColor(color)} className={`card ${color}`}></div>  
          )}
      </div>
    </div>;
}



