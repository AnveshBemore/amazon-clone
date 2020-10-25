import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Payment from './Payment';
import  { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise=loadStripe(
  "pk_test_51Hfpq1EeRnv1gmoWtGDS9vTZzoZOiwPDcdjHFRgKAUwKwjI4mFMPXoySXSXpoOVkjwoKDN5Fg7mbZuU2ne8l0Lv500pejX9mH4"
);

function App() {
  const[{},dispatch]=useStateValue();

  useEffect(()=>{
    //will only run once when the app component loads..
    auth.onAuthStateChanged(authUser =>{
      console.log('The User is >>>',authUser);
      if(authUser){
        //the user just logged in /the user wasd login in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else{
        //the user is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })

  },[])
  return (
    //BEM
    <Router>
        <div className="app">
         <Switch>
              <Route path="/login">
                  <Login/>
              </Route>
               <Route path="/checkout">
                 <Header/>
                <Checkout/>
               </Route>
               <Route path="/payment">
                 <Header/>
                 <Elements stripe={promise}>
                     <Payment/>
                 </Elements>
               </Route>    
              <Route path="/">
                  <Header/>
                  <Home />
               </Route>      
            </Switch>  
            {/*Home */}
        </div>
    </Router>
  );
}

export default App;
