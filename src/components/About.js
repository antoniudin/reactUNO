import React, { useState } from 'react';
import RedirectComponent from './RedirectComponent';

export default function About() {
  
    const [data, setData] = useState(null);
  
  return <div className="homePage">
      {data!=null && <RedirectComponent path={data}/>}
      <div className='goButtonsContainer'>
        <div className='gameOverHome' onClick = {()=> setData('')}></div>
        <div className='gameOverPlay' onClick = {()=> setData('game')}></div>
      </div>
      <div className="center">
      Here is the first version of my React JS UNO project where I implemented the basic functionality of the famous game. 
      I am not a designer and all the cards in this game 
      were drawn by css only, so don't judge UI strictly.
      
      <br/><br/>
      
      If you face an issue or notice an error,  I would like to hear about it. 
      Also, if you like it, I don't mind to get a star from you on <span> </span>
      <a href="https://github.com/antoniudin/reactUNO">GitHub</a> <br/><br/> Thank you!
      </div>
  </div>;
}
