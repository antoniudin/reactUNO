import React, {useEffect, useState} from 'react';
import RedirectComponent from './RedirectComponent';
import TestRouteComponent from './RedirectComponent';

export default function NavBar() {
        const [data, setData] = useState(null)
  return <div className='navBar'>
        {data!=null && <RedirectComponent path={data}/>}
        <div className="navButton">
            <img onClick = {()=> setData('game')} src={require('../img/play.png')} />
        </div>
        <div className="navButton">
            <img onClick = {()=> setData('about')} src={require('../img/about.png')} />
        </div>
  </div>;
}
