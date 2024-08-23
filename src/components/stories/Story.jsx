import story from './story.scss'
import classNames from 'classnames/bind'
import { AuthContext } from "../../context/authContext"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useContext } from "react"

const cxStory = classNames.bind(story)

const Story = ({ userId }) => {
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ["stories", userId],
        queryFn: () => makeRequest.get(`/stories?userId=${userId}`).then((res) => res.data),
    })

    return (
        <div className={cxStory("stories")}>
            <div className={cxStory("story")}>
                <img src={`/upload/${currentUser.profilePic}`} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {error && <div>Not Found</div>}
            {isLoading && <div>Loading...</div>}
            {data && data.length > 0 ? (
                data.map((story) => (
                    <div className={cxStory("story")} key={story.id}>
                        <img src={story.img} alt="" />
                        <span>{story.name}</span>
                    </div>
                ))
            ) : (
                !isLoading && !error && <div>No stories found</div>
            )}
        </div>
    )
}

export default Story