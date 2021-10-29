import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Card,
    Container,
    Input,
} from '@material-ui/core'
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
    const redirect = location.seach ? location.search.split('=')[1] : '/note'
    
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
            <Card> 
                {error && <Error error={error}/>}
                {loading && <Loader/>}
                <Container maxWidth="sm">
                    <form>
                        <Input placeholder='email' type="email"
                            name={email}
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }/>
                        <br/>
                        <Input placeholder='password' type='password'
                            name={password}
                            value={password}
                            onChange={
                                (e) => setPassword(e.target.value)
                            }/>
                        <br/>
                        <Button variant='contained' color='primary'
                            onClick={submitHandler}>Log In</Button>
                    </form>
                </Container>
            </Card>
        </>    
    )
}

export default loginScreen
