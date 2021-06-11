import React, { useState } from "react"

const CreateArea = () => {
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

    return (
        <div>
            <form>
                <input name="title" placeholder="Title" onChange={inputChangeHandler}/>
                <textarea name="content" placeholder="Take a note..." onChange={inputChangeHandler} id="" rows="3"/>
                <button>+</button>
            </form>
        </div>
    )
}

export default CreateArea;