import React from "react"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const Note = ({id, title, content, onDelClick, onNoteClick}) => {
    const delHandler = (e) => {
        e.stopPropagation()
        onDelClick(id)
    }

const dialogOpener = (e) => {
    if (e.target.nodeName === 'DIV') {
        onNoteClick(id,e)
    }
}    

    return ( 
    <div className="note" onClick={dialogOpener}>
        <h1>{title}</h1>
        <p>{content.length <  150 ?  content : content.substring(0,150) + "..."}</p>
        <button onClick={delHandler}><DeleteOutlineIcon/></button>
    </div>
    );
}
export default Note