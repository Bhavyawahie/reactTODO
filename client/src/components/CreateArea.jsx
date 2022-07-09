import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add"
import { InputBase } from "@material-ui/core";

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
        event.preventDefault()
        props.onSubmit(input);
        setInput({
            title: "",
            content: ""
        });
    }

    const expandTextField = () => {
        setIsExpanded(true)
    }

    return (
        <div>
            <form className="note-form">
                {isExpanded && (
                    <InputBase name="title" placeholder="Title" onChange={inputChangeHandler} value={input.title} autoComplete="off" className='note-form-title' multiline/>
                )}
                <InputBase name='content' placeholder="Take a note..." onChange={inputChangeHandler} onClick={expandTextField} value={input.content}  className='note-form-body' multiline/>
                <button onClick={submissionHandler} disabled={input.content.length<1} className='note-form-submission'><AddIcon/></button>
            </form>
        </div>
    )
}

export default CreateArea;
