import "../css/locationPage.css"
import { TicketBtn } from "../../global/jsx/TicketBtn";

function LocationInfoCard({ label, title, description }) {
    return (
        <article className="location-info-card">
            <div className="location-info-label">{label}</div>
            <h3>{title}</h3>
            <p className="location-info-copy">{description}</p>
        </article>
    );
}

export function LocationPage() {
    return (
        <main className="location-page">
            <div className="location-container">
                <section className="location-panel">
                    <div className="location-content">
                        <div className="location-section">
                            <div className="location-label">ADDRESS</div>
                            <div className="location-address">
                                <h2>14 Grafton Lane, ground Floor</h2>
                            </div>
                            <p className="location-note">Buzzer marked Standing Chair come on up.</p>
                        </div>

                        <div className="location-divider" />

                        <div className="location-section">
                            <div className="location-label">HOURS</div>
                            <p className="location-text">Tue - Fri: 10:00 - 20:00</p>
                            <p className="location-text">Sat: 09:00 - 18:00</p>
                            <p className="location-text">Sun - Mon: Closed</p>
                        </div>

                        <div className="location-divider" />

                        <div className="location-section">
                            <div className="location-label">CONTACT</div>
                            <p className="location-text">+1 (555) 019 4482</p>
                            <p className="location-text">hello@standingchair.shop</p>
                        </div>

                        <TicketBtn
                            text="Get Directions →"
                            href="https://www.google.com/maps/dir/?api=1&destination=14+Grafton+Lane+Ground+Floor"
                        />
                    </div>
                </section>

                <section className="location-map">
                    <div className="map-frame">
                        <iframe
                            title="Barbershop location"
                            src="https://maps.google.com/maps?q=14%20Grafton%20Lane%20Ground%20Floor&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>
            </div>

            <section className="location-info-section">
                <div className="location-info-intro">
                    <p className="location-info-eyebrow">Getting Here</p>
                    <h2>Worth knowing before you come</h2>
                </div>
                <div className="location-info-grid">
                    <LocationInfoCard
                        label="PARKING"
                        title="Street & Garage"
                        description="Metered street parking out front, plus a garage one block east on 5th if it's full."
                    />
                    <LocationInfoCard
                        label="TRANSIT"
                        title="Nearest Stop"
                        description="Grafton St. station, 4 minute walk. Exit toward the north side of the platform."
                    />
                    <LocationInfoCard
                        label="ACCESS"
                        title="Second Floor"
                        description="We're up one flight — no elevator yet. Give us a call and we'll work something out."
                    />
                </div>
            </section>
        </main>
    )
}