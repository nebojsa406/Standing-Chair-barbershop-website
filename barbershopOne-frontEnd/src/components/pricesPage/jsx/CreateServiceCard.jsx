import { useState } from "react";

export function CreateServiceCard({ onClose }) {
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