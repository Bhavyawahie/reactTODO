import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { Button, Card, Collapse, Container, Grid, IconButton, TextField, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Error from '../components/Error'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const registerScreen = ({history, location}) => {
    const [openWarning, setOpenWarning] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validationError, setValidationError] = useState(null)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister
    const btnStyles = {margin: '10% auto'}
    const redirect = location.search ? location.search.split('=')[1] : '/note'
    
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setValidationError('Passwords Do not Match')
        } else if(name.split(' ')[1] === undefined) {
            setValidationError('Full Name is required!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <>
            <Header location={location}/>
            {error && <Error error={error}/>}
            {validationError && <Collapse in={openWarning}><Alert severity='warning' action={<IconButton aria-label="close" color="inherit" size="small"onClick={() => {setOpenWarning(false);}}><CloseIcon fontSize="inherit" /></IconButton>}>{validationError}</Alert></Collapse>}
            {loading && <Loader/>}
            <Container>
                <Grid direction='row-reverse' alignItems='center'  style={{ minHeight: '80vh' }}>
                    <Grid>
                        <Typography variant='h3' className="landing-page-tagline">Capture what’s on your mind!<br/> whenever you want</Typography>
                    </Grid>
                    <Card className='register-card'> 
                        <Container maxWidth="sm">
                        <h2>Sign Up with Keeper</h2>
                            <form>
                                <TextField placeholder='Enter your Full Name' label='Name' type="name"
                                    name={name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth required
                                    />
                                <TextField placeholder='example@xyz.com' label='Email' type="email"
                                    name={email}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth required    
                                    />
                                <TextField placeholder='Create a Password' label='Password' type='password'
                                    name={password}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth required
                                    />
                                <TextField placeholder='Confirm the entered Password' label='Confirm Password' type='password'
                                    name={confirmPassword}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    fullWidth required
                                    />
                                <Button style={btnStyles} variant='contained' color='primary' onClick={submitHandler} fullWidth>Create Account</Button>
                            </form>
                        </Container>
                    </Card>
                </Grid>    
            </Container>
        </>    
    )
}

export default registerScreen
