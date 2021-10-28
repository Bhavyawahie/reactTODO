import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNote, deleteNote, listNotes } from '../actions/noteActions';
import { Box } from '@material-ui/core';
import CreateArea from '../components/CreateArea'
import Note from '../components/Note'
import Loader from '../components/Loader';
import { NOTE_CREATE_RESET } from '../constants/noteConstants';
import Header from '../components/Header';

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
            {userInfo && (<div>
                <CreateArea onSubmit={noteCreateHandler}/>
                <Box>
                {   loading ? <Loader/> : (
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
                )
                }
                </Box>
            </div>)
            }
        </>    
    )
}

export default notesScreen

//const [notes, setNotes] = useState([])   
//     useEffect(() => {
//         const getNotefromServer = async () => {
//             const res = await axios.get("/api/notes");
//             setNotes(res.data);
//             //console.log(res.data);
//         }
//         getNotefromServer();
//     }, [])
//     //Takes a note from the createarea component and pushes it into the DB while maintaining its state
//     const noteInit = async (note) => {
//         const res = await axios.post(`/api/notes`, note)
//         setNotes(prevVal => {
//             return [...prevVal, note]
//         });
//     }

//     const noteDel = async (id) => {
//         const res = await axios.delete(`/api/notes/${id}`)
//         await setNotes(notes.filter(note => {
//             return note.id !== id
//         }));
//     }

//     return <div>
//         <Header/>
//         <CreateArea onSubmit={noteInit}/>
//         {
//             notes.map((note) => {
//             return( 
//                 <Note
//                     key={note.id}
//                     id={note.id} 
//                     title={note.title} 
//                     content={note.content}
//                     onDelClick={noteDel}
//                 /> 
//                 )
//             })
//         }
//         <Footer/>
//     </div>