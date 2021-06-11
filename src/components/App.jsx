import React, {useState} from "react"
import Header from "./Header"
import CreateArea from "./CreateArea"
import Note from "./Note"
import Footer from "./Footer"


const App = () => {
    const [notes, setNotes] = useState([])
    const noteInit = (note) => {
        setNotes(prevVal => {
            return [...prevVal, note]
        });
    }
    const noteDel = (id) => {
        setNotes(prevVal => {
            return prevVal.filter((note, index) => {
                        return index !==id
                    })
        })
    }

    return <div>
        <Header/>
        <CreateArea onSubmit={noteInit}/>
        {
            notes.map((note, index) => {
            return( 
                <Note
                    key={index}
                    id={index} 
                    title={note.title} 
                    content={note.content}
                    onDelClick={noteDel}
                /> 
                )
            })
        }
        <Footer/>
    </div>
}
export default App
