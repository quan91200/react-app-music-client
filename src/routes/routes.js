import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import {
    Home,
    Profile,
    Video,
    Chat,
    Group,
    Dashboard,
    Music,
    Login
} from '../pages/index'
import { DefaultLayout, OnlyHeader } from '../layouts/index'
import { Navigate } from 'react-router-dom'
import { Posts } from '../components/index'

const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Home />, protected: true }
        ]
    },
    {
        path: '/',
        element: <OnlyHeader />,
        children: [
            { path: 'chat', element: <Chat />, protected: true },
            { path: 'groups', element: <Group />, protected: true },
            { path: 'dashboard', element: <Dashboard />, protected: true },
            { path: 'music', element: <Music />, protected: true },
            { path: 'video', element: <Video />, protected: true },
            {
                path: 'profile/:id',
                element: <Profile />,
                protected: true,
                children: [
                    { path: "/", element: <Posts />, protected: true },
                    //{ path: "video", element: <Video />, protected: true },
                    //{ path: "photos", element: <Photos />, protected: true },
                    //{ path: "about", element: <About />, protected: true },
                    //{ path: "friends", element: <Friends />, protected: true }
                ]
            },
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Login /> }
]

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    if (!currentUser) {
        return <Navigate to="/login" />
    }
    return children
}

export default routes
export { ProtectedRoute }