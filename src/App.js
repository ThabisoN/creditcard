import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-credit-cards/es/styles-compiled.css';
import 'bootstrap/dist/css/bootstrap.css';
import { CreditCard} from './Components/CreditCard';
import { ValidCreditCard } from './Components/ValidCreditCard'
import { BrowserRouter, Router, Route, Switch, NavLink, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='App container'>
          <h3 className='d-flex justify-content-center m-3'>
            Rank Group Credit Cards
          </h3>
          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className='navbar-nav'>
              <li className='nav-item- m-1'>
                <NavLink className="btn btn=light btn-outline-primary" to="/creditcard">
                  New Credit Cards
                </NavLink>
              </li>
              <li className='nav-item- m-1'>
                <NavLink className="btn btn=light btn-outline-primary" to="/validcreditcard">
                  Valid Credit Cards
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/creditcard' element={<CreditCard />} />
            <Route path='/validcreditcard' element={<ValidCreditCard />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
