import post from './post.scss'
import classNames from 'classnames/bind'

import { makeRequest } from '../../axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'

import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'

import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import TelegramIcon from '@mui/icons-material/Telegram'

import Comments from '../comments/Comments'

const cxPost = classNames.bind(post)

const Post = ({ post }) => {
    const createdAt = moment(post.createdAt)

    const now = moment()

    const isLessThan24Hours = now.diff(createdAt, "hours") > 24

    const [commentOpen, setCommentOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const { currentUser } = useContext(AuthContext)

    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery({
        queryKey: ["likes", post.id],
        queryFn: () => makeRequest.get(`/likes?postId=${post.id}`).then((res) => res.data),
    })

    const mutation = useMutation({
        mutationFn: (liked) => {
            if (liked) return makeRequest.delete(`/likes?postId=${post.id}`)
            return makeRequest.post("/likes", { postId: post.id })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["likes", post.id])
        }
    })

    const postMutation = useMutation({
        mutationFn: (postId) => makeRequest.delete(`/posts/${postId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"])
            toast.error("Deleted!");
        }
    })

    const Like = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    const Delete = () => {
        postMutation.mutate(post.id)
    }

    const [isCurrentUser, setIsCurrentUser] = useState()

    useEffect(() => {
        if (post.userId !== currentUser.id) {
            setIsCurrentUser(true)
        } else {
            setIsCurrentUser(false)
        }
    }, [currentUser, post.userId])

    return (
        <div className={cxPost("post")}>
            <div className={cxPost("containerPost")}>
                <section className={cxPost("headerPost")}>
                    <></>
                    <div className={cxPost("userPost")}>
                        <img alt='avt' src={"/upload/" + post.profilePic} />
                        <div className={cxPost("detailPost")}>
                            <Link to={`/profile/${post.userId}`}>
                                <span className={cxPost("namePost")}>{post.name}</span>
                            </Link>
                            <span className={cxPost("datePost")}>
                                {isLessThan24Hours
                                    ? createdAt.format("DD-MM-YYYY")
                                    : createdAt.fromNow()
                                }
                            </span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId === currentUser.id && (
                        <button onClick={Delete}>x</button>
                    )}
                </section>
                <section className={cxPost("middlePost")}>
                    <p>{post.desc}</p>
                    <img
                        alt=''
                        src={"/upload/" + post.img}
                    />
                </section>
                <section className={cxPost("footerPost")}>
                    <div className={cxPost("countPost")}>
                        {data?.length} React
                    </div>
                    <hr />
                    <div className={cxPost("listItemPost")}>
                        {isLoading ? "Loading"
                            : data.includes(currentUser.id) ? (
                                <div onClick={Like} className={cxPost("itemPost")}>
                                    <FavoriteOutlinedIcon
                                        style={{ color: "red" }}
                                        className={cxPost("like")}
                                    />
                                    Likes
                                </div>
                            ) : (
                                <div onClick={Like} className={cxPost("itemPost")}>
                                    <FavoriteBorderOutlinedIcon />
                                    Likes
                                </div>
                            )}
                        <div className={cxPost("itemPost")}
                            onClick={() => setCommentOpen(!commentOpen)}
                        >
                            <ChatBubbleOutlineIcon />
                            Comment
                        </div>
                        {isCurrentUser && (
                            <div className={cxPost("itemPost")}>
                                <TelegramIcon />
                                Send
                            </div>
                        )}
                        <div className={cxPost("itemPost")}>
                            <ShareOutlinedIcon />
                            Share
                        </div>
                    </div>
                    {commentOpen && (
                        <>
                            <hr />
                            <Comments postId={post.id} />
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Post;