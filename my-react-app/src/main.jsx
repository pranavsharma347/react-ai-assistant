import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
<ThemeProvider>
  <GoogleOAuthProvider clientId="951669499604-ksn04tlrvg3sm6ueb8p0tfus8mnt9fuu.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
</ThemeProvider>
)
