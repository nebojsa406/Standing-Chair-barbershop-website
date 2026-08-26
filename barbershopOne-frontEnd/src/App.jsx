// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/homePage/jsx/Home';
import { LocationPage } from './components/locationPage/jsx/locationPage.jsx';
import { GalleryPage } from './components/galleryPage/jsx/GalleryPage.jsx';
import { Header } from '../src/components/global/jsx/Header.jsx';
import { Footer } from '../src/components/global/jsx/Footer.jsx';
import { PricesPage } from './components/pricesPage/jsx/PricesPage.jsx';
import { AppointmentsPage } from './components/apointmentsPage/jsx/AppointmentsPage.jsx';
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './components/toastCsses/errorToast.css';
import './components/toastCsses/successToast.css';

function App() {

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
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  )
}

export default App
