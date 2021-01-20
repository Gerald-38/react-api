import React, {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import Header from "./Layout/Header";


const AddPhone = () => {   


    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');    
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mailAdress, setMailAdress] = useState('');
    const [redirect, setRedirect] = useState(false);
    let history = useHistory();  

    const { addPhone } = useContext(GlobalContext);

    const onSubmit = e => {
        setRedirect(true);
        e.preventDefault();

        const newPhone = {
            name,
            price: parseInt(price),            
            color,
            description, 
            releaseDate,
            country, 
            phoneNumber,
            mailAdress,
            redirect,
        }

        addPhone(newPhone);
        history.push('/');

    }        
  
    return (
        <>
            <h3>Ajouter un Smartphone</h3>
            <br/>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                <label htmlFor="name">Nom : </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrer le nom" />
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="price">Prix :  </label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Entrer le prix" />
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="color">Couleur :</label>
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Entrer la couleur" />
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="description">Description :  </label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Entrez une description" />
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="releaseDate">Date de sortie  :   </label>
                <input type="date" pattern="\d{1,2}/\d{1,2}/\d{4}" name="releaseDate " value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}></input>
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="country">Pay d'origine :  </label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Entrez un pays d'origine" />
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="phoneNumber">Tel fabricant :  </label>
                <input type="tel" pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Entrez un numero de tel" />
                </div>
                <br/>
                <div className="form-control">
                <label htmlFor="mailAdress">Mail fabricant :  </label>
                <input type="email" value={mailAdress} onChange={(e) => setMailAdress(e.target.value)} placeholder="Entrez une adresse mail" />
                </div>
                
                <br/>
                <input type="submit" className="btn" value="Envoyer" />
            </form>  
        </>
    )
}

export default AddPhone;


