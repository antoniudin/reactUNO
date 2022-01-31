import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
 export default function RedirectComponent(props) {
   const navigate = useNavigate()
    useEffect (() => { 
      navigate(`/${props.path}`);
      console.log(props.path);
    })
   return <></>;
 }
 


