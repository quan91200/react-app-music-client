import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DarkModeContext } from "../../context/darkModeContext"
import { AuthContext } from "../../context/authContext"

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import GroupIcon from '@mui/icons-material/Group'

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"

import SettingsIcon from '@mui/icons-material/Settings'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import LogoutIcon from '@mui/icons-material/Logout'

import style from './header.scss'
import classNames from 'classnames/bind'
import { Badge } from '@mui/material'

const header = classNames.bind(style)

const Header = () => {
    const location = useLocation()
    const isActive = location.pathname

    const [notifications, setNotifications] = useState([])
    const [open, setOpen] = useState(false)

    const { toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)
    notifications.length = 2

    const Read = () => {
        setNotifications([])
        setOpen(prev => !prev)
    }

    const [user, setUser] = useState(false)

    const User = () => {
        setUser(pre => !pre)
    }

    return (
        <div className={header("wrapperHeader")}>
            <div className={header("leftHeader")}>
                <Link className={header("title")} to="/">Cobham</Link>
                <div className={header("search")}>
                    <SearchOutlinedIcon />
                    <input type='text' placeholder='Search ...' />
                </div>
            </div>
            <div className={header("middleHeader")}>
                <Link
                    to="/"
                    className={`${header("link")} ${isActive === '/' ? header('active') : ''}`}
                >
                    {isActive === '/' ? <HomeIcon /> : <HomeOutlinedIcon />}
                </Link>
                <Link
                    to="/dashboard"
                    className={`${header("link")} ${isActive === '/dashboard' ? header('active') : ''}`}
                >
                    {isActive === '/dashboard' ? <DashboardIcon /> : <GridViewOutlinedIcon />}
                </Link>
                <Link
                    to="/music"
                    className={`${header("link")} ${isActive === '/music' ? header('active') : ''}`}
                >
                    {isActive === '/music' ? <PlayCircleIcon /> : <PlayCircleOutlineIcon />}
                </Link>
                <Link
                    to="/groups"
                    className={`${header("link")} ${isActive === '/groups' ? header('active') : ''}`}
                >
                    {isActive === '/groups' ? <GroupIcon /> : <PeopleOutlineIcon />}
                </Link>
            </div>
            <div className={header("rightHeader")}>
                <div className={header("mode")}>
                    {darkMode ? (
                        <WbSunnyOutlinedIcon onClick={toggle} />
                    ) : (
                        <DarkModeOutlinedIcon onClick={toggle} />
                    )}
                </div>
                <div onClick={() => setOpen(!open)} className={header("badge")}>
                    <Badge badgeContent={notifications.length}>
                        <NotificationsOutlinedIcon />
                    </Badge>
                    {open && (
                        <div className={header("notifications")}>
                            <div className={header("title")}>
                                <h6>Notifications</h6>
                                <button onClick={Read}>Mark as read</button>
                            </div>
                            <div className={header("content")}></div>
                        </div>
                    )}
                </div>
                <div className={header("user")} onClick={User}>
                    <img alt='avt' src={"/upload/" + currentUser.profilePic} />
                </div>
                {
                    user && (
                        <div className={header("information")}>
                            <div className={header("title")}>
                                <div className={header("userName")}>
                                    <img alt='avt' src={"/upload/" + currentUser.profilePic} />
                                    <h3>{currentUser.name}</h3>
                                </div>
                                <hr />
                                <Link to={`/profile/${currentUser.id}`}>See all profiles</Link>
                            </div>
                            <div className={header("content")}>
                                <Link>
                                    <div className={header("icon")}>
                                        <SettingsIcon />
                                    </div>
                                    <>Setting & Privacy</>
                                </Link>
                                <Link>
                                    <div className={header("icon")}>
                                        <QuestionMarkIcon />
                                    </div>
                                    <>Help & Supports</>
                                </Link>
                                <Link to='/logout'>
                                    <div className={header("icon")}>
                                        <LogoutIcon />
                                    </div>
                                    <>Log out</>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Header
