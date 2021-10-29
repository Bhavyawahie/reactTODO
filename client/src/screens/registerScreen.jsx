import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { Card, Container, Input, Button } from '@material-ui/core'
import Error from '../components/Error'
import Header from '../components/Header'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const registerScreen = ({history, location}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validationError, setValidationError] = useState(null)
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister
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
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <>
            <Header location={location}/>
            <Card> 
                {validationError && <Alert severity='warning'>{validationError}</Alert>}
                {error && <Error error={error}/>}
                {loading && <Loader/>}
                <Container maxWidth="sm">
                    <form>
                        <Input placeholder='Name' type="name"
                            name={name}
                            value={name}
                            onChange={
                                (e) => setName(e.target.value)
                            }/>
                        <br/>
                        <Input placeholder='Email' type="email"
                            name={email}
                            value={email}
                            onChange={
                                (e) => setEmail(e.target.value)
                            }/>
                        <br/>
                        <Input placeholder='Password' type='password'
                            name={password}
                            value={password}
                            onChange={
                                (e) => setPassword(e.target.value)
                            }/>
                        <br/>
                        <Input placeholder='Confirm Password' type='password'
                            name={confirmPassword}
                            value={confirmPassword}
                            onChange={
                                (e) => setConfirmPassword(e.target.value)
                            }/>
                        <br/>
                        <Button variant='contained' color='primary'
                            onClick={submitHandler}>Create Account</Button>
                    </form>
                </Container>
            </Card>
        </>    
    )
}

export default registerScreen
