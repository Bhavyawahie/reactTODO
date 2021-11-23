import React, { useState } from 'react'
import { Collapse,  IconButton } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close';

const Error = ({error}) => {
    const [open, setOpen] = useState(true)
    const validationError = 'User validation failed: name: Path `name` is required., email: Path `email` is required., password: Path `password` is required.'
    if(error === validationError) {
        error = 'Name, Email, Password and Confirm Password required!'
    }
    return (
        <>
            <Collapse in={open}>
                <Alert severity='error' action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}>
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                    {error}
                </Alert>
            </Collapse>
        </>
    )
}

export default Error
