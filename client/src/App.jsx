import React, { useEffect ,useState} from "react"
import axios from "axios"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header"
import CreateArea from "./components/CreateArea"
import Note from "./components/Note"
import Footer from "./components/Footer"
import registerScreen from "./screens/registerScreen"
import loginScreen from "./screens/loginScreen"


const App = () => {
    return (
        <Router>
            <Header/>
            <main>
                <Route path="/note" exact component={CreateArea} />
                <Route path="/login"  component={loginScreen} />
                <Route path="/register" exact component={registerScreen} />
            </main>
            <Footer/>
        </Router>
    )
}
export default App


// const [notes, setNotes] = useState([])
    
//     useEffect(() => {
//         const getNotefromServer = async () => {
//             const res = await axios.get("/api/notes");
//             setNotes(res.data);
//             //console.log(res.data);
//         }
//         getNotefromServer();
//     }, [])
//     //Takes a note from the createarea component and pushes it into the DB while maintaining its state
//     const noteInit = async (note) => {
//         const res = await axios.post(`/api/notes`, note)
//         setNotes(prevVal => {
//             return [...prevVal, note]
//         });
//     }

//     const noteDel = async (id) => {
//         const res = await axios.delete(`/api/notes/${id}`)
//         await setNotes(notes.filter(note => {
//             return note.id !== id
//         }));
//     }

//     return <div>
//         <Header/>
//         <CreateArea onSubmit={noteInit}/>
//         {
//             notes.map((note) => {
//             return( 
//                 <Note
//                     key={note.id}
//                     id={note.id} 
//                     title={note.title} 
//                     content={note.content}
//                     onDelClick={noteDel}
//                 /> 
//                 )
//             })
//         }
//         <Footer/>
//     </div>