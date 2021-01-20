import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect  } from "react-router-dom";
import PhoneList from "./components/PhoneList";
import Header from "./components/Layout/Header";
import EditPhone from "./components/EditPhone";
import AddPhone from "./components/AddPhone";
//import useToken from "./hooks/useToken";


import { GlobalProvider } from './context/GlobalState';

import "./App.css";

function App() {

//const { bToken, handleTokenViaPrompt } = useToken();



///////////////////// AFFICHAGE DES COMPOSANTS ////////////////////

return (
  <GlobalProvider> 
    <Router>               
        <Header />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <PhoneList />}
            />
            <Route path="/addPhone" 
            component={() => <AddPhone />} 
            />
            <Route exact path="/">

            </Route>
            <Route exact path="/editPhone/:id" 
            component= {(props, id) => <EditPhone  {...props}id={id}/>} 
            />
          </Switch>
    </Router>
  </GlobalProvider>
  );

}


export default App;



