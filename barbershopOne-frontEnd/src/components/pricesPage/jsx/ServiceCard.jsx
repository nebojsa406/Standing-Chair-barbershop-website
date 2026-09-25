import { useState } from "react";
import {updateService, deleteService} from "../../../api/services"


export function ServiceCard({ name, price, time, description, _id, admin }) {
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
                            onChange={(e) => setNewTime(`${e.target.value} min`)}
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