import React, {useState, useEffect} from 'react';

export default function GameLog(phrase) {
    const [log, setLog] = useState('firs record,');
    
    return <div>
        <p>{log}</p>
        <button onClick={()=> setLog(log + "new record,")}>Make a record</button>
    </div>;
}
