import React, {useState} from 'react'
import './App.css';
import  Navbar from './components/Navbar/Navbar.js'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home.js'
import Videos from './pages/Videos/Video.js'

function App() {

  const [sidebar,setSidebar] = useState(true);



   return (
    <div >
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />}/>
        <Route path='/video/:categoryId/:videoId' element ={<Videos/>} />

      </Routes>
    </div>
  );
}

export default App;
