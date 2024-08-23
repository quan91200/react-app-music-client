import { useContext, useState } from 'react'
import login from './login.scss'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import axios from "axios"
import CloseIcon from '@mui/icons-material/Close'

const cxLogin = classNames.bind(login)

const Login = () => {
    const [isLogin, setLogin] = useState({
        username: "",
        password: "",
    })

    const [err, setErr] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { login } = useContext(AuthContext)

    const Login = async (e) => {
        e.preventDefault()
        try {
            await login(isLogin)
            navigate("/")
        } catch (err) {
            setErr(err.response.data)
        }
    }

    const [open, setOpen] = useState(false)

    const Open = () => {
        setOpen(prev => !prev)
    }
    return (
        <div className={cxLogin("wrapperLogin")}>
            <h1>Login</h1>
            <form>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                {err && err}
                <button onClick={Login}>Login</button>
            </form>
            <span>Don't you have an account?</span>
            <div>
                <button onClick={Open}>Register</button>
            </div>
            {open && <Register />}
        </div>
    )
}


const Register = ({ setOpen }) => {

    const Close = () => {
        setOpen(prev => !prev)
    }

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    })

    const [err, setErr] = useState(null)

    const handleChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const Register = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/api/auth/register", input);
        } catch (err) {
            setErr(err.response.data)
        }
    }
    return (
        <>
            <h1>Register</h1>
            <CloseIcon onClick={Close} style={{ cursor: "pointer" }} />
            <form>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                />
                {err && err}
                <button onClick={Register}>Register</button>
            </form>
        </>
    )
}

export default Login;