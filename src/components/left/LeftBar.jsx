import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from "../../context/authContext"
import { useContext } from "react"
import style from './left.scss'
import classNames from 'classnames/bind'

import GroupIcon from '@mui/icons-material/Group'
import StoreIcon from '@mui/icons-material/Store'
import MovieIcon from '@mui/icons-material/Movie'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import CollectionsIcon from '@mui/icons-material/Collections'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import PaidIcon from '@mui/icons-material/Paid'
import ChatIcon from '@mui/icons-material/Chat'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import RedeemIcon from '@mui/icons-material/Redeem'
import PaymentIcon from '@mui/icons-material/Payment'
import FlagIcon from '@mui/icons-material/Flag'
import SevereColdIcon from '@mui/icons-material/SevereCold'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const left = classNames.bind(style)

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext)

    const [isOthersVisible, setIsOthersVisible] = useState(false)

    const toggleOthers = () => {
        setIsOthersVisible(!isOthersVisible)
    }

    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }
    return (
        <div className={left("wrapperLeft")}>
            <div className={left("containerLeft")}>
                <div className={left("menuLeft")}>
                    <Link to={`/profile/${currentUser.id}`}>
                        <div className={left("userLeft")}>
                            <img
                                src={"/upload/" + currentUser.profilePic}
                                alt="avt"
                            />
                            <span>{currentUser.name}</span>
                        </div>
                    </Link>
                    <Link>
                        <div className={left("itemLeft")}>
                            <GroupIcon />
                            <span>Groups</span>
                        </div>
                    </Link>
                    <Link>
                        <div className={left("itemLeft")}>
                            <StoreIcon />
                            <span>Marketplace</span>
                        </div>
                    </Link>
                    <Link>
                        <div className={left("itemLeft")}>
                            <MovieIcon />
                            <span>Watch</span>
                        </div>
                    </Link>
                    <Link>
                        <div className={left("itemLeft")}>
                            <AccessTimeIcon />
                            <span>Memories</span>
                        </div>
                    </Link>
                    {isOthersVisible && (
                        <>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <BookmarkIcon />
                                    <span>Save</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <RedeemIcon />
                                    <span>Birthdays</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <PaymentIcon />
                                    <span>Orders and payments</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <FlagIcon />
                                    <span>Pages</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <SevereColdIcon />
                                    <span>Climate</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <LocalActivityIcon />
                                    <span>Events</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <SportsEsportsIcon />
                                    <span>Gaming</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <CollectionsIcon />
                                    <span>Gallery</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <SmartDisplayIcon />
                                    <span>Videos</span>
                                </div>
                            </Link>
                            <Link>
                                <div className={left("itemLeft")}>
                                    <ChatIcon />
                                    <span>Messages</span>
                                </div>
                            </Link>
                        </>
                    )}
                    <span onClick={toggleOthers} className={left("moreLeft")}>
                        {isOthersVisible ?
                            (<>
                                <KeyboardArrowUpIcon />
                                See less
                            </>)
                            :
                            (
                                <>
                                    <KeyboardArrowDownIcon />
                                    See more
                                </>
                            )}

                    </span>
                </div>
                <hr />
                <div className={left("menuLeft")}>
                    <Link to="#">
                        <div className={left("itemLeft")}>
                            <PaidIcon />
                            <span>Fundraiser</span>
                        </div>
                    </Link>
                    <Link to="#">
                        <div className={left("itemLeft")}>
                            <LaptopMacIcon />
                            <span>Courses</span>
                        </div>
                    </Link>
                </div>
                <hr />
                <div className={left("menuLeft")}>
                    <aside className={left("shortcutsLeft")}>
                        <span
                            className={left("titleLeft")}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Your shortcuts
                        </span>
                        {isHover && (
                            <button>Edit</button>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;