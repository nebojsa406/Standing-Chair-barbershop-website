const API_URL = "http://localhost:5000/appointments"

//------------CLIENT----------\\

//get times
export const getTimes = async () => {
    const res = await fetch(`${API_URL}/times`);
    if (!res.ok) throw new Error('failed to fetch appointments times');
    return res.json();
}

//post
export const postAppointment = async (appointmentBody) => {
    const postBody = {
        fullname: appointmentBody.fullname,
        phone: appointmentBody.phone,
        email: appointmentBody.email,
        service: appointmentBody.service,
        time: appointmentBody.time,
        date: appointmentBody.date,
        details: appointmentBody.details
    }

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postBody)
    });

    const resData = await res.json();

    return {data: resData, status: res.status};
}
//------------ADMIN----------\\

//get all

//get one

//update one

// delete one