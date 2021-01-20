import React, {useState} from 'react';

const useToken = (props) => {

    const[bToken, setBToken] = useState(''); 

    function handleTokenViaPrompt(bToken = "") {
        bToken = prompt(`(token actuellement utilisé : ${bToken}) Entrez le nouveau token ou tappez entrer pour annuler  : `);
        if (bToken) {
            handleToken(bToken);
        }
    }

    function handleToken(bTtoken) {
        setBToken(bTtoken);
    }

    return {
        bToken,
        handleTokenViaPrompt,
        handleToken
    };
}

export default useToken;