import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CreateArea from '../components/CreateArea'
import Error from '../components/Error';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Note from '../components/Note'
import { NOTE_CREATE_RESET } from '../constants/noteConstants';
import { createNote, deleteNote, listNotes } from '../actions/noteActions';

const notesScreen = ({history, location}) => {
    const dispatch = useDispatch()
    const noteList = useSelector(state => state.noteList)
    const {loading, notes, error} = noteList
    const noteCreate = useSelector(state => state.noteCreate)
    const {success: successCreate} = noteCreate
    const noteDelete = useSelector(state => state.noteDelete)
    const {success : successDelete} = noteDelete
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if(!userInfo) {
            history.push('/')
        }
        else {
            dispatch({type: NOTE_CREATE_RESET})
            dispatch(listNotes())
        }
    }, [dispatch, history, userInfo, successCreate, successDelete ])


    const noteCreateHandler = (input) => {
        dispatch(createNote(input))
    }

    const noteDeleteHandler = (id) => {
        dispatch(deleteNote(id))
    }

    return (
        <>
            <Header location={location}/>
                {error && <Error error={error}/>}
            {userInfo && notes && (<div>
                <CreateArea onSubmit={noteCreateHandler}/>
                {loading ? <Loader/> : (
                <Grid>
                {   
                    notes.map((note) => {
                    return( 
                        <Note
                            key={note.id}
                            id={note.id} 
                            title={note.title} 
                            content={note.content}
                            onDelClick={noteDeleteHandler}    
                            /> 
                        )
                    })
                }
                </Grid>)}
            </div>)
            }
        </>    
    )
}

export default notesScreen