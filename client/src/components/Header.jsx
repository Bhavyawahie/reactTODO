import React, {useState} from "react"
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import AppsIcon from '@material-ui/icons/Apps'
import ExitToApp from '@material-ui/icons/ExitToApp'
import IconButton from "@material-ui/core/IconButton";
import {Avatar, Button,  Grid,  Menu, MenuItem, Tooltip} from "@material-ui/core";
import { logout } from "../actions/userActions"

const Header = ({location}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    if(userInfo) {
        let fName = userInfo.name.split(' ')[0]
        let lName = userInfo.name.split(' ')[1]
        fName = fName.charAt(0).toUpperCase() + fName.slice(1)
        lName = lName.charAt(0).toUpperCase() + lName.slice(1)
        var userName = fName + ' ' + lName
    }
    const handleClick = ({currentTarget}) => {
        setAnchorEl(currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <h1>Keeper</h1>
            {
            userInfo ? (
                <div>
                    <Tooltip title='Get in touch with us'>
                        <IconButton>
                            <AppsIcon className='app-icon'/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Account'>
                        <IconButton onClick={handleClick} size='small'>
                            <Avatar>{userInfo.name.charAt(0).toUpperCase()}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        PaperProps={{  
                                    style: {  
                                        width: 360,  
                                        height: 230, 
                                        boxShadow: '1px 1px 10px 2px #f0f0f0',
                                        borderRadius: '5px',
                                    },  
                                }}>
                        <MenuItem>
                            <Grid container justifyContent='center'> 
                                <Grid  container justifyContent='center'>
                                    <Avatar alt='User Avatar' style={{height: '70px', width: '70px', margin: '10px auto', fontSize: '32px'}}>{userInfo.name.charAt(0).toUpperCase()}</Avatar>
                                </Grid>
                                <Grid container>
                                    <Grid container justifyContent='center'>
                                        {`${userName}`}
                                    </Grid>
                                    <Grid container justifyContent='center' style={{color: "#5F6368", fontSize: '13px'}}>
                                        {`${userInfo.email}`}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MenuItem>
                            <Grid justifyContent='center' style={{marginTop: '10px'}}>
                                <Button variant='outlined' startIcon={<ExitToApp fontSize="small" />} onClick={logoutHandler}>Logout</Button>
                            </Grid>
                    </Menu>
                </div>
            ) : (
                <div>
                    <Link to={location.pathname === '/' ? '/register' : '/' }>
                        <Button variant='contained' color='primary'>{location.pathname === '/' ? `Sign up` : `Log in` }</Button>

                    </Link>
                </div>
            )
        } </header>
    )
}
export default Header
