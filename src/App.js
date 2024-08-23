import './index.scss'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DarkModeContext } from './context/darkModeContext'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import routes, { ProtectedRoute } from './routes/routes'
function App() {
  const { darkMode } = useContext(DarkModeContext)

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Router>
          <Routes>
            {routes.map(({ path, element: Element, children }) => (
              <Route key={path} path={path} element={Element}>
                {children && children.map(({ path: childPath, element: ChildElement, protected: isProtected }) => (
                  <Route
                    key={childPath}
                    path={childPath}
                    element={isProtected ? <ProtectedRoute>{ChildElement}</ProtectedRoute> : ChildElement}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Router>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </QueryClientProvider>
  )
}


export default App