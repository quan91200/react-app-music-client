import { useContext, useState } from 'react'
import profile from './profile.scss'
import classNames from 'classnames/bind'

import { AuthContext } from '../../context/authContext'
import { Outlet, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import BookmarkIcon from '@mui/icons-material/Bookmark'

import { Update } from '../../components/index'
const cxProfile = classNames.bind(profile)

const Profile = () => {

    const { currentUser } = useContext(AuthContext)

    const userId = parseInt(useLocation().pathname.split("/")[2])

    const { isLoading, data } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            makeRequest.get("/users/find/" + userId).then((res) => res.data)
    })

    const { data: relationshipData } = useQuery({
        queryKey: ["relationship"],
        queryFn: () =>
            makeRequest.get("/relationships?followedUserId=" + userId).then((res) => res.data)
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (following) => {
            if (following) {
                return makeRequest.delete("/relationships?userId=" + userId)
            }
            return makeRequest.post("/relationships", { userId })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["relationship"])
        },
    })

    const Follow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id))
    }

    const [openUpdate, setOpenUpdate] = useState(false)
    return (
        <>
            {isLoading ? (
                "Loading"
            ) : (
                <div className={cxProfile("wrapperProfile")}>
                    <div className={cxProfile("profile")}>
                        <div className={cxProfile("titleProfile")}>
                            <div className={cxProfile("bgProfile")}>
                                <img alt='bg' src={"/upload/" + data.coverPic} />
                            </div>
                            <div className={cxProfile("infoProfile")}>
                                <div className={cxProfile("topProfile")}>
                                    <div className={cxProfile("avtProfile")}>
                                        <img alt='avt' src={"/upload/" + data.profilePic} />
                                    </div>
                                    <div className={cxProfile("detailsProfile")}>
                                        <div className={cxProfile("nameProfile")}>{data.name}</div>
                                        <div className={cxProfile("friendProfile")}>0 friends</div>
                                        <div className={cxProfile("iconProfile")}>
                                            <FacebookIcon className="fb" />
                                            <LinkedInIcon className='linked' />
                                            <InstagramIcon className='ins' />
                                            <GitHubIcon className='git' />
                                        </div>
                                    </div>
                                    <div className={cxProfile("btnProfile")}>
                                        {userId === currentUser.id ? (
                                            <>
                                                <button
                                                    className={cxProfile("editProfile btnP")}
                                                    onClick={() => setOpenUpdate(true)}
                                                >
                                                    <EditIcon />
                                                    <p>Edit profile</p>
                                                </button>
                                                <button className={cxProfile("addStory btnP")}>
                                                    <AddIcon />
                                                    <p>Add Story</p>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={Follow} className={cxProfile("followProfile btnP")}>
                                                    <BookmarkIcon />
                                                    {relationshipData?.includes(currentUser.id) ? 'Following' : 'Follow'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className={cxProfile("bottomProfile")}>
                                    <div className={cxProfile("itemProfile")}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cxProfile("contentProfile")}>
                            <Outlet context={{ userId }} />
                        </div>
                    </div>
                    {openUpdate && (<Update setOpenUpdate={setOpenUpdate} user={data} />)}
                </div>
            )}
        </>
    );
}

export default Profile;