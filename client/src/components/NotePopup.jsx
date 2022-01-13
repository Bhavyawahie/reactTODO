import {
    Button,
    Dialog,
    Grid,
    Input,
    InputBase,
    Typography
} from '@material-ui/core'
import React, {useState} from 'react'


const NotePopup = ({open, note, onClose, onSave}) => {
    const [noteBody, setNoteBody] = useState({
        title: "",
        content: ""
    })

    const changeHandler = (e) => {
        const {name, value} = e.target
        setNoteBody(prevValue => {
            return (
                {...prevValue, [name] : value}
            )
        })
    }


    return (
        <Dialog scroll='paper' open={open} onClose={onClose}>
            <Grid>
                    <InputBase placeholder='Title' name='title' onChange={changeHandler} defaultValue={note.title} className='popup-title' multiline fullWidth/>
                    <InputBase placeholder='Note' name='content' onChange={changeHandler} defaultValue={note.content} className='popup-content' multiline fullWidth/>
            </Grid>
            <Grid container justifyContent='flex-end' style={{margin: 0,width: '100%'}}>
                <Button variant='outlined' onClick={() => {onSave(noteBody, note.id); setNoteBody({title: "", content: ""});onClose()}}>Save</Button>
            </Grid>
        </Dialog>
    )
}

export default NotePopup
