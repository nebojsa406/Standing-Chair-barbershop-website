import "../css/PricesPage.css";
import { TicketBtn } from "../../global/jsx/TicketBtn.jsx";
import { useState, useEffect } from "react";
import { getServices, updateService, deleteService, createService } from "../../../api/services.js";
import {ServiceCard} from "./ServiceCard.jsx";
import {CreateServiceCard} from "./CreateServiceCard.jsx";

export function PricesPage({ admin = false }) {
    const [services, setServices] = useState([]);

    const [create, setCreate] = useState(false);

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
                            key={service.serviceName}
                            name={service.serviceName}
                            price={service.price}
                            time={service.time}
                            description={service.description}
                            _id={service._id}
                            admin={admin}
                        />
                    )}
                </section>

                <section className="prices-section">

                    <div className="prices-section-heading">
                        <h3>Beard & Shave</h3>
                    </div>

                    {services.filter((item) => item.category === "beard").map((service) =>
                        <ServiceCard
                            key={service.serviceName}
                            name={service.serviceName}
                            price={service.price}
                            time={service.time}
                            description={service.description}
                            _id={service._id}
                            admin={admin}
                        />
                    )}
                </section>
                <div className="prices-booking-btn-wrap">
                    <TicketBtn text="Book your chair →" href="/book" />
                </div>
            </div>

            {admin && create ?
                <CreateServiceCard onClose={() => setCreate(false)} />
                : <></>
            }

            {admin && (
                <button onClick={() => setCreate(!create)} className="price-edit-button prices-create-button" type="button">
                    Create
                </button>
            )}

        </main>
    );
}