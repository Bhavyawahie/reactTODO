import React from "react"
//import DeleteIcon from "@material-ui/icons/Delete"

const Note = (props) => {
    const delHandler = () => {
        props.onDelClick(props.id)
    }

    return ( 
    <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={delHandler}>DELETE</button>
    </div>
    );
}
export default Note