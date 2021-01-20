import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {GlobalContext} from '../../context/GlobalState';


function Header(props) {
   
    const [token, setToken] = useState('');    
    const {addToken } = useContext(GlobalContext);

    const tokenSubmit = e => {
        e.preventDefault();

        const newToken = {
            token,
        }
        addToken(newToken);
    }    
               

    return (
        <header style={headerstyle}>
            <h1>Smartphones Manager</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/addPhone">Ajouter un smartphone</Link> | <form onSubmit={tokenSubmit}>
                <div className="form-control">
                <label htmlFor="token">token : </label>
                <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Entrer le nouveau token" />
                </div>
                <input type="submit" className="btn" value="Envoyer" />
                </form>
            
        </header>                
    )        
}

const linkStyle = {
    color: '#fff'
}

const headerstyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header;


    // function handleToken() {
    //     setBToken(prompt('Veuillez entrer le nouveau token svp : '));        
    // }

    // console.log(bToken);

    //handleToken(bToken);