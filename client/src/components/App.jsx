import React, { useEffect ,useState} from "react"
import axios from "axios"
import Header from "./Header"
import CreateArea from "./CreateArea"
import Note from "./Note"
import Footer from "./Footer"


const App = () => {
    const [notes, setNotes] = useState([])
    //Takes a note from the createarea component and pushes it into the DB while maintaining its state
    const noteInit = (note) => {
        axios.post("http://localhost:4000", note)
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
