import React, {useState} from "react"
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import AppsIcon from '@material-ui/icons/Apps'
import ExitToApp from '@material-ui/icons/ExitToApp'
import IconButton from "@material-ui/core/IconButton";
import {Avatar, Button, Divider, ListItemIcon, Menu, MenuItem, Tooltip} from "@material-ui/core";
import { USER_LOGOUT } from "../constants/userConstants"
import { logout } from "../actions/userActions"

const Header = ({location}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

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
                        PaperProps={{
                        elevation: 10,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 100px rgba(0,0,0,1))',
                            mt: 2.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 0.5,
                            },
                            '&:before': {
                            content: '""',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar>{userInfo.name.charAt(0).toUpperCase()}</Avatar>
                            {`Hello, ${userInfo.name}!`}
                        </MenuItem>
                        <Divider />                        
                        <MenuItem onClick={logoutHandler}>
                        <ListItemIcon>
                            <ExitToApp fontSize="small" />
                        </ListItemIcon>
                        Logout
                        </MenuItem>
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
