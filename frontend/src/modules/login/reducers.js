import { SET_USERNAME, SET_PASSWORD } from './actionTypes'

export default (state = {
    username: 'Adam',
    password: '123'
}, action) => {
    switch (action.type) {
        case SET_USERNAME: {
            return  {
                ...state,
                username: action.username
            }
        }
        case SET_PASSWORD: {
            return  {
                ...state,
                password: action.password
            }
        }
        default: 
            return state
        
    }
}