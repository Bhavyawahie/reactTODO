import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

const Loader = () => {
    return (
        <Grid alignItems='center' justifyContent='center'>
            <CircularProgress/>
        </Grid>
    )
}

export default Loader
