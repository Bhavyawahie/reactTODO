import React from "react"

const Note = (prop) => {
    return ( 
    <div className="note">
        <h1>{prompt.title}</h1>
        <p>{prop.content}</p>
        <button>DELETE</button>
    </div>
    );
}
export default Note