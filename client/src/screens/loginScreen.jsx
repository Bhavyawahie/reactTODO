import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Grid, TextField, Typography } from '@material-ui/core'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { login } from '../actions/userActions'
import Header from '../components/Header'


const loginScreen = ({history, location}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/note'
    const btnStyle = { margin: '10% 0' }
    
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <>
            <Header location={location}/>
            {error && <Error error={error}/>}
            {loading && <Loader className='loader'/>}
            <Container>
                <Grid direction='row' alignItems='center'  style={{ minHeight: '80vh' }}>
                    <Grid>
                        <Typography variant='h3' className="landing-page-tagline">Save your thoughts,<br/> wherever you are</Typography>
                    </Grid>
                    <Card className='login-card'> 
                        <Container maxWidth="sm">
                            <h2>Login to Keeper</h2>
                            <br />
                            <form>
                                <TextField label='Email' placeholder='Enter email' type="email"
                                    name={email}
                                    value={email}
                                    onChange={
                                        (e) => setEmail(e.target.value)
                                    }
                                    fullWidth required    
                                    />
                                <TextField label='Password' placeholder='Enter password' type='password'
                                    name={password}
                                    value={password}
                                    onChange={
                                        (e) => setPassword(e.target.value)
                                    }
                                    fullWidth required    
                                    />
                                <Button style={btnStyle} type='submit' variant='contained' color='primary' onClick={submitHandler} fullWidth>Log In</Button>
                            </form>
                        </Container>
                    </Card>
                </Grid>
            </Container>
        </>    
    )
}

export default loginScreen
