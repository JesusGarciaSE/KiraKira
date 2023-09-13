import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage.tsx'
import DisplayGrid from './Components/ItemDisplay/DisplayGrid.tsx'
import LoginPage from './Pages/LoginPage/LoginPage.tsx'
import SignupPage from './Pages/SignupPage/SignupPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage className="flex-1 w-screen" />
      },
      {
        path: "/signup",
        element: <SignupPage className="flex-1 w-screen" />
      },
      {
        path: "/tape",
        element: <DisplayGrid />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
