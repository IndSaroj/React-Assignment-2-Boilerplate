import React from 'react'

export default function Card(props) {

  const readLater = () => { 
    
    const value =  {
    'articlestitles':`${props.title}`,
    'articlesimage':`${props.img}`,
    'articlesauthor':`${props.auth}`,
    'articlesdescription' :`${props.desc}`
}
fetch('http://localhost:3001/api/v1/news', {
   method:"POST",
   headers: {
     "Content-Type": "application/json",
     "Authorization" :`Bearer ${localStorage.getItem("token")}`
   },
   body:JSON.stringify(value)
 }).then(res => { console.log(res)
   alert('News Added')
 }).catch(error => console.log(error.message))
}


  return (
    <div className='col-md-4  mt-4'>
      <div className="card" style={{ "width": "18rem" }} key={props.title}>
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.auth}</h5>
          <p className="card-text">{props.desc}</p>
          <button className='btn btn-primary' onClick={readLater}>Read Later</button>
        </div>
      </div>
</div>
  )
}