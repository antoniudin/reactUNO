import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

export default function Users (props) {
    const [users, setUsers] = useState([]);

    useEffect (()=> {
        async function getUsers () {
            const result = await axios ('https://jsonplaceholder.typicode.com/users');
            setUsers(result.data);
        }
        getUsers();
    })

    return (
        <div>
            {users.map(user => 
            <p key={user.id}>{user.name}</p>
            )}
        </div>
    );
}
