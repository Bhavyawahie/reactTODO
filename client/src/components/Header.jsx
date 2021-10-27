import React, {useState} from "react"
import {Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import AppsIcon from '@material-ui/icons/Apps'
import IconButton from "@material-ui/core/IconButton";
import {Avatar, Button} from "@material-ui/core";

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const logoutHandler = () => {
        console.log('i was clicked')
    }
    return (
        <header>
            <h1>Keeper</h1>
            {
            userInfo ? (
                <div>
                    <IconButton>
                        <AppsIcon className='app-icon'/>
                    </IconButton>
                    <IconButton onClick={logoutHandler}>
                        <Avatar>{userInfo.name.charAt(0)}</Avatar>
                    </IconButton>
                </div>
            ) : (
                <div>
                    <Link to='/register'>
                        <Button variant='contained' color='primary'>Sign Up</Button>

                    </Link>
                </div>
            )
        } </header>
    )
}
export default Header
