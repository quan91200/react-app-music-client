import { useContext, useState } from 'react'
import share from './share.scss'
import classNames from 'classnames/bind'
import { AuthContext } from '../../context/authContext'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import PinDropIcon from '@mui/icons-material/PinDrop'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'

import { makeRequest } from '../../axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const cxShare = classNames.bind(share)

const Share = () => {
    const { currentUser } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    const Open = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className={cxShare("share")}>
            <div className={cxShare("containerShare")}>
                <div className={cxShare("topShare")}>
                    <img alt='' src={"/upload/" + currentUser.profilePic} />
                    <input
                        type='text'
                        placeholder={`What's on your mind ${currentUser.name}?`}
                        onClick={Open}
                    />
                    {isOpen && (
                        <ModalShare isOpen={isOpen} setIsOpen={setIsOpen} />
                    )}
                </div>
                <hr />
                <div className={cxShare("bottomShare")}>
                    <div className={cxShare("itemShare")} onClick={Open}>
                        <AddPhotoAlternateIcon />
                        <span>Add Image</span>
                    </div>
                    <div className={cxShare("itemShare")} onClick={Open}>
                        <PinDropIcon />
                        <span>Add Place</span>
                    </div>
                    <div className={cxShare("itemShare")} onClick={Open}>
                        <PersonPinIcon />
                        <span>Tag Friends</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModalShare = ({ setIsOpen }) => {
    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState("")

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await makeRequest.post("/upload", formData)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    const { currentUser } = useContext(AuthContext)

    const queryClient = useQueryClient()

    const mutation = useMutation(
        {
            mutationFn: (newShare) => {
                return makeRequest.post("/posts", newShare)
            },

            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
            }
        }
    )

    const Share = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        mutation.mutate({ desc, img: imgUrl })
        setDesc("")
        setFile(null)
        toast.success("Successful !...")
        setIsOpen(false)
    }

    return (
        <div className={cxShare("modalShare")}>
            <div className={cxShare("wrapperModalShare")}>
                <div className={cxShare("containerModalShare")}>
                    <div className={cxShare("headerShare")}>
                        <div className={cxShare("topModalShare")}>
                            <aside>Create Post</aside>
                            <bside>
                                <button onClick={() => setIsOpen(false)}>x</button>
                            </bside>
                        </div>
                        <div className={cxShare("bottomModalShare")}>
                            <img alt=''
                                src={"/upload/" + currentUser.profilePic}
                            />
                            <aside>
                                <p>{currentUser.name}</p>
                                <icon>Public</icon>
                            </aside>
                        </div>
                    </div>
                    <div className={cxShare("middleShare")}>
                        <textarea
                            className={cxShare("textShare")}
                            name='textarea'
                            id='textarea'
                            rows="10"
                            cols="50"
                            placeholder={`What's on your mind ${currentUser.name}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                        <div className={cxShare("fileShare")}>
                            {file && (
                                <img alt='' src={URL.createObjectURL(file)} />
                            )}
                        </div>
                    </div>
                    <div className={cxShare("footerShare")}>
                        <div className={cxShare("itemModalShare")}>
                            <div>Add to your post</div>
                            <div className={cxShare("parentItemShare")}>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <label htmlFor="file">
                                    <div className={cxShare("itemShareShare")}>
                                        <AddPhotoAlternateIcon />
                                    </div>
                                </label>
                                <div className={cxShare("itemShareShare")}>
                                    <PersonPinIcon />
                                </div>
                                <div className={cxShare("itemShareShare")}>
                                    <InsertEmoticonIcon />
                                </div>
                                <div className={cxShare("itemShareShare")}>
                                    <PinDropIcon />
                                </div>
                            </div>
                        </div>
                        <button onClick={Share}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Share;