import React from 'react'
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'



export default function Readnow() {

  const[articles,setArticles]=useState([]);
  const navigate= useNavigate();
  const[err,setErr]=useState();
  
  const userlogout = () => {
    { localStorage.clear("mytoken"); alert("logout successfully"); navigate ('/login')}
   }

  useEffect(() => {
   fetch('http://localhost:3001/auth/v1/isAuthenticated',{
     method:"POST",
     headers :{
       "Authorization":`Bearer ${localStorage.getItem("mytoken")}`
     }
   }).then(res => res.json())
     .then(data => {
            console.log(data);
       if(!data.isAuthenticated){
         navigate("/login")
       } else {
         fetch('http://localhost:3001/api/v1/news', {
           headers :{
             "Authorization":`Bearer ${localStorage.getItem("mytoken")}`
           }
         }).then(res => res.json())
           .then(data => { console.log(data); setArticles(data);
               console.log(articles);
               }).catch(error => setErr(error.message))
       }
     })
  },[])
 return (
<div>
<div className='container'>
   <div className='mt-2 offset-4'>
     <button className='btn btn-danger' onClick={userlogout}>Logout</button> </div>
     <div className='row mt-2'>
       {
           articles.map( obj =>  <div key={obj.id} className="card" style={{"width": "18rem"}}>
           <img className="card-img-top" src={obj.urlToImage} alt="Card image cap"/>
           <div className="card-body">
             <h5 className="card-title"> {obj.articlesauthor} </h5>
             <p className="card-text">{obj.description}</p>
             <a href="#" className="btn btn-primary">Read Later</a>
           </div>
         </div>
               )
       }
</div>
</div>
 </div>
 )
}