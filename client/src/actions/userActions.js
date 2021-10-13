import axios from "axios"
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users', {name, email, password}, config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        
    }

} 
