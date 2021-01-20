import React, {useContext} from 'react'
import Phone from './Phone';
import {GlobalContext} from '../context/GlobalState';


export const PhoneList = () => {

  const {phones} = useContext(GlobalContext);

  

  return (
    <>
      <br/>  
        <div className="search">
        <input type="search" placeholder="rechercher un smartphone" name="the_search"></input> 
        <input type="submit" value="Search" />
        </div>
      <ul className="list">
        {phones.map(phone => (<Phone key={phone.id} phone={phone} />))}
      </ul>
    </>    
  );
}

export default PhoneList;
