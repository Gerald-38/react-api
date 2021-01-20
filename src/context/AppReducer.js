export default (state, action) => {
    switch(action.type) {
        case 'DELETE_PHONE':
            return {
                ...state,
                phones: state.phones.filter(phone => phone.id !== action.payload)
            }

        case 'ADD_PHONE':
            return {
                ...state,
                
            }

        case 'EDIT_PHONE':
            return {
                ...state,
                phones: [action.payload, ...state.phones]               

            } 
            
        case 'ADD_TOKEN':
            return {
                ...state,
                token: [action.payload, state.token]
            }

        default:
            return state;
        
    }    
}








