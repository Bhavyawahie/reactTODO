import React, {useState} from "react"
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import AppsIcon from '@material-ui/icons/Apps'
import ExitToApp from '@material-ui/icons/ExitToApp'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from "@material-ui/core/IconButton";
import {Avatar, Button,  Grid,  Menu, MenuItem, Tooltip} from "@material-ui/core";
import { logout } from "../actions/userActions"

const Header = ({location}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [socialAnchorEl, setSocialAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const openSocials = Boolean(socialAnchorEl)
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let userName=""
    if(userInfo) {
        let fName = userInfo.name.split(' ')[0]
        let lName = userInfo.name.split(' ')[1]
        fName = fName.charAt(0).toUpperCase() + fName.slice(1)
        lName = lName.charAt(0).toUpperCase() + lName.slice(1)
        userName = fName + ' ' + lName
    }
    const handleClick = ({currentTarget}) => {
        setAnchorEl(currentTarget)
    }
    const handleSocialClick = ({currentTarget}) => {
        setSocialAnchorEl(currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleSocialClose = () => {
        setSocialAnchorEl(null)
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
                        <IconButton onClick={handleSocialClick}>
                            <AppsIcon className='app-icon'/>
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={socialAnchorEl}
                        open={openSocials}
                        onClose={handleSocialClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        <MenuItem component='a' href='http://www.github.com/bhavyawahie' target='_blank'><Button className='social-btn' startIcon={<GitHubIcon fontSize='small'/>}>Github</Button></MenuItem>
                        <MenuItem component='a' href='http://www.linkedin.com/in/bhavyawahie' target='_blank'><Button className='social-btn' startIcon={<LinkedInIcon fontSize='small'/>}>Linkedin</Button></MenuItem>
                        <MenuItem component='a' href='http://www.twitter.com/bhavyawahie' target='_blank'><Button className='social-btn' startIcon={<TwitterIcon fontSize='small'/>}>twitter</Button></MenuItem>
                        <MenuItem component='a' href='http://www.instagram.com/bhavyawahie' target='_blank'><Button className='social-btn'  startIcon={<InstagramIcon fontSize='small'/>}>instagram</Button></MenuItem>
                    </Menu>
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
