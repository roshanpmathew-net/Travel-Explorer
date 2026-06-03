import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { AuthProvider } from './context/AuthContext.tsx';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>

        <BrowserRouter>
        <App />
      </BrowserRouter>
      </AuthProvider>
      
    </GoogleOAuthProvider>
  </StrictMode>,
)
