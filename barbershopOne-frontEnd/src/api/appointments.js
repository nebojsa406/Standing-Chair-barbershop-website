const API_URL = "http://localhost:5000/appointments"
import { toast } from "react-toastify";


//------------CLIENT----------\\

//get times
export const getTimes = async () => {
    const res = await fetch(`${API_URL}/times`);
    if (!res.ok) throw new Error('failed to fetch appointments times');
    return res.json();
}

//post
export const postAppointment = async (appointmentBody) => {

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentBody)
    });
    const data = await res.json();

    if (!res.ok) {
        toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
        throw new Error(data.message || "Failed to load appointments");
    }

    toast("SUCCESS, appointment made!", { className: "successToast", progressClassName: "successProgress" });
    return data;
}

//find by phone
export const getByPhone = async (phone) => {
    const res = await fetch(`${API_URL}/byPhone?phone=${phone}`);
    const data = await res.json();
    if (!res.ok) {
        toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
        throw new Error(data.message || "Failed to load appointments");
    }
    console.log(data);
    return data;
}


//------------ADMIN----------\\

//get by date
export const getByDate = async (date, toggleFrom) => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${API_URL}/byDate?date=${date}&toggleFrom=${toggleFrom}`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) {
        toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
        throw new Error(data.message || "Failed to load appointments");
    }
    return data;
}

//get all appointments
export const getAll = async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken: ", accessToken);

    const res = await fetch(`${API_URL}/`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) {
        toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
        throw new Error(data.message || "Failed to load appointments");
    }

    return data;
}

// delete one
export const deleteOne = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${accessToken}` }
    });
    const data = await res.json();
    if (!res.ok) {
        toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
        throw new Error(data.message || "Failed to load appointments");
    }

    toast("SUCCESS, appointment deleted", { className: "successToast", progressClassName: "successProgress" });
    return data;
}