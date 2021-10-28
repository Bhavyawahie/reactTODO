import React from "react"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const Note = ({id, title, content, onDelClick}) => {
    const delHandler = () => {
        onDelClick(id)
    }

    return ( 
    <div className="note">
        <h1>{title}</h1>
        <p>{content}</p>
        <button onClick={delHandler}><DeleteOutlineIcon/></button>
    </div>
    );
}
export default Note