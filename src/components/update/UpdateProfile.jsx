import update from "./update.scss"
import classNames from "classnames/bind"
import { useState } from "react";
import { makeRequest } from "../../axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

const cxUpdate = classNames.bind(update)

const UpdateProfile = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
    })

    const upload = async (file) => {
        console.log(file)
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData)
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    const Inputs = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        {
            mutationFn: (user) => {
                return makeRequest.put("/users", user)
            },

            onSuccess: () => {
                queryClient.invalidateQueries(["user"])
            },
        }
    )

    const handleClick = async (e) => {
        e.preventDefault()

        let coverUrl = user.coverPic
        let profileUrl = user.profilePic

        if (cover) {
            try {
                coverUrl = await upload(cover)
            } catch (err) {
                console.error('Error uploading cover:', err)
                toast.error('Error uploading cover!')
                return;
            }
        }

        if (profile) {
            try {
                profileUrl = await upload(profile)
            } catch (err) {
                console.error('Error uploading profile:', err)
                toast.error('Error uploading profile!')
                return;
            }
        }

        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl })

        setOpenUpdate(false)
        setCover(null)
        setProfile(null)
        toast.info('Completed!')
    }

    return (
        <div className={cxUpdate("wrapperUpdate")}>
            <div className={cxUpdate("containerUpdate")}>
                <h1>Update Your Profile</h1>
                <form>
                    <div className={cxUpdate("filesUpdate")}>
                        <label htmlFor="cover" className={cxUpdate("coverUpdate")}>
                            <span>Background</span>
                            <div className={cxUpdate("imgUpdate")}>
                                <img
                                    src={
                                        cover ? URL.createObjectURL(cover) : "/upload/" + user.coverPic
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className={cxUpdate("iconUpdate")} />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    setCover(file)
                                }
                            }}
                        />
                        <label htmlFor="avatar" className={cxUpdate("avatarUpdate")}>
                            <span>Avatar</span>
                            <div className={cxUpdate("imgUpdate")}>
                                <img
                                    src={
                                        profile ? URL.createObjectURL(profile) : "/upload/" + user.profilePic
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className={cxUpdate("iconUpdate")} />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    setProfile(file)
                                }
                            }}
                        />
                    </div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={texts.email}
                        name="email"
                        onChange={Inputs}
                    />
                    <label>Password</label>
                    <input
                        type="text"
                        value={texts.password}
                        name="password"
                        onChange={Inputs}
                    />
                    <label>Name</label>
                    <input
                        type="text"
                        value={texts.name}
                        name="name"
                        onChange={Inputs}
                    />
                    <label>Country / City</label>
                    <input
                        type="text"
                        name="city"
                        value={texts.city}
                        onChange={Inputs}
                    />
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        value={texts.website}
                        onChange={Inputs}
                    />
                    <button onClick={handleClick}>Upload</button>
                </form>
                <div className={cxUpdate("closeUpdate")} onClick={() => setOpenUpdate(false)}>X</div>
            </div>
        </div>
    );
}

export default UpdateProfile;