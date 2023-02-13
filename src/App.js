import React from 'react';
import './App.css';
import Footer from './Components/footer/Footer';
import Header from './Components/header/Header';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/login/Login';
import Register from './Components/register/Register';
import ReadNow from './Components/readNow/ReadNow';
import Card from './Components/card/Card';
import DisplayCard from './Components/displayCard/DisplayCard';
// import DisplayCard from './test/displayCard.spec';

class App extends React.Component {
  render() {
    return (
      <div>

        <BrowserRouter>
          <Suspense fallback={<div><h2>Loading...</h2></div>}>
            <Header />
            <Routes>
              
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
               <Route path='/dashboard' element={<DisplayCard />} />
              <Route path='/readnow' element={<ReadNow/>}/> 
              <Route path='/' element={<Register />} />
              <Route path='/card' element={<Card/>}/> 
         
              
            </Routes>
            <Footer />
          </Suspense>
        </BrowserRouter>

      </div>

    )

  }
}
export default App;