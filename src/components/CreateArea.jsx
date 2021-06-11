import React, { useState } from "react"

const CreateArea = () => {

    return (
        <div>
            <form>
            <input name="title" placeholder="Title" />
            <textarea name="content" placeholder="Take a note..." id="" rows="3"/>
            <button>+</button>
            </form>
        </div>
    )
}

export default CreateArea;