import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AuthContextProvider>
      <ToastContainer theme={"dark"}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnHover={true}
       />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
)
