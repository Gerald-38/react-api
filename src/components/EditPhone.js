import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import axios from "axios";
import { useHistory } from "react-router-dom";


import "../App.css";

function EditPhone (props) {         
        
   
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mailAdress, setMailAdress] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [isLow, setIsLow] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const id = props.match.params.id;
    const { editPhone } = useContext(GlobalContext);
    let history = useHistory();    
    
          
    useEffect(() => {       
        if (!loaded) {
          axios
          .get("http://localhost:8000/api/phones/" + id, {
            headers: {
              Authorization: ("Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTA0NTk4NDEsImV4cCI6MTYxMDQ2MzQ0MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZ2VyYWxkIn0.bajY1EyS6302kehmze5jKRO4qAYodMRK5-Qs-tJys2ikW6VOfZDm5s8QazRdmWU7E-JbWVQiOVaO3MbZpT7DtdVQlIazb4KANCgUWKW00Q5mF8DRmUklxhPmxXT4me-Qz734xB7NyUzkube5J1Tc3h7GAxVCOLdxmzIMakbhmttrFEk9hXwGo2RemFILkj7nj18cOIII0YadQePBzGfuddy2Womd5GL9kcgFBhIKzAC9p6aDa3GV1qlTlfpgzbeiaVGYsevYUn3F18KWIpXx_p72RKKMndG_Wq6TjR-kvKgJD9JiPT_X7BS462osvDcD_z1r5ZWhVJBt6PNbb1d2c1qhYz-K3xcLj36cAhK0EJWU24ZRQqKWi510k5bRrqRugPvBmDyT1eFKhyajZ4s6zTw6sMGlCUkpX8SHABQ1tIRt1DoWE7fDDLYakrP_hbx7tAsPobYOz034d1KMiw65-0Ne_-8KclkpkwNvMYGf47mpg6Bq1SujKJLumz-PHoH0RtpGoeINP9uFlChrMAA9lTZu_ix2boekjUhiVCa9-qDC3YM9MaRdj7tCVc1WMfX08FPH_zkZKiCJnvv5WYKZv4C22om6QWLHyKmgUFWp0InCdDYRowwoubo4DyOZ_EvGPNhKp_cfQ9sDT0BMY_dnjf6vHH23ss9zDn5aei1-3jk"),
            },
          })
          .catch(err=>console.log('WARNING CONNECTION ERROR --> ' + err))
          .then((res) => {
            setName(res.data.name);            
            setPrice(res.data.price);
            setColor(res.data.color);
            setDescription(res.data.description);
            setReleaseDate(res.data.releaseDate);  
            setCountry(res.data.country);
            setPhoneNumber(res.data.phoneNumber);
            setMailAdress(res.data.mailAdress);                              
          });          
        setLoaded(true);        
        }        
    }); 
                
     
    function handleSubmit(e) {                
        e.preventDefault();       
        var isInvalid = false;      
        isInvalid=(((isLow) | (isEmpty)) ? true : false);
        const updatedPhone = {
            name,
            price: parseInt(price), 
            color,
            description,
            releaseDate,
            country,
            phoneNumber,
            mailAdress,                
        } 
        if (!isInvalid) {
            editPhone(updatedPhone, parseInt(id));
            history.push('/');

        }
        else {            
            if (isEmpty) {
                alert('le Nom ne doit pas être vide, veuillez saisir un nom SVP');
            }
            if (isLow) {
                alert('Veuillez saisir un prix supérieur à 100 SVP');
            }
        }      
    }                    
  

    return (         
        <>        
            <h3>Edition du Smartphone</h3>
            <br/>
            <form onSubmit={handleSubmit}> 
                <br/>
                <div>
                    <label>Id : </label>
                    <input type="number" name="Id" value={id} readOnly/>
                </div>                
                <div>
                    <label>Nom : </label>
                    <input type="text" name="name" value={name} onChange={(e) => (setName(e.target.value), (setIsEmpty((e.target.value === '') ? true : false )))}/>
                    <p className="error">{(isEmpty) ? 'Saisissez un nom svp' : ''}</p>
                </div>
                <br/>
                <div>
                    <label>Prix :</label>
                    <input type="number" name="Prix" value={price}onChange={(e) => ((setPrice(e.target.value), (setIsLow((e.target.value < 100) ? true : false))))}/>
                    <p className="error">{(isLow) ? 'le prix doit être supérieur ou égal 100' : ''}</p>
                </div>
                <div>
                    <label>Couleur : </label>
                    <input type="text" name="color" value={color} onChange={(e) => (setColor(e.target.value))}/>                
                </div>
                <div>
                    <label>Description : </label>
                    <input type="text" name="description" value={description} onChange={(e) => (setDescription(e.target.value))}/>                
                </div>
                <div>
                    <label>Date de sortie :</label>
                    <input type="date" pattern="\d{1,2}/\d{1,2}/\d{4}" name="releaseDate" value={releaseDate}onChange={(e) => ((setReleaseDate(e.target.value)))}/>
                </div> 
                <div>
                    <label>Pays d'origine : </label>
                    <input type="text" name="country" value={country} onChange={(e) => (setCountry(e.target.value))}/>                
                </div>
                <div>
                    <label>Tel fabricant : </label>
                    <input type="tel" pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" name="phoneNumber" value={phoneNumber} onChange={(e) => (setPhoneNumber(e.target.value))}/>                
                </div>  
                <div>
                    <label>Mail fabricant : </label>
                    <input type="email" name="mailAdress" value={mailAdress} onChange={(e) => (setMailAdress(e.target.value))}/>                
                </div>                                    
                <br/>
                <input type="submit" className="btn" value="Envoyer" />
            </form>    
        </>
    );
}

export default EditPhone