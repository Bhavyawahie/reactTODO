import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CreateArea from '../components/CreateArea'
import Error from '../components/Error';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Note from '../components/Note'
import NotePopup from '../components/NotePopup';
import { NOTE_CREATE_RESET, NOTE_CURRENT_RESET, NOTE_CURRENT_SET } from '../constants/noteConstants';
import { createNote, deleteNote, listNotes, updateNote } from '../actions/noteActions';

const notesScreen = ({history, location}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const noteCurrentSet = useSelector(state => state.noteCurrentSet)
    const {currentNote} = noteCurrentSet
    const noteList = useSelector(state => state.noteList)
    const {loading, notes, error} = noteList
    const noteCreate = useSelector(state => state.noteCreate)
    const {success: successCreate} = noteCreate
    const noteDelete = useSelector(state => state.noteDelete)
    const {success : successDelete} = noteDelete
    const noteUpdate = useSelector(state => state.noteUpdate)
    const {success: successUpdate} = noteUpdate
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
    }, [dispatch, history, userInfo, successCreate, successDelete, successUpdate ])


    const noteCreateHandler = (input) => {
        dispatch(createNote(input))
    }

    const noteDeleteHandler = (id) => {
        dispatch(deleteNote(id))
    }

    const noteUpdateHandler = (updatedNote, id) => {
        dispatch(updateNote(updatedNote, id))
    }

    const dialogOpenHandler = (id) => {
        dispatch({type: NOTE_CURRENT_SET , payload: notes.filter(note => note.id === id)[0]})
        setOpen(true);
    }

    const dialogCloser = () => {
        setOpen(false)
        dispatch({type: NOTE_CURRENT_RESET})
    }


    return (
        <>
            <Header location={location}/>
                {error && <Error error={error}/>}
            {userInfo && notes && (<div>
                <CreateArea onSubmit={noteCreateHandler}/>
                {loading && <Loader/>}
                <Grid className='note-container'>
                {   
                    notes.map((note) => {
                    return( 
                        <Note
                            key={note.id}
                            id={note.id} 
                            title={note.title} 
                            content={note.content}
                            onDelClick={noteDeleteHandler}
                            onNoteClick={dialogOpenHandler}
                            hideNote={currentNote == note && true}
                            /> 
                        )
                    })
                }
                <NotePopup open={open} onClose={dialogCloser} onSave={noteUpdateHandler}/>
                </Grid>
            </div>)
            }
        </>    
    )
}

export default notesScreen