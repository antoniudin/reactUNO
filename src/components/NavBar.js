import React, { useState } from 'react';
import RedirectComponent from './RedirectComponent';

export default function NavBar() {
        const [data, setData] = useState(null)
  return <div className='navBar'>
            {data!=null && <RedirectComponent path={data}/>}
            <div className="navPlay" onClick = {()=> setData('game')}></div>
            <div className="navAbout" onClick = {()=> setData('about')}></div>
      </div>;
}
