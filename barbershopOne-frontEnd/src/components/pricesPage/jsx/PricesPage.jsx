import "../css/PricesPage.css";
import { TicketBtn } from "../../global/jsx/TicketBtn.jsx";
import {useState} from "react"

function PriceCard({ name, price, time, description }) {
    return (
        <div className="price-card">
            <h4>{name}</h4>
            <div className="price-card-meta">
                <p className="price-label">Price</p>
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
    const [prices, setPrices] = useState();
    useEffect(()=> {
        (async()=>{
            try {
                
            } catch (err) {
                
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

                    <PriceCard
                        name="Signature Haircut"
                        price="7€"
                        time="30 min"
                        description="Consultation, wash, precision cut and finish. Scissor or clipper, your call."
                    />
                </section>

                <section className="prices-section">

                    <div className="prices-section-heading">
                        <h3>Beard & Shave</h3>
                    </div>

                    <PriceCard
                        name="Beard Sculpt & Line-up"
                        price="15€"
                        time="30 min"
                        description="Shape, trim and hot towel finish, plus a straight razor edge line-up."
                    />
                </section>
                <div className="prices-booking-btn-wrap">
                    <TicketBtn text="Book your chair →" href="/book" />
                </div>
            </div>
        </main>
    );
}