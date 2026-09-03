import "../css/PricesPage.css";
import { TicketBtn } from "../../global/jsx/TicketBtn.jsx";
import { useState, useEffect } from "react"
import { getServices } from "../../../api/services.js"

function ServiceCard({ name, price, time, description }) {
    return (
        <div className="price-card">
            <h4>{name}</h4>
            <div className="price-card-meta">
                <p className="price-label">price</p>
                <p className="price-value">{price}</p>
            </div>
            <div className="price-card-meta">
                <p className="price-label">Time</p>
                <p className="price-value">{time}</p>
            </div>
            <p className="price-description">{description}</p>
        </div>
    );
}

export function PricesPage() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await getServices();
                setServices(data.services);
            } catch (err) {
                return new Error("Error: ", err.message);
            }
        })();
    }, []);

    return (
        <main className="prices-page">
            <div className="prices-page-inner">
                <section className="prices-section">

                    <div className="prices-section-heading">
                        <h3>Haircuts</h3>
                    </div>

                    {services.filter((item) => item.category === "haircut").map((service) =>
                        <ServiceCard
                            key={service.name}
                            name={service.name}
                            price={service.price}
                            time={service.time}
                            description={service.description}
                        />
                    )}
                </section>

                <section className="prices-section">

                    <div className="prices-section-heading">
                        <h3>Beard & Shave</h3>
                    </div>

                    {services.filter((item) => item.category === "beard").map((service) =>
                        <ServiceCard
                            key={service.name}
                            name={service.name}
                            price={service.price}
                            time={service.time}
                            description={service.description}
                        />
                    )}
                </section>
                <div className="prices-booking-btn-wrap">
                    <TicketBtn text="Book your chair →" href="/book" />
                </div>
            </div>
        </main>
    );
}