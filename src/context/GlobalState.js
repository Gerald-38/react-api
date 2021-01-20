import React ,  {createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer';
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// Initial state
const initialState = {
    phones : [],
    token: "",
    //token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTAwMjMyNDcsImV4cCI6MTYxMDAyNjg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZ2VyYWxkIn0.BvZQZLMp1DynomFF_-6q4k7RS8MJKeT-sBCTcdmAsSPzjhujWJJc5kC9x3V7gqRaUy2Vjks-yVBzxcxmfDWC4DEpF2yzTT6M-DXQVzArQpkfgSCqytxnTtbeT9wq1D98QlfYXOSOyZ-qY19wXHxz7Lil7mMzJYAC5IoPFFiYyQ9UeYEnlJgEfqjLxr6yMdmmgppNJBS1UAEslztkNTlYygpmr4qyjPMFe8d6mjPT-Yjdr-72HQdrKoXryqf9M8VRkebi2EUwwvVQ-qLcWhYyLEUMuhzQkxCKbVFmsQ_G6ZQkod3W8WcWLZjt4bCHzzhuwGDUlgeWA0JL-BsmWX4C-5lTxYPF9bOBAYxlerO6xSO2h_ZKz8Z--ZIcuem1t-YTbaai5-aD6q6fU7NHQvi1tXPRve1xaVYUr-olQCZw9Z-vFvenY5xPFuI2xGaNDBoTZKEoLt1PNT2jPFx4Ba4CMXEt9CGLyPmq4Ktkt6hpNwZc_kaUN-tHdGa-UvbFvsEdlk_3NkDThzHHF0SqqJAb73DdIk7WGuqGugjaw6kQJJBgR-EXBoAWgACDi3V5nsGU0iXFGp2GYf5MQixNAm3CdjejGco6K8JSJFwSnXwYy8TTfxsM_mbbn4eAJQ-Zz-EaYpNxdjbcpSNYkWDLHWGLk2-YmkO-PMrTsFqsDz-kVXU",      
}

// Create context 
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({children}) => {
    const[state, dispatch] = useReducer(AppReducer, initialState);
    const [phones, setPhones] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [token, setToken] = useState('');


    function addToken(token) {
      //setToken(token['token']);
      console.log("token : ");
      console.log(token);
      dispatch({
        type: 'ADD_TOKEN',
        payload: token,
      })
    }


    const currentToken = ("Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTA0NTk4NDEsImV4cCI6MTYxMDQ2MzQ0MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZ2VyYWxkIn0.bajY1EyS6302kehmze5jKRO4qAYodMRK5-Qs-tJys2ikW6VOfZDm5s8QazRdmWU7E-JbWVQiOVaO3MbZpT7DtdVQlIazb4KANCgUWKW00Q5mF8DRmUklxhPmxXT4me-Qz734xB7NyUzkube5J1Tc3h7GAxVCOLdxmzIMakbhmttrFEk9hXwGo2RemFILkj7nj18cOIII0YadQePBzGfuddy2Womd5GL9kcgFBhIKzAC9p6aDa3GV1qlTlfpgzbeiaVGYsevYUn3F18KWIpXx_p72RKKMndG_Wq6TjR-kvKgJD9JiPT_X7BS462osvDcD_z1r5ZWhVJBt6PNbb1d2c1qhYz-K3xcLj36cAhK0EJWU24ZRQqKWi510k5bRrqRugPvBmDyT1eFKhyajZ4s6zTw6sMGlCUkpX8SHABQ1tIRt1DoWE7fDDLYakrP_hbx7tAsPobYOz034d1KMiw65-0Ne_-8KclkpkwNvMYGf47mpg6Bq1SujKJLumz-PHoH0RtpGoeINP9uFlChrMAA9lTZu_ix2boekjUhiVCa9-qDC3YM9MaRdj7tCVc1WMfX08FPH_zkZKiCJnvv5WYKZv4C22om6QWLHyKmgUFWp0InCdDYRowwoubo4DyOZ_EvGPNhKp_cfQ9sDT0BMY_dnjf6vHH23ss9zDn5aei1-3jk").toString();   
    useEffect(() => {      

      if (!loaded) {
          axios
          .get("http://localhost:8000/api/phones/", {
          headers: {
              Authorization: (currentToken),
          },
          })
          .then((res) => {
            setPhones(res.data);
            })
          .catch(err=>console.log('WARNING CONNECTION ERROR --> ' + err))
          setLoaded(true);
      }    
    });    

    // Actions   
    


    function deletePhone(id) {
        axios
        .delete("http://localhost:8000/api/phones/" + id, {
          headers: {
            Authorization: (currentToken),            
          },
        })
        .then((res) => setPhones(phones.filter((phone) => phone.id !== id)))
        .catch(err => console.log('WARNING CONNECTION ERROR --> ' + err));     
        
        dispatch({
            type: 'DELETE_PHONE',
            payload: id,
        })
    }

    function addPhone(phone) {           
        
        axios.post("http://localhost:8000/api/phones", phone, {
          headers: {
            Authorization: (currentToken),           
          },
          
        })
        .then((res) => { 
          setLoaded(false);
        })
        .catch(err=>console.log('WARNING CONNECTION ERROR --> ' + err));
                 
        dispatch({
            type: 'ADD_PHONE',
            payload: phone,
        })
    }

    function editPhone(updatedPhone, id) {
      axios
     .put("http://localhost:8000/api/phones/" + id, updatedPhone, {
       headers: {
         Authorization: (currentToken),
       },
     })
    //  .catch(err=>console.log('WARNING CONNECTION ERROR --> ' + err))  
     .then((res) => {
       if (res.data) { //ça fonctionne
          setLoaded(false);
          dispatch({
            type: 'EDIT_PHONE',
            payload: id, updatedPhone,          
          })
        } else { // ça fonctionne pas
          console.log('!!!!!WARNING!!!!!');
       }
     });           
   }    

    return (<GlobalContext.Provider value = {{
        phones: phones,
        token: token,
        deletePhone, 
        addPhone,
        editPhone,
        addToken,
            
    }}>
        {children}  
    </GlobalContext.Provider>);
}


