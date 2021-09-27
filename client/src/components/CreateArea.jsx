import React, { useState } from "react";
import axios from "axios";
// import AddIcon from "@material-ui/icons/Add"

const CreateArea = (props) => {
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

    return (
        <div>
            <form>
                <input name="title" placeholder="Title" onChange={inputChangeHandler} value={input.title} autoComplete="off"/>
                <textarea name="content" placeholder="Take a note..." onChange={inputChangeHandler}  value={input.content} rows="3"/>
                <button onClick={submissionHandler} disabled={input.title.length<1}>+</button>
            </form>
        </div>
    )
}

export default CreateArea;
