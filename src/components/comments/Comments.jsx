import { useContext, useState } from 'react'
import comment from './comments.scss'
import classNames from 'classnames/bind'
import { AuthContext } from '../../context/authContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

const cxComment = classNames.bind(comment)

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext)

    const { isLoading, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () =>
            makeRequest.get("/comments?postId=" + postId).then((res) => {
                return res.data
            })
    })

    const queryClient = useQueryClient()

    const mutation = useMutation(
        {
            mutationFn: (newComment) => {
                return makeRequest.post("/comments", newComment)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"])
            }
        }
    )
    const deleteM = useMutation(
        {
            mutationFn: (commentId) => {
                return makeRequest.delete("/comments/" + commentId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['comments'])
                toast.success("Comment deleted successfully!")
            },
            onError: (error) => {
                toast.error("Failed to delete comment:" + error.message)
            }
        }
    )

    const [desc, setDesc] = useState("")
    const Comment = async (e) => {
        e.preventDefault()
        mutation.mutate({ desc, postId })
        setDesc("")
        toast.success("Commented successfully!")
    }

    const Delete = (commentId) => {
        deleteM.mutate(commentId)
    }

    const [isOpen, setIsOpen] = useState(false)

    const Open = () => {
        setIsOpen(!isOpen)
    }
    const createdAt = moment(comment.createdAt)

    const now = moment()

    const isLessThan24Hours = now.diff(createdAt, "hours") > 24
    return (
        <div className={cxComment("comments")}>
            {error
                ? "Not Found"
                : isLoading
                    ? "Loading"
                    : data.map((comment) => (
                        <div className={cxComment("comment")} key={comment.id}>
                            <div className={cxComment("containerComment")}>
                                <img
                                    alt='avt'
                                    src={"/upload/" + comment.profilePic}
                                />
                                <div className={cxComment("detailComment")}>
                                    <aside className={cxComment("contentComment")}>
                                        <span>{comment.name}</span>
                                        <p>{comment.desc}</p>
                                    </aside>
                                    <MoreHorizIcon onClick={Open} />
                                    {isOpen && (
                                        <span onClick={() => Delete(comment.id)}>x</span>
                                    )}
                                </div>
                            </div>
                            <p className={cxComment("dateComment")}>
                                {
                                    isLessThan24Hours
                                        ? createdAt.format("DD-MM-YYYY")
                                        : createdAt.fromNow()
                                }
                            </p>
                        </div>))
            }
            <div className={cxComment("writeComment")}>
                <img
                    alt=''
                    src={"/upload/" + currentUser.profilePic}
                />
                <input
                    type='text'
                    placeholder='write a comment ...'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <div onClick={Comment} className={cxComment("btnComment")}>{">"}</div>
            </div>
        </div>
    );
}

export default Comments;