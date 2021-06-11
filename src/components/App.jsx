import React from "react"
import Header from "./Header"
import CreateArea from "./CreateArea"
import Note from "./Note"
import Footer from "./Footer"

// const noteInit = (note) => {
//     return 
// }

const App = () => {
    return <div>
        <Header/>
        <CreateArea/>
        <Note
        key={1}
        title="Note Title"
        content="note.content"
    />
        <Footer/>
        </div>
}
export default App
