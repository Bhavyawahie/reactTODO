import { Button, Dialog, Grid, Input, InputBase, Typography } from '@material-ui/core'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'


const NotePopup = ({open, onClose, onSave}) => {
    const [noteBody, setNoteBody] = useState({
        title: "",
        content: ""
    })
    const noteCurrentSet = useSelector(state => state.noteCurrentSet)
    const {currentNote} = noteCurrentSet

    const changeHandler = (e) => {
        const {name, value} = e.target
        setNoteBody(prevValue => {
            return (
                {...prevValue, [name] : value}
            )
        })
    }


    return (
        <Dialog scroll='paper' open={open} onClose={onClose} >
            <Grid>
                    <InputBase placeholder='Title' name='title' onChange={changeHandler} defaultValue={currentNote && currentNote.title} className='popup-title' inputProps={{style: {fontWeight: 700, fontSize: 24}}} multiline fullWidth/>
                    <InputBase placeholder='Note' name='content' onChange={changeHandler} defaultValue={currentNote && currentNote.content} className='popup-content' multiline fullWidth/>
            </Grid>
            <Grid container justifyContent='flex-end' style={{margin: 0,width: '100%'}}>
                <Button variant='outlined' onClick={() => {onSave(noteBody, currentNote.id); setNoteBody({title: "", content: ""});onClose()}}>Save</Button>
            </Grid>
        </Dialog>
    )
}

export default NotePopup
