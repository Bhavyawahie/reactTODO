import React from "react"
import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
import notes from "../notes"
import CreateArea from "./CreateArea"

const noteInit = (note) => {
    return <Note
        key={note.key}
        title={note.title}
        content={note.content}
    />
}

const App = () => {
    return <div>
        <Header/>
        <CreateArea/>
        {notes.map(noteInit)}
        <Footer/>
        </div>
}
export default App
