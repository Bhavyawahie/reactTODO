import React from "react"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const Note = ({id, title, content, onDelClick, onNoteClick, hideNote}) => {
    const delHandler = (e) => {
        e.stopPropagation()
        onDelClick(id)
    }
    const style = {
        visibility: hideNote && 'hidden',
        transition : 'visibility 4ms'
    }

    return ( 
    <div className="note" style={style} onClick={() => onNoteClick(id)}>
        <h1>{title}</h1>
        <p>{content.length <  150 ?  content : content.substring(0,150) + "..."}</p>
        <button onClick={delHandler}><DeleteOutlineIcon/></button>
    </div>
    );
}
export default Note