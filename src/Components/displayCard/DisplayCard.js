import React,{useState,useEffect} from 'react';
import Card from '../card/Card';



export default function DisplayCard() {
        const [news, setNews]= useState([]);


useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=apple&from=2022-11-26&to=2022-11-26&sortBy=popularity&apiKey=b9d4300cfd97498aaf1d54cd65436ef9')
    .then(data => data.json())
    .then(data => { console.log(data.articles); setNews(data.articles); console.log(news);})
    .catch(error => error(error.message))
},[])
  return (
    <div className='container'>
         <div className='text-center mt-5'>
                   <h2 title='heading'> Top Headlines. </h2>
            </div>
            <div className='row mt-2'>
        {
            news.map(obj => <Card key= {obj.title} img={obj.urlToImage} auth={obj.author} desc={obj.description
            }
             />)
        }
</div>
    </div>
  )
}

