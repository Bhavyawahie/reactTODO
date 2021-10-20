import React, { useState } from "react";
import axios from "axios";
// import AddIcon from "@material-ui/icons/Add"

const CreateArea = (props) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [input, setInput] = useState({
        title: "",
        content: ""
    });
    const inputChangeHandler = (event) => {
        const {name, value} = event.target;
        setInput(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }
    const submissionHandler = (event) => {
        props.onSubmit(input);
        setInput({
            title: "",
            content: ""
        });
        event.preventDefault();
        //console.log("I was clicked and form is supposed to be submitted");
    }

    const expandTextField = () => {
        setIsExpanded(true)
    }

    return (
        <div>
            <form className="note-form">
                {isExpanded && (
                    <input name="title" placeholder="Title" onChange={inputChangeHandler} value={input.title} autoComplete="off" className='note-form-title'/>
                )}
                <textarea name="content" placeholder="Take a note..." onChange={inputChangeHandler} onClick={expandTextField}  value={input.content} rows={isExpanded ? 3 : 1} className='note-form-body'/>
                <button onClick={submissionHandler} disabled={input.title.length<1} className='note-form-submission'>+</button>
            </form>
        </div>
    )
}

export default CreateArea;
