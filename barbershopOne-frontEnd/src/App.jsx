import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/homePage/jsx/Home';
import { LocationPage } from './components/locationPage/jsx/locationPage.jsx';
import { GalleryPage } from './components/galleryPage/jsx/GalleryPage.jsx';
import { Header } from '../src/components/global/jsx/Header.jsx';
import { Footer } from '../src/components/global/jsx/Footer.jsx';
import { PricesPage } from './components/pricesPage/jsx/PricesPage.jsx';
import { AppointmentsPage } from './components/apointmentsPage/jsx/AppointmentsPage.jsx';
import { AdminPage } from './components/adminPage/jsx/AdminPage.jsx';
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './components/toastCsses/errorToast.css';
import './components/toastCsses/successToast.css';
import { refreshTokenLogin } from './api/admin.js';

export function refreshWebsite() {
  window.location.href = "/"
}

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let ignore = false; // page is still mounted,dont ignore
    (async () => {
      try {
        const userData = await refreshTokenLogin();
        if (!ignore) setUser(userData.user)//only update if ignore is false still
      } catch (error) {
        console.log("error on refresh accessToken: ", error.message)
        setUser(null);
      }
    })(); //call callback async function

    return () => {
      ignore = true; // runs automatically when component unmounts
    };
  }, []);

  console.log("app.jsx: userData: ", user)

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/book" element={<AppointmentsPage />} />
          <Route path="/admin1876" element={<AdminPage user={user}/>} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  )
}

export default App