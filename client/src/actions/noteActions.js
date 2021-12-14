import axios from 'axios'
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_DELETE_FAIL, NOTE_DELETE_REQUEST, NOTE_DELETE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from '../constants/noteConstants'


export const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTE_LIST_REQUEST
        })
        const {userLogin : { userInfo } } = getState()
        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get('/api/notes', config)
        dispatch({
            type: NOTE_LIST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
} 

export const createNote = (input) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTE_CREATE_REQUEST
        })
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.post('/api/notes', input, config)
        dispatch({
            type: NOTE_CREATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: NOTE_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteNote = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTE_DELETE_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.delete(`/api/notes/${id}`, config)  
        dispatch({
            type: NOTE_DELETE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: NOTE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateNote = (input, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTE_UPDATE_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.put(`/api/notes/${id}`, input, config)  
        dispatch({
            type: NOTE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: NOTE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}