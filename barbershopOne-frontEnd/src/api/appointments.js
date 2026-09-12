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
//------------ADMIN----------\\

//get all

//get one

//update one

// delete one