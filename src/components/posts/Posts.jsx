import post from '../post/post.scss'
import classNames from 'classnames/bind'

import { makeRequest } from '../../axios'
import { useQuery } from '@tanstack/react-query'

import { Post } from '../index'
import { useOutletContext } from 'react-router-dom'
const cxPost = classNames.bind(post)

const Posts = () => {
    const { userId } = useOutletContext()
    const { isLoading, error, data } = useQuery({
        queryKey: ["posts", userId],
        queryFn: () => makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data),
    })

    return (
        <div className={cxPost("posts")}>
            {error
                ? "Something went wrong!"
                : isLoading
                    ? "Loading"
                    : data.map((post) => <Post post={post} key={post.id} />)}
        </div>
    )
}

export default Posts