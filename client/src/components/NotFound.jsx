import { Box, Grid, Typography, Button } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <header style={{marginBottom: '25vh'}}>
                <h1>Keeper</h1>
                <Link to='/note'>
                    <Button variant='contained' color='primary'>
                        My Notes
                    </Button>
                </Link>
            </header>
            <Grid justifyContent='center' alignItems='center' direction='column'>
                    <Typography variant='h1'>
                        <i className="fa-solid fa-triangle-exclamation triangle"></i>
                    </Typography>
                    <Typography variant='h3'>
                        404 Not Found!
                    </Typography>
            </Grid> 
        </>
    )
}

export default NotFound
