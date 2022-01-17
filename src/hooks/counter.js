import React, { Component, Fragment, useState} from 'react';
import useDocumentTitle from './useDocumentTitle';

function Counter(prop) {
    const [count, setCount] = useState(prop.count);
    const [name, setName] = useState('');

    useDocumentTitle(`${name} + ${count}`);    

    return ( 
        <Fragment>
            <input onChange={e=> setName(e.target.value)}/> 
            <div>{name} clicked Counter: {count} times</div>
            <button onClick={()=> setCount(count+1)}>Click</button>
        </Fragment>
     );
}

export default Counter;