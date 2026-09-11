import "../css/PricesPage.css";
import { TicketBtn } from "../../global/jsx/TicketBtn.jsx";
import { useState, useEffect } from "react"
import { getServices, updateService, deleteService, createService } from "../../../api/services.js"

function ServiceCard({ name, price, time, description, _id, admin }) {
    const timeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const [edit, setEdit] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newDescription, setNewDescription] = useState("");

    function handleCancel() {
        setNewPrice("");
        setEdit(!edit);
    }

    function handleSubmit() {
        console.log("newPrice: ", newPrice, ", newTime: ", newTime);
        updateService(_id, {
            price: newPrice !== "" ? newPrice : price,
            description: newDescription !== "" ? newDescription : description,
            time: newTime !== "" ? newTime : time,
        });
        setEdit(!edit);
    }

    function handleDelete() {
        deleteService(_id)
        setEdit(!edit);
    }

    return (
        <div className="price-card">
            <h4>{name}</h4>

            <div className="price-card-meta">
                <p className="price-label">price</p>
                {!edit ? <p className="price-value">{price}</p>
                    : <input
                        type="text"
                        className="edit-field-input"
                        inputMode="numeric"
                        maxLength={3}
                        defaultValue={price.replace(/\D/g, "")}
                        onChange={(event) => {
                            event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 3);
                            setNewPrice(`${event.target.value}€`);
                        }}
                    />
                }
            </div>

            <div className="price-card-meta">
                <p className="price-label">Time</p>
                {!edit ?
                    <p className="price-value">{time}</p>
                    :
                    <div className="price-card-meta create-service-field">
                        <select
                            onChange={(e) => setNewTime(`${e.target.value} min`) }
                            id="create-service-time" className="create-service-input create-service-time-input"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select time</option>
                            {timeOptions.map((minutes) => (
                                <option key={minutes} value={minutes}>{minutes} min</option>
                            ))}
                        </select>
                    </div>
                }
            </div>

            <div className="price-description-row">
                {!edit ? <p className="price-description">{description}</p>
                    : <input
                        type="text"
                        className="edit-description-field-input"
                        maxLength={120}
                        defaultValue={description}
                        onChange={(event) => { setNewDescription(event.target.value) }}
                    />
                }
                {admin && !edit ?
                    <button onClick={() => setEdit(!edit)} className="price-edit-button" type="button">Edit</button>
                    : admin && edit ?
                        <>
                            <button onClick={() => handleCancel()} className="price-edit-button" type="button">Cancel</button>
                            <button onClick={() => handleDelete()} className="price-edit-button" type="button">Delete</button>
                            <button onClick={() => handleSubmit()} className="price-edit-button" type="button">Submit</button>
                        </>
                        :
                        <></>
                }
            </div>

        </div>
    );
}

function CreateServiceCard({ onClose }) {
    const timeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const [createdName, setCreatedName] = useState("");
    const [createdPrice, setCreatedPrice] = useState("");
    const [createdTime, setCreatedTime] = useState("");
    const [createdCategory, setCreatedCategory] = useState("");
    const [createdDescription, setCreatedDescription] = useState();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await createService({
                serviceName: createdName,
                price: createdPrice,
                time: `${createdTime} min`,
                category: createdCategory,
                description: createdDescription
            });
            onClose();
        } catch (error) {
            console.error("Failed to create service:", error.message);
        }
    }

    return (
        <form className="price-card create-service-card" onSubmit={handleSubmit}>
            <button className="create-service-close" onClick={onClose} type="button" aria-label="Close create service form">
                X
            </button>

            <h4>Create service</h4>

            <div className="price-card-meta create-service-field">
                <label className="price-label" htmlFor="create-service-name">Name</label>
                <input
                    id="create-service-name"
                    className="create-service-input create-service-text-input"
                    maxLength={60}
                    placeholder="Service name"
                    type="text"
                    value={createdName}
                    onChange={(event) => setCreatedName(event.target.value)}
                    required
                />
            </div>

            <div className="price-card-meta create-service-field">
                <label className="price-label" htmlFor="create-service-price">Price</label>
                <input
                    id="create-service-price"
                    className="create-service-input create-service-price-input"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="0"
                    type="text"
                    onChange={(event) => {
                        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 3);
                        setCreatedPrice(`${event.target.value} €`)
                    }}
                    required
                />
            </div>

            <div className="price-card-meta create-service-field">
                <label className="price-label" htmlFor="create-service-time">Time</label>
                <select
                    onChange={(e) => setCreatedTime(e.target.value)}
                    id="create-service-time" className="create-service-input create-service-time-input"
                    defaultValue=""
                    required
                >
                    <option value="" disabled>Select time</option>
                    {timeOptions.map((minutes) => (
                        <option key={minutes} value={minutes}>{minutes} min</option>
                    ))}
                </select>
            </div>

            <div className="price-card-meta create-service-field">
                <label className="price-label" htmlFor="create-service-category">Category</label>
                <select
                    id="create-service-category"
                    className="create-service-input create-service-category-input"
                    value={createdCategory}
                    onChange={(event) => setCreatedCategory(event.target.value)}
                    required
                >
                    <option value="" disabled>Select category</option>
                    <option value="haircut">haircut</option>
                    <option value="beard">beard</option>
                </select>
            </div>

            <div className="price-description-row create-service-description-row">
                <input
                    onChange={(e) => setCreatedDescription(e.target.value)}
                    id="create-service-description"
                    className="create-service-input create-service-description-input"
                    maxLength={120}
                    placeholder="Description"
                    type="text"
                    required
                />
            </div>

            <button className="price-edit-button create-service-submit" type="submit">Submit</button>
        </form>
    );
}

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
                            key={service.name}
                            name={service.name}
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
                            key={service.name}
                            name={service.name}
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