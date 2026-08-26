import "../css/Footer.css"
import logo from "../../../assets/barbershop1Logo.png"
import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Left Section */}
                <div className="footer-logo-section">
                    <div className="footer-logo-section-inner">
                        <div className="footer-logo">
                            <img src={logo} alt="The Standing" className="footer-logo-image" />
                        </div>
                        <div className="footer-logo-text">
                            <h2 className="footer-title">The Standing Chair</h2>
                            <p className="footer-subtitle">BARBERSHOP · EST · 2018</p>
                        </div>
                    </div>
                    
                    <p className="footer-description">
                        A neighborhood barbershop for people who'd rather sit still for forty minutes than rush through ten.
                    </p>
                </div>

                {/* Middle Sections */}
                <div className="footer-section">
                    <h3 className="footer-heading">VISIT</h3>
                    <p className="footer-text">14 Grafton Lane</p>
                    <p className="footer-text">Ground floor, Midtown</p>
                    <Link to="/location" className="footer-link">Get directions →</Link>
                </div>

                <div className="footer-section">
                    <h3 className="footer-heading">HOURS</h3>
                    <p className="footer-text">Tue – Fri, 10:00 – 20:00</p>
                    <p className="footer-text">Sat, 09:00 – 18:00</p>
                    <p className="footer-text">Sun – Mon, Closed</p>
                </div>

                {/* Right Section */}
                <div className="footer-section">
                    <h3 className="footer-heading">SHOP</h3>
                    <Link to="/gallery" className="footer-link">Gallery →</Link>
                    <Link to="/prices" className="footer-link">Prices →</Link>
                    <Link to="/book" className="footer-link">Book appointment →</Link>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <p className="footer-copyright">© 2026 THE STANDING CHAIR BARBERSHOP</p>
                <p className="footer-tagline">DESIGNED FOR THE COMFORTABLE SEATING, NOT THE QUEUE</p>
            </div>
        </footer>
    );
}
