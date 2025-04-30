import axios from 'axios';
import React, { useEffect, useState } from 'react'
export default function Just_axios() {
    const [img_url,setImg_url]=useState();
    const [img,setImg]=useState();
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/')
            .then(response => {
                setImg_url(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);
  return (
    <div>{img_url}</div>
  )
}
