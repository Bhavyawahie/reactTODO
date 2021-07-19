import React, { useEffect ,useState} from "react"
import axios from "axios"
import Header from "./Header"
import CreateArea from "./CreateArea"
import Note from "./Note"
import Footer from "./Footer"


const App = () => {
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        const getNotefromServer = async () => {
            const res = await axios.get("/notes");
            setNotes(res.data);
            //console.log(res.data);
        }
        getNotefromServer();
    }, [])
    //Takes a note from the createarea component and pushes it into the DB while maintaining its state
    const noteInit = async (note) => {
        const res = await axios.post(`/notes/${note.id}`, note)
        setNotes(prevVal => {
            return [...prevVal, note]
        });
    }

    const noteDel = async (id) => {
        const res = await axios.delete(`/notes/${id}`)
        await setNotes(notes.filter(note => {
            return note.id !== id
        }));
    }

    return <div>
        <Header/>
        <CreateArea onSubmit={noteInit}/>
        {
            notes.map((note, indexnp) => {
            return( 
                <Note
                    key={note.id}
                    id={note.id} 
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
