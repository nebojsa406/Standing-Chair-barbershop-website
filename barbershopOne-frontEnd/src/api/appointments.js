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

    if (!res.ok) toast("Failed to create appointment", { className: "errorToast", progressClassName: "errorProgress" });
    if (!res.ok) throw new Error(`failed to create appointment,with error: ${data.message}`);

    toast("SUCCESS, appointment made!", { className: "successToast", progressClassName: "successProgress" });
    return data;
}

//find by phone
export const getByPhone = async (phone) => {
    const res = await fetch(`${API_URL}/byPhone?phone=${phone}`);
    const data = await res.json();
    if (!res.ok) toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
    console.log(data);
    return data;
}


//------------ADMIN----------\\

//get by date
export const getByDate = async (date) => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await fetch(`${API_URL}/byDate?date=${date}`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });
    return data;
}
//get all appointments not older then 7 days
export const getAll = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const res = await fetch(`${API_URL}/`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) toast(data.message, { className: "errorToast", progressClassName: "errorProgress" });

    console.log(data);

    return data;
}
//update one

// delete one