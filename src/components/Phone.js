import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';
import { Link } from 'react-router-dom';
import "../App.css";



export const Phone = ({ phone }) => {
    const { deletePhone } = useContext(GlobalContext);
    var descDate = phone.releaseDate;
    var elem = descDate.split('-');
    var jour = elem[2];
    var mois = elem[1];
    var annee = elem[0];
    const dispDate = jour+'/'+mois+'/'+annee;
         

    return (
        <div >
            <h3>Nom = {phone.name}</h3>        
                <li>(Id) = {phone.id}</li>
                <li>Prix = {phone.price}</li>
                <li>Couleur = {phone.color}</li>
                <li>Descrption = {phone.description}</li>
                <li>Date de sortie : {dispDate}</li> 
                <li>Pays d'origine : {phone.country}</li>
                <li>Tel Fabricant : {phone.phoneNumber}</li> 
                <li>Mail Fabricant : {phone.mailAdress}</li>     
            <button onClick={() => deletePhone(phone.id)}  >Supprimer de la liste</button> | <Link to={"/editPhone/" + phone.id} >Editer</Link>                    
            <hr/>      
        </div>
    );
}
export default Phone;
